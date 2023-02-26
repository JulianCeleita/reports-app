import { useAuth } from "context/AuthContext";
import { deleteField, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import CommentList from "./tools/CommentList";
import { db } from "../../firebase";
import useFetchComments from "../../hooks/fetchComments";

export interface TodoCardProps {
  children: React.ReactNode;
  edit: string | null;
  handleAddEdit: (key: string) => () => void;
  edittedValue: string;
  setEdittedValue: React.Dispatch<React.SetStateAction<string>>;
  todoKey: string;
  handleEditTodo: () => void;
  handleDelete: (key: string) => () => void;
}

type Todos = Record<string, string>;

export default function DescriptionComment(props: TodoCardProps): JSX.Element {
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState<string | any>(null);
  const [edittedValue, setEdittedValue] = useState<string>("");

  const { todos, setTodos, loading } = useFetchComments();
  const { children, todoKey } = props;
  
  async function handleEditTodo() {
    if (!currentUser) {
      return <div>Loading...</div>;
    }
    if (!edittedValue) {
      return;
    }
    const newKey = edit;
    setTodos({ ...todos, [newKey]: edittedValue });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: edittedValue,
        },
      },
      { merge: true }
    );
    setEdit(null);
    setEdittedValue("");
  }

  function handleAddEdit(todoKey: any) {
    return () => {
      setEdit(todoKey);
      setEdittedValue(todos[todoKey]);
    };
  }

  function handleDelete(todoKey: string) {
    return async () => {
      if (!currentUser) {
        return <div>Loading...</div>;
      }
      const tempObj: Todos = { ...todos };
      delete tempObj[todoKey];

      setTodos(tempObj);
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [todoKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
  }

  return (
    <div className="w-full h-full flex flex-col  sm:gap-2 overflow-y-auto ">
      <h2 className="text-slate-100 text-xl font-semibold leading-6">
        Title Comment
      </h2>

      {/* COMMENTS LIST  */}
      <div className="flex-1 flex">
        {!(edit === todoKey) ? (
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
        {edit === todoKey ? (
          <i
            onClick={handleEditTodo}
            className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={handleAddEdit(todoKey)}
            className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"
          ></i>
        )}
        <i
          onClick={handleDelete(todoKey)}
          className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"
        ></i>
      </div>
    </div>
  );
}
