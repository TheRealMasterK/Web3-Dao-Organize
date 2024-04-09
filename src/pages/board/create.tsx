import { FormEvent, useReducer } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import Layout from "@/components/layouts/layout-screen";

import ProtectedRoute from "@/components/protected-route/protected-route";

import { database } from "@/lib/firebase";
import { useAuth } from "@/lib/use-auth";

interface FormState {
  name: string;
  description: string;
  public: boolean;
}

const Create = () => {
  const { user } = useAuth();

  if (!user) return null;

  const router = useRouter();
  const [form, updateForm] = useReducer(
    (prev: FormState, next: Partial<FormState>) => ({ ...prev, ...next }),
    { name: "", description: "", public: true }
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.name) return;

    try {
      const board = await addDoc(
        collection(database, "users", user.uid, "boards"),
        { ...form, createdAt: dayjs().format() }
      );

      const order: string[] = [];

      for (const name of ["To Do", "Doing", "Done"]) {
        const column = await addDoc(
          collection(
            database,
            "users",
            user.uid,
            "boards",
            board.id,
            "columns"
          ),
          { name, cards: [] }
        );
        order.push(column.id);
      }

      await updateDoc(doc(database, "users", user.uid, "boards", board.id), {
        order,
      });
      router.push(`/board/${user.uid}/${board.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <ProtectedRoute>
        <main className="mx-auto flex max-w-xs flex-1 flex-col items-center justify-center gap-7 sm:max-w-xl md:max-w-2xl">
          <h1 className=" text-2xl font-semibold sm:text-4xl">Create board</h1>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xl flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Board Title"
              className="rounded bg-white px-4 py-3 text-lg md:text-xl"
              maxLength={15}
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description (optional)"
              className="rounded  bg-white px-4 py-3"
              maxLength={30}
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
            />

            <div className="mt-4 flex w-full items-center justify-between gap-5">
              <button
                type="button"
                onClick={() => updateForm({ public: !form.public })}
                className="flex items-center gap-2 text-lg"
              >
                <i className={`bi bi-${form.public ? "unlock" : "lock"}`} />
                {form.public ? "Public" : "Only me"}
              </button>

              <div className="flex items-center justify-end gap-5 ">
                <Link href="/board">
                  <button className="btn bg-gray-600 text-white hover:bg-gray-700">
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white hover:bg-primary-600"
                >
                  Create
                </button>
              </div>
            </div>
            <p
              className={`trans my-3 text-center text-xs text-gray-400 sm:text-base ${
                form.public ? "opacity-100" : "opacity-0"
              }`}
            >
              Anyone with the link can read and write.
            </p>
          </form>
        </main>
      </ProtectedRoute>
    </Layout>
  );
};

export default Create;
