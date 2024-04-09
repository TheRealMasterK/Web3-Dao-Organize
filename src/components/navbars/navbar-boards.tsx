import Link from "next/link";
import { useState } from "react";

import ModalBoardSettings from "@/components/modals/modal-board-settings";
import ModalBoardDelete from "@/components/modals/modal-delete-board";

import useBoardStore from "@/lib/store";
import { useAuth } from "@/lib/use-auth";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");

  const board = useBoardStore((state) => state.board);
  const ownerID = useBoardStore((state) => state.ownerID);

  if (!board) {
    return null;
  }

  const toggleMenu = (): void => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const openModal = (type: string): void => {
    setModalType(type);
  };

  return (
    <div className="w-full bg-white">
      <nav className="container mx-auto flex items-center justify-between p-2 py-5 text-lg sm:p-5">
        <section className="flex items-center gap-4 sm:gap-8">
          {user && (
            <Link href={"/board"}>
              <button className="bi bi-chevron-left" />
            </Link>
          )}
          <h1 className="truncate text-2xl font-medium">{board.name}</h1>
          <div className="hidden gap-1 rounded-full bg-primary-500 px-4 py-1 text-sm text-white sm:flex">
            <i className={`bi bi-${board.public ? "unlock" : "lock"}`} />
            {board.public ? "Public" : "Private"}
          </div>
        </section>

        <ModalBoardSettings state={modalType} setState={setModalType} />
        <ModalBoardDelete state={modalType} setState={setModalType} />

        {user && (
          <div
            onClick={toggleMenu}
            className="bi bi-gear relative cursor-pointer text-2xl"
          >
            {menuOpen && (
              <menu className="absolute right-0 top-8 flex flex-col items-start gap-1 whitespace-nowrap rounded-b-lg bg-white p-3 text-base shadow-md">
                <button
                  onClick={() => openModal("settings")}
                  className="bi bi-pen board-menu-btn"
                  type="button"
                  disabled={user.uid !== ownerID}
                >
                  Board settings
                </button>
                <button
                  onClick={() => openModal("delete")}
                  className="bi bi-trash3 board-menu-btn hover:text-red-400"
                  disabled={user.uid !== ownerID}
                >
                  Delete this board
                </button>
                <button
                  onClick={signOut}
                  className="bi bi-box-arrow-right board-menu-btn"
                >
                  Log out
                </button>
              </menu>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
