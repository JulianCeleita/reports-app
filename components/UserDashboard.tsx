import { deleteField, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import useFetchComments from "../hooks/fetchComments";
import CommentCard from "./comments/ListComment";

type Comments = Record<string, string>;

export default function UserDashboard(): JSX.Element {
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState<string | any>(null);
  const [comment, setComment] = useState<string>("");
  const [edittedValue, setEdittedValue] = useState<string>("");

  const { comments, setComments, loading } = useFetchComments();

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

  async function handleEditComment() {
    if (!currentUser) {
      return <div>Loading...</div>;
    }
    if (!edittedValue) {
      return;
    }
    const newKey = edit;
    setComments({ ...comments, [newKey]: edittedValue });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        comments: {
          [newKey]: edittedValue,
        },
      },
      { merge: true }
    );
    setEdit(null);
    setEdittedValue("");
  }

  function handleAddEdit(commentKey: any) {
    return () => {
      setEdit(commentKey);
      setEdittedValue(comments[commentKey]);
    };
  }

  function handleDelete(commentKey: string) {
    return async () => {
      if (!currentUser) {
        return <div>Loading...</div>;
      }
      const tempObj: Comments = { ...comments };
      delete tempObj[commentKey];

      setComments(tempObj);
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          comments: {
            [commentKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
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
          className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40"
        >
          ADD
        </button>
      </div>
      {loading && (
        <div className="flex-1 grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
        </div>
      )}
      {!loading && (
        <>
          {Object.keys(comments).map((comment, i) => {
            return (
              <CommentCard
                handleEditComment={handleEditComment}
                key={i}
                handleAddEdit={handleAddEdit}
                edit={edit}
                commentKey={comment}
                edittedValue={edittedValue}
                setEdittedValue={setEdittedValue}
                handleDelete={handleDelete}
              >
                {comments[comment]}
              </CommentCard>
            );
          })}
        </>
      )}
    </div>
  );
}
