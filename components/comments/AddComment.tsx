function AddComment(props: any): JSX.Element {
  const { newComment, setNewComment, handleAddButtonClick, handleAddComment } =
    props;

  return (
    <>
      <div className="w-full h-full flex flex-col  sm:gap-2 overflow-y-auto ">
        <input
          type="text"
          placeholder="Enter new comment title"
          value={newComment?.title ?? ""}
          onChange={(e) =>
            setNewComment({ ...newComment, title: e.target.value })
          }
          className="bg-slate-900 outline-none rounded-md p-3 text-base sm:text-lg text-white flex-1"
        />
        <textarea
          placeholder="Enter new comment description"
          value={newComment?.description ?? ""}
          onChange={(e) =>
            setNewComment({ ...newComment, description: e.target.value })
          }
          className="bg-slate-900 outline-none rounded-md text-white p-3 text-base sm:text-lg flex-1"
        />
        <div className="flex justify-between">
          <button
            className="max-h-10 py-1 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase"
            onClick={() => {
              handleAddButtonClick();
            }}
          >
            Cancel
          </button>
          <button
            className="max-h-10 py-1 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase"
            onClick={() => {
              handleAddComment();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
export default AddComment;
