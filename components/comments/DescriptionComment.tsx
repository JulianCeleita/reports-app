import { deleteField, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import useFetchComments from "../../hooks/fetchComments";

export interface CommentProps {
    children: React.ReactNode;
    edit: string | null;
    handleAddEdit: (key: string) => () => void;
    edittedValue: string;
    setEdittedValue: React.Dispatch<React.SetStateAction<string>>;
    todoKey: string;
    handleEditTodo: () => void;
    handleDelete: (key: string) => () => void;
  }

type Comments = Record<string, string>;

export default function CommentDescription(props: CommentProps) {
    const {
      children,
      edit,
      edittedValue,
      setEdittedValue,
      commentKey
    } = props;

    const { currentUser } = useAuth();
    const [edit, setEdit] = useState<string | any>(null);
    const [comment, setComment] = useState<string>("");
    const [edittedValue, setEdittedValue] = useState<string>("");
  
    const { comments, setComments, loading } = useFetchComments();
  

    
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
      <div className="p-2 relative sm:p-3 border flex items-stretch border-white border-solid ">
        <div className="flex-1 flex">
          {!(edit === commentKey) ? (
            <>{children}</>
          ) : (
            <input
              className="bg-inherit flex-1 text-white outline-none"
              value={edittedValue}
              onChange={(e) => setEdittedValue(e.target.value)}
            />
          )}
        </div>
        <div className="flex items-center">
          {edit === commentKey ? (
            <i
              onClick={handleEditComment}
              className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"
            ></i>
          ) : (
            <i
              onClick={handleAddEdit(commentKey)}
              className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"
            ></i>
          )}
          <i
            onClick={handleDelete(commentKey)}
            className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"
          ></i>
        </div>
      </div>
    );
  }