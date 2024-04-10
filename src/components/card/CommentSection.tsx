import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/use-auth';
import { database } from '@/lib/firebase'; // Make sure this import matches your actual file path
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import Firestore from the compat library

// Adjusted interface
interface Comment {
  id?: string; // id is optional since it's not used when adding a new comment
  displayName: string;
  text: string;
  createdAt?: firebase.firestore.FieldValue; // Include createdAt if you plan to use it
}

const CommentSection = () => {
  const { user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(database, 'comments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Comment, 'id'>), // Ensure data matches the Comment interface except for 'id'
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim() !== '' && user) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(database, 'comments'), {
          displayName: user.displayName || 'Anonymous',
          text: newComment.trim(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Input and button elements */}
      <div className="mt-2 space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 rounded-md p-2 text-gray-700">
            <strong>{comment.displayName}:</strong> {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
