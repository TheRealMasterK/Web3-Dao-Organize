import { useState } from "react";

interface Props {
  card: {
    name: string;
  };
  update: (name: string) => void;
  remove: () => void;
}

const Card = ({ card, update, remove }: Props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(card.name);
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div
      className="group flex w-full items-center justify-between"
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <div className="flex w-full items-center justify-start gap-2">
        {edit ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full animate-pulse bg-inherit"
          />
        ) : (
          <p className="" style={{ wordBreak: "break-word" }}>
            {card.name}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        {edit ? (
          <>
            <button
              onClick={() => {
                update(name);
                setEdit(false);
              }}
              className="bi bi-check-lg text-xl text-green-500"
            ></button>
            <button
              onClick={() => {
                setEdit(false);
                setName(card.name);
              }}
              className="bi bi-x-lg text-red-500"
            ></button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEdit(true)}
              className="bi bi-pen trans text-gray-600 hover:text-yellow-600"
              style={{ display: showIcons ? "block" : "none" }}
            ></button>
            <button
              onClick={remove}
              className="bi bi-trash trans text-gray-600 hover:text-red-600"
              style={{ display: showIcons ? "block" : "none" }}
            ></button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
