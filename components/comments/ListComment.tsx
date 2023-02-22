import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import useFetchComments from "../../hooks/fetchComments";
import { CommentProps } from './DescriptionComment';

export default function ListComment(): JSX.Element {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState<string>("");

  const { comments, setComments } = useFetchComments();

  async function handleAddComment() {
    if (!currentUser) {
      return <div>Loading...</div>;
    }
    if (!comment) {
      return;
    }
    const newKey =
      Object.keys(comments).length === 0
        ? 1
        : Math.max(...Object.keys(comments).map(Number)) + 1;
    setComments({ ...comments, [newKey]: comment });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        comments: {
          [newKey]: comment,
        },
      },
      { merge: true }
    );
    setComment("");
  }

  return (
    <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5">
      <div className="flex items-stretch">
        <input
          type="text"
          placeholder="Title comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
        />
        <button
          onClick={handleAddComment}
          className="p-2 max-h-10 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase"
        >
          ADD
        </button>
      </div>
          {Object.keys(comments).map((comment, i) => {
            return (
              <div
                key={i}
                commentKey={comment}
              >
                {comments[comment]}
              </div>
            );
          })}
        </div>
  );
}
