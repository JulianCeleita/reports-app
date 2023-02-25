import { useAuth } from "context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import useFetchComments from "../../hooks/fetchComments";

export interface CommentProps {
  children: React.ReactNode;
  edit: string | null;
  handleAddEdit: (key: string) => () => void;
  edittedValue: string;
  setEdittedValue: React.Dispatch<React.SetStateAction<string>>;
  commentKey: string;
  handleEditComment: () => void;
  handleDelete: (key: string) => () => void;
}
export default function ListComment(props: CommentProps): JSX.Element {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<number>()
  const { children, commentKey } = props;

  const { comments, setComments, loading } = useFetchComments();

  console.log(comments);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------






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
    <div className="w-full max-w-[65ch] h-full flex flex-col gap-3 sm:gap-2 overflow-y-auto ">
      <h2 className="text-slate-100 mb-4 text-xl font-semibold leading-6">
        Comments
      </h2>

      {/* COMMENTS LIST  */}

      {loading && (
        <div className="grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}
      {!loading && (
        <>
          {Object.keys(comments).map((comment, i) => {
            return (
              <button
                className="flex-1 text-left duration-300 hover:bg-slate-700 cursor-pointer select-none"
                key={i}
                value={commentKey}
              >
                {comments[comment]}
              </button>
            );
          })}

          {/* NEW BUTTON TO ADD COMMENTS */}

          <div className="flex items-stretch rounded-md">
            <input
              type="text"
              placeholder="Enter new comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
            />
            <button
              onClick={handleAddComment}
              className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white font-medium text-base duration-300 hover:opacity-40"
            >
              ADD
            </button>
          </div>
        </>
      )}
    </div>
  );
}
