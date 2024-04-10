import { useState } from 'react';
import { CheckCircleOutline, Edit, Delete } from '@material-ui/icons';
import { useAuth } from '@/lib/use-auth';
//import CommentSection from './CommentSection';
import useBoardStore from '@/lib/store';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '@/lib/firebase';

interface Props {
  card: {
    id: string;
    name: string;
    checklist: { item: string; checked: boolean }[];
  };
  update: (name: string) => void;
  remove: () => void;
  updateChecklist: (cardID: string, checklist: { item: string; checked: boolean }[]) => void;

}


const Card = ({ card, update, remove }: Props) => {
  const { user } = useAuth();
  const boardStore = useBoardStore();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(card.name);
  const [showIcons, setShowIcons] = useState(false);
  const [checklist, setChecklist] = useState<{ item: string; checked: boolean }[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [inputValue, setInputValue] = useState(""); // Initialize to an empty string

  const handleAddChecklistItem = async () => {
    if (newChecklistItem.trim() !== '') {
      const newChecklist = [...checklist, { item: newChecklistItem.trim(), checked: false }];
      setChecklist(newChecklist);
      setNewChecklistItem('');

      if (user && user.uid && boardStore.boardID && card.id) {
        const cardRef = doc(database, `users/${user.uid}/boards/${boardStore.boardID}/cards`, card.id);
        try {
          await updateDoc(cardRef, { checklist: newChecklist });
        } catch (error) {
          console.error('Error updating checklist:', error);
        }
      } else {
        console.error('Error: Missing user UID, board ID, or card ID');
        console.error('user.uid:', user?.uid);
        console.error('boardStore.boardID:', boardStore.boardID);
        console.error('card.id:', card.id);
        console.log('card:', card);
        console.log('Card prop:', card);
      }
    }
  };




  const handleUpdateChecklist = () => {
    boardStore.updateChecklist(card.id, checklist);
  };

  const handleChecklistItemToggle = (index: number) => {
    setChecklist((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div
      className="group flex flex-col w-full items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out p-4"
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <div className="flex w-full items-center justify-between">
        {edit ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow px-2 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        ) : (
          <h3 className="text-lg font-semibold break-words">{card.name}</h3>
        )}
        <div className={`flex gap-2 ${showIcons ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'}`}>
          {edit ? (
            <>
              <CheckCircleOutline
                onClick={() => {
                  update(name);
                  handleUpdateChecklist();
                  setEdit(false);
                }}
                className="text-green-500 cursor-pointer"
              />

              <Delete
                onClick={() => {
                  setEdit(false);
                  setName(card.name);
                }}
                className="text-red-500 cursor-pointer"
              />
            </>
          ) : (
            <>
              <Edit
                onClick={() => setEdit(true)}
                className="text-gray-500 cursor-pointer"
              />
              <Delete
                onClick={remove}
                className="text-gray-500 cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
      <div className="mt-4 w-full">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add a checklist item..."
            value={newChecklistItem}
            onChange={(e) => setNewChecklistItem(e.target.value)}
            className="flex-grow px-2 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          <button
            onClick={handleAddChecklistItem}
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-5">
          {checklist.map((item, index) => (
            <li
              key={index}
              onClick={() => handleChecklistItemToggle(index)}
              className={`cursor-pointer flex items-center gap-2 ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                readOnly
                className="form-checkbox rounded text-blue-500 focus:ring-blue-500"
              />
              {item.item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2 space-y-2">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 rounded-md p-2 text-gray-700">
            {comment}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Card;



