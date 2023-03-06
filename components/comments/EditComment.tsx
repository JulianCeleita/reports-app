function EditComment(props: any): JSX.Element {
  const {
    reports,
    selectedReport,
    setEdit,
    edittedValue,
    setEdittedValue,
    handleDeleteComment,
    handleEditComment,
    selectedComment,
    setSelectedComment,
  } = props;

  const comment = reports[selectedReport].comments.find((c: CommentType) => c.id === selectedComment);


  return (
    <>
      <div className="w-full h-full flex flex-col  sm:gap-2 overflow-y-auto ">
        <input
          className="bg-slate-900 outline-none rounded-md p-3 text-base sm:text-lg text-white flex-1"
          value={edittedValue?.title || comment?.title}
          onChange={(e) =>
            setEdittedValue((prevState: any) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
        <textarea
          className="bg-slate-900 outline-none rounded-md text-white p-3 text-base sm:text-lg flex-1"
          value={edittedValue?.description || comment?.description}
          onChange={(e) =>
            setEdittedValue((prevState: any) => ({
              ...prevState,
              description: e.target.value || "",
            }))
          }
        />
        <div className="flex justify-between">
          <button
            className="max-h-10 py-1 px-4 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 border-solid uppercase"
            onClick={() => {
              handleDeleteComment()
            }}
          >
            Delete
          </button>
          <button
            className="max-h-10 py-1 px-4 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 border-solid uppercase"
            onClick={() => {
              handleEditComment();
              setEdit(null);
              setSelectedComment(null);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
export default EditComment;
