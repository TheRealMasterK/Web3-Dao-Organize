import { Dispatch, FormEvent, SetStateAction, useReducer } from "react";

import Modal from "@/components/modals/modal";

import useBoardStore from "@/lib/store";

const ModalBoardSettings = ({
  state,
  setState,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) => {
  const board = useBoardStore((state) => state.board);
  const updateBoard = useBoardStore((state) => state.updateBoard);

  const [draft, setDraft] = useReducer(
    (prev: any, next: any) => ({ ...prev, ...next }),
    { ...board }
  );

  const handleSave = (event: FormEvent) => {
    event.preventDefault();
    console.log(draft);
    updateBoard(draft);
    setState("");
  };

  if (state !== "settings" || !draft) return null;
  else
    return (
      <Modal>
        <div className="w-full max-w-md rounded-lg bg-white px-8 py-4 shadow-md md:max-w-lg ">
          <header className="mb-5 flex w-full items-center justify-between">
            <p className="text-xl font-medium">Board Settings</p>
            <button onClick={() => setState("")} className="bi bi-x-lg" />
          </header>

          <form onSubmit={handleSave} className="flex flex-col gap-5 p-3">
            <div className="board-settings-form">
              <label>Rename board</label>
              <input
                type="text"
                maxLength={15}
                value={draft.name}
                onChange={(e) => setDraft({ name: e.target.value })}
                className="board-settings-form-input"
                placeholder="Board name"
              />
            </div>

            <div className="board-settings-form">
              <label>Description</label>
              <input
                type="text"
                maxLength={30}
                value={draft.description}
                onChange={(e) => setDraft({ description: e.target.value })}
                className="board-settings-form-input"
                placeholder="Board description"
              />
            </div>

            <button
              onClick={() => setDraft({ public: !draft.public })}
              type="button"
              className="mt-4 flex gap-2"
            >
              Security:{" "}
              <span className="font-semibold">
                {draft.public ? "Public" : "Private"}
              </span>
              <i className={`bi bi-${draft.public ? "unlock" : "lock"}`} />
            </button>

            <div className="flex w-full items-center justify-end gap-3">
              <button
                onClick={() => setState("")}
                type="button"
                className="btn border-2 border-black bg-white text-black hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn border-2 border-primary-600 bg-primary-600 text-white hover:border-primary-700 hover:bg-primary-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
};

export default ModalBoardSettings;
