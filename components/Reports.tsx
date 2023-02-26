import { useState } from "react";
import { reports, comments } from "../database";
import { useAuth } from "context/AuthContext";
import { deleteField, doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase";
import useFetchComments from "../hooks/fetchComments";

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

function Reports(): JSX.Element {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState<string>("");
  const { comments, setComments, loading } = useFetchComments();
  const [newComment, setNewComment] = useState<{ title: string, description: string } | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
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
    setNewComment(null);
  }

  // CAMBIAR ENTRE EL INPUT Y EL EDIT

  const handleAddButtonClick = () => {
    setIsAdding(!isAdding);
    setNewComment(null)
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
<h2 className="text-slate-100 text-xl mb-4 font-semibold leading-6">
  Reports
</h2>
<div className="text-slate-200 flex flex-col">
  {reports.map((report) => (
    <button
      className={`text-left my-1 duration-300 hover:bg-slate-700 cursor-pointer select-none ${
        report.id === selectedReportId ? "text-orange-500" : ""
      }`}
      key={report.id}
      onClick={() => handleReportClick(report.id)}
    >
      {report.name}
    </button>
  ))}
</div>
</div>

        {/* IFRAME HERE */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md p-4 lg:row-span-2 lg:col-span-2 md:col-span-2 flex flex-col justify-center">
          {selectedReportId !== null ? (
            <iframe
              className="bg-slate-400 h-full rounded-md"
              srcDoc={
                reports.find((report) => report.id === selectedReportId)?.text
              }
            />
          ) : (
            <div className="text-slate-100 text-lg font-semibold text-center">
              Select comment from the list
            </div>
          )}
        </div>
        


      {/* COMMENTS LIST  */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-2 lg:col-span-1 md:col-span-1 h-full flex flex-col gap-3 sm:gap-2 ">
      <h2 className="text-slate-100 mb-4 text-xl font-semibold leading-6">
        Comments
      </h2>


      {loading && (
        <div className="grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}
      {!loading && (
        <>
          {Object.keys(comments).map((commentKey, i) => {
            return (
              <button
                className={`text-left my-1 duration-300 hover:bg-slate-700 cursor-pointer select-none ${
                  commentKey === selectedComment ? "text-orange-500" : ""
                }`}
                key={i}
                value={commentKey}
                onClick={()=>setSelectedComment(commentKey)}
              >
                {comments[commentKey].title}
              </button>
            );
          })}

          {/* NEW BUTTON TO ADD COMMENTS */}

          <div className="flex w-full items-stretch rounded-md">
            <button
            onClick={handleAddButtonClick}
            className="max-h-10 py-1 px-2 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 border-solid uppercase"
            >
            ADD COMMENT
          </button>
          </div>
        </>
      )}
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
                 onClick={handleAddButtonClick}
                 >
                   Cancel
                 </button>
                 <button className="max-h-10 py-1 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase"
                 onClick={handleAddComment}>
                   Save
                 </button>
               </div>
          </div>
           ) : (<div className="flex justify-center items-center h-full">
           {selectedComment !== null ? comments[selectedComment] ? (
             <div className="w-full h-full flex flex-col  sm:gap-2 overflow-y-auto ">
               <h2 className="text-slate-100 text-xl font-semibold leading-6">
               {comments[selectedComment].title}
               </h2>
               <div className="flex-1 flex">
               {comments[selectedComment].description}
               </div>
               <div className="flex justify-between">
                 <button 
                 className="max-h-10 py-1 px-4 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 border-solid uppercase"
                 onClick={handleDelete(selectedComment)}
                 >
                   Delete
                 </button>
                 <button className="max-h-10 py-1 px-4 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 border-solid uppercase">
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
