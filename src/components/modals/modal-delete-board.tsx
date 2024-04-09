import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import Modal from "@/components/modals/modal";

import useBoardStore from "@/lib/store";

const ModalBoardDelete = ({
  state,
  setState,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) => {
  const deleteBoard = useBoardStore((state) => state.deleteBoard);
  const router = useRouter();

  if (state !== "delete") return null;
  else
    return (
      <Modal>
        <div className="w-full max-w-md space-y-5 rounded-lg bg-white p-6 shadow-md md:max-w-lg ">
          <header className=" flex w-full items-center justify-between">
            <p className="text-xl font-medium">
              Are you sure you want to delete this board?
            </p>
            <button onClick={() => setState("")} className="bi bi-x-lg" />
          </header>

          <p className="text-justify text-base md:text-lg">
            This action is irreversible, and all associated data will be
            permanently removed.
          </p>

          <div className=" flex w-full items-center justify-end gap-3">
            <button
              onClick={() => setState("")}
              type="button"
              className="btn border-2 border-black bg-white text-black hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteBoard();
                router.push("/board");
              }}
              type="submit"
              className="btn border-2 border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    );
};

export default ModalBoardDelete;
