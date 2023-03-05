import { useAuth } from "context/AuthContext";
import { addDoc, deleteField, doc, setDoc, collection, updateDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { db } from "../firebase";/* 
import useFetchComments from "../hooks/fetchComments"; */
import useFetchReports, {CommentType} from "../hooks/fetchReports";
import { AddComment, CommentList, EditComment } from "./comments";
import { IframeGrid, ReportList } from "./reports";

function Dashboard(): JSX.Element {
  const [selectedReport, setSelectedReport] = useState<number>(0);
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<CommentType | null>(null);

  const { currentUser } = useAuth();
  const { reports, setReports, loading } = useFetchReports();/* 
  const [comments, setComments] = useState(null) */
/*   const [newComment, setNewComment] = useState<{
    title: string;
    description: string;
  } | null>(null); */
 /*  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); */
  const [edit, setEdit] = useState<string | any>(null);
  const [edittedValue, setEdittedValue] = useState<any>("");
/* 
  const handleSelectReport = (index: number) => {
    setSelectedReport(index);
    setComments(reports[index]?.comments || []);
  }; */

  // AGREGAR COMENTARIOS A LA LISTA

  async function handleAddComment() {
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  if (!newComment?.title || !newComment?.description) {
    return;
  }
  const userRef = doc(db, "users", currentUser.uid);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    const reportData = userData.reports[selectedReport];
    const comments = reportData.comments || [];
    const newCommentData = {
      ...newComment,
    };
    newCommentData.id = comments.length === 0 ? 1 : Math.max(...comments.map((comment: CommentType) => comment.id)) + 1;
    const updatedComments = [...comments, newCommentData];
    await updateDoc(userRef, {
      [`reports.${selectedReport}.comments`]: updatedComments,
    });
    const updatedReports = reports;
    updatedReports[selectedReport] = { ...reportData, comments: updatedComments };
    setReports(updatedReports);
    setSelectedComment(newComment);
    setIsAdding(false);
    setNewComment(null)
  }
}


/*   async function handleAddComment() {
    if (!currentUser) {
      return <div>Loading...</div>;
    }
    if (!newComment?.title || !newComment?.description) {
      return;
    }
    const newKey =
      comments === null || Object.keys(comments).length === 0
        ? 1
        : Math.max(...Object.keys(comments).map(Number)) + 1;
    setComments({ ...comments, [newKey]: newComment });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        comments: {
          [newKey]: newComment,
        },
      },
      { merge: true }
    );
    setIsAdding(!isAdding);
    setNewComment(null);
  } */

  // CAMBIAR ENTRE LOS INPUTS Y EL EDIT

  const handleAddButtonClick = () => {
    setIsAdding(!isAdding);
    setNewComment(null);
  };

  // EDIT COMMENT OF THE LIST

  /* async function handleEditComment() {
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
 */
  // DELETE COMMENTS OF THE LIST

  /* function handleDelete(commentKey: string) {
    return async () => {
      if (!currentUser) {
        return <div>Loading...</div>;
      }
      const tempObj = { ...comments };
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
      setSelectedComment(null);
    };
  }
  console.log(reports) */

  return (
    <div className="h-full max-h-screen flex">
      <div className="flex-1 grid gap-2 grid-flow-row-dense lg:grid-rows-3 lg:grid-cols-4 md:grid-cols-3 md:grid-rows-2">
        {/* REPORTS LIST */}

        <div className="h-full flex flex-col gap-2 sm:gap-1 bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-3 lg:col-span-1 md:col-span-1">
          <ReportList
          reports={reports}
          loading={loading} 
          setSelectedReport={setSelectedReport}
          selectedReport={selectedReport}
          />
        </div>

        {/* IFRAME */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md p-4 lg:row-span-2 lg:col-span-2 md:col-span-2 flex flex-col justify-center">
          <IframeGrid 
            selectedReport={selectedReport} 
            setSelectedReport={selectedReport} 
            reports={reports} />
        </div>

        {/* COMMENTS LIST  */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-2 lg:col-span-1 md:col-span-1 h-full flex flex-col gap-3 sm:gap-2 ">
          <CommentList
          /* comments={comments} */
            reports={reports}
            setSelectedReport={selectedReport}
            selectedReport={selectedReport}
            loading={loading}
            setIsAdding={setIsAdding}
            setSelectedComment={setSelectedComment}
            setEdit={setEdit}
            setEdittedValue={setEdittedValue}
            selectedComment={selectedComment}
            handleAddButtonClick={handleAddButtonClick}
          />
        </div>

        {/* DESCRIPTION */}

        <div className="grid grid-cols-1 place-items-stretch bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md p-4 lg:col-span-3 md:col-span-2 md:row-span-1">
          <div>
            {isAdding ? (
              <AddComment
                newComment={newComment}
                setNewComment={setNewComment}
                handleAddButtonClick={handleAddButtonClick}
                setSelectedComment={setSelectedComment}
                handleAddComment={handleAddComment}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                {/* {selectedComment !== null ? (
                  comments[selectedComment] ? (
                    <EditComment
                      comments={comments}
                      edittedValue={edittedValue}
                      setEdittedValue={setEdittedValue}
                      selectedComment={selectedComment}
                      handleDelete={handleDelete}
                      handleEditComment={handleEditComment}
                      setEdit={setEdit}
                      setSelectedComment={setSelectedComment}
                    />
                  ) : null
                ) : (
                  <div className="text-slate-100 text-lg font-semibold text-center">
                    Select comment from the list
                  </div>
                )} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
