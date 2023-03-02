import { useAuth } from "context/AuthContext";
import { addDoc, deleteField, doc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from "react";
import { db } from "../firebase";
import useFetchComments from "../hooks/fetchComments";
import useFetchReports, {CommentType} from "../hooks/fetchReports";
import { AddComment, CommentList, EditComment } from "./comments";
import { IframeGrid, ReportList } from "./reports";

function Dashboard(): JSX.Element {
  const { currentUser } = useAuth();
  const { comments, setComments, loading } = useFetchComments();
  const [newComment, setNewComment] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [edit, setEdit] = useState<string | any>(null);
  const [edittedValue, setEdittedValue] = useState<any>("");
  const { reports, setReports } = useFetchReports();
  const [newReport, setNewReport] = useState<{
    title: string;
    docUrl: string;
    comments: [];
  } | null>(null);

  // AGREGAR REPORTES A LA LISTA

  async function handleAddReport() {
    if (!currentUser) {
      return <div>Loading...</div>;
    }
    if (!newReport?.title || !newReport?.docUrl) {
      return;
    }
    const newKey =
      reports === null || Object.keys(reports).length === 0
        ? 1
        : Math.max(...Object.keys(reports).map(Number)) + 1;
    const comments = newReport.comments
    ? newReport.comments.map((comment: CommentType) => ({
        id: comment.id,
        title:comment.title,
        description: comment.description,
    }))
    : [];
    setReports({ 
        ...reports, 
        [newKey]: {
            title: newReport.title,
            docUrl: newReport.docUrl,
            comments: []
        }
    });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        reports: {
          [newKey]: {
            title: newReport.title,
            docUrl: newReport.docUrl,
            comments: []
          },
        },
      },
      { merge: true }
    );
    setNewReport(null);
  }

  // AGREGAR COMENTARIOS A LA LISTA

  async function handleAddComment(){
    if (!currentUser) {
      return <div>Loading...</div>
    }
    if (!newComment?.title || !newComment?.description){
      return;
    }
    try {
      const commentRef = await addDoc(collection(db, "comments"), {
      title: newComment.title,
      description: newComment.description,
    })
    const comment = {
      ...newComment,
    }
    setComments({ ...comments, [commentRef.id]: comment })
    const userRef = doc(db, "user", currentUser.uid);
    await updateDoc (userRef, {
      comments: {
        [commentRef.id]: comment,
      },
    });
    setIsAdding(false);
    setNewComment(null);
    setSelectedComment(commentRef.id);
  } catch (error) {
    console.log("Error adding document: ", error)
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

  // DELETE COMMENTS OF THE LIST

  function handleDelete(commentKey: string) {
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
  console.log(reports)

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
          newReport={setNewReport}
          setNewReport={setNewReport}
          handleAddReport={handleAddReport}
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
                {selectedComment !== null ? (
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
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
