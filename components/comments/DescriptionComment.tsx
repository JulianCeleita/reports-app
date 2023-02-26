import { useAuth } from "context/AuthContext";
import { deleteField, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import CommentList from "./tools/CommentList";
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

type Comments = Record<string, string>;

export default function DescriptionComment(props: CommentProps): JSX.Element {
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState<string | any>(null);
  const [edittedValue, setEdittedValue] = useState<string>("");

  const { comments, setComments, loading } = useFetchComments();
  const { children, commentKey } = props;
  
  async function handleEditComment() {
    if (!currentUser) {
      return <div>Loading...</div>;
    }
    if (!edittedValue?.title || !edittedValue?.description) {
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
    <div className="w-full h-full flex flex-col  sm:gap-2 overflow-y-auto ">
      <h2 className="text-slate-100 text-xl font-semibold leading-6">
        Title Comment
      </h2>

      {/* COMMENTS LIST  */}
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

const { reports, setReports, loading } = useFetchReports();
const [newReport, setNewReport] = useState<{ title: string, description: string } | null>(null);
const { currentUser } = useAuth();

async function handleAddReport() {
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  if (!newReport?.title || !newReport?.description) {
    return;
  }
  const newKey =
  reports === null || Object.keys(reports).length === 0
      ? 1
      : Math.max(...Object.keys(reports).map(Number)) + 1;
  setReports({ ...reports, [newKey]: newReport });
  const userRef = doc(db, "users", currentUser.uid);
  await setDoc(
    userRef,
    {
      reports: {
        [newKey]: newReport,
      },
    },
    { merge: true }
  );
  setNewReport(null);
}