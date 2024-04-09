import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import Layout from "@/components/layouts/layout-static";
import SearchBar from "@/components/search-bar/search-bar";
import BoardGrid from "@/components/board-grid/board-grid";
import ProtectedRoute from "@/components/protected-route/protected-route";

import { database } from "@/lib/firebase";
import { useAuth } from "@/lib/use-auth";

import type { Board } from "@/types/interfaces";

const Index = () => {
  const { user } = useAuth();

  const [boards, setBoards] = useState<Board[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.uid) return;
    const userCollection = collection(database, "users", user.uid, "boards");
    const unsub = onSnapshot(userCollection, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        setBoards((prev: Board[]) => {
          if (prev.find((board) => board.id === data.id))
            return [...prev] as Board[];
          else return [...prev, data] as Board[];
        });
      });
    });

    return () => unsub();
  }, [user]);

  return (
    <ProtectedRoute>
      <Layout>
        <main className="container mx-auto px-5 py-8 md:px-0 ">
          <SearchBar search={search} setSearch={setSearch} />
          <BoardGrid boards={boards} search={search} />
        </main>
      </Layout>
    </ProtectedRoute>
  );
};

export default Index;
