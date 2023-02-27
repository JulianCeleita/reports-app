function CommentList(props: any): JSX.Element {
  const {
    comments,
    loading,
    setIsAdding,
    setSelectedComment,
    setEdit,
    setEdittedValue,
    selectedComment,
    handleAddButtonClick,
  } = props;

  return (
    <>
      <h2 className="text-slate-100  text-xl font-semibold leading-6">
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
                className={`text-left duration-300 hover:bg-slate-700 cursor-pointer select-none ${
                  commentKey === selectedComment ? "text-orange-500" : ""
                }`}
                key={i}
                value={commentKey}
                onClick={(e) => {
                  setSelectedComment(commentKey);
                  setEdit(commentKey);
                  setEdittedValue(comments[commentKey]);
                  setIsAdding(false);
                }}
              >
                {comments[commentKey].title}
              </button>
            );
          })}

          {/* NEW BUTTON TO ADD COMMENTS */}

          <div className="flex w-full items-stretch rounded-md">
            <button
              onClick={() => {
                handleAddButtonClick();
                setSelectedComment(false);
              }}
              className="max-h-10 py-1 px-2 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 border-solid uppercase"
            >
              ADD COMMENT
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default CommentList;
