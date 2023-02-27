import { useState } from "react";
import { reports } from "../database";
import useFetchComments from "../hooks/fetchComments";
import CommentList from "./comments/CommentList";
import IframeGrid from './IframeGrid';
import ReportList from "./ReportList";
import { useAuth } from "context/AuthContext";
import { deleteField, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function Reports(): JSX.Element {
  const { currentUser } = useAuth();
  const { comments, setComments, loading } = useFetchComments();
  const [newComment, setNewComment] = useState<{ title: string, description: string } | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [edit, setEdit] = useState<string | any>(null);
  const [edittedValue, setEdittedValue] = useState<string>("");
  
  // AGREGAR REPORTES A LA LISTA
  
  const handleReportClick = (reportId: number) => {
    setSelectedReportId(reportId);
  };

  // AGREGAR COMENTARIOS A LA LISTA

  async function handleAddComment() {
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
  }

  // CAMBIAR ENTRE EL INPUT Y EL EDIT

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


  // VISUAL ZONE

  return (
    <div className="h-full max-h-screen flex">
      <div className="flex-1 grid gap-2 grid-flow-row-dense lg:grid-rows-3 lg:grid-cols-4 md:grid-cols-3 md:grid-rows-2">
        {/* LISTA DE REPORTES */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md p-4 lg:row-span-3 lg:col-span-1 md:col-span-1">
        <ReportList selectedReportId={selectedReportId} handleReportClick={handleReportClick} />
        </div>

        {/* IFRAME HERE */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md p-4 lg:row-span-2 lg:col-span-2 md:col-span-2 flex flex-col justify-center">
          <IframeGrid selectedReportId={selectedReportId} reports={reports} />
        </div>
        

      {/* COMMENTS LIST  */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-2 lg:col-span-1 md:col-span-1 h-full flex flex-col gap-3 sm:gap-2 ">
          <CommentList 
          comments={comments}
          loading={loading}    
          setIsAdding={setIsAdding}
          setSelectedComment={setSelectedComment}
          setEdit={setEdit}   
          setEdittedValue={setEdittedValue}
          selectedComment={selectedComment}
          handleAddButtonClick={handleAddButtonClick}
          />
        </div>

    
           {/* DESCRIPCION DEL COMENTARIO */}

           <div className="grid grid-cols-1 place-items-stretch bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md p-4 lg:col-span-3 md:col-span-2 md:row-span-1">
           <div>
           {isAdding ? (
            <div className="w-full h-full flex flex-col  sm:gap-2 overflow-y-auto ">
            <input
              type="text"
              placeholder="Enter new comment title"
              value={newComment?.title ?? ""}
              onChange={(e) => setNewComment({ ...newComment, title: e.target.value})}
              className="bg-slate-900 outline-none rounded-md p-3 text-base sm:text-lg text-white flex-1"
            />
            <textarea
              placeholder="Enter new comment description"
              value={newComment?.description ?? ""}
              onChange={(e) => setNewComment({ ...newComment, description: e.target.value})}
              className="bg-slate-900 outline-none rounded-md text-white p-3 text-base sm:text-lg flex-1"
            />
            <div className="flex justify-between">
                 <button 
                 className="max-h-10 py-1 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase"
                 onClick={()=> {
                  handleAddButtonClick();
                  setSelectedComment(null);
                }}
                 >
                   Cancel
                 </button>
                 <button className="max-h-10 py-1 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase"
                 onClick={()=> {
                  handleAddComment(null);
                  setNewComment(null);                  
                  setSelectedComment(null);
                 }}>
                   Save
                 </button>
               </div>
          </div>
           ) : (<div className="flex justify-center items-center h-full">
           {selectedComment !== null ? comments[selectedComment] ? (
             <div className="w-full h-full flex flex-col  sm:gap-2 overflow-y-auto ">
               <input className="bg-slate-900 outline-none rounded-md p-3 text-base sm:text-lg text-white flex-1"
                value={edittedValue?.title || comments[selectedComment].title}
                onChange={(e)=> setEdittedValue((prevState)=> ({
                  ...prevState,
                  title: e.target.value,
                }))}
               />
               <textarea className="bg-slate-900 outline-none rounded-md text-white p-3 text-base sm:text-lg flex-1"
               value={edittedValue?.description || comments[selectedComment].description}
               onChange={(e)=> setEdittedValue((prevState)=> ({
                ...prevState,
                description: e.target.value || "",
              }))}
              />              
               <div className="flex justify-between">
                 <button 
                 className="max-h-10 py-1 px-4 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 border-solid uppercase"
                 onClick={handleDelete(selectedComment)}
                 >
                   Delete
                 </button>
                 <button className="max-h-10 py-1 px-4 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 border-solid uppercase"
                 onClick={()=> {
                  handleEditComment();
                  setEdit(null);
                  setSelectedComment(null);
                 }}>
                   Save
                 </button>
               </div>
             </div>
           ): null : (

              <div className="text-slate-100 text-lg font-semibold text-center">
               Select comment from the list
             </div>
           ) }
             </div>)}
             </div>
         </div>



 
      </div>
    </div>
  );
}
export default Reports;
