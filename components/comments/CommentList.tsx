import { CommentType } from "../../hooks/fetchReports";
function CommentList(props: any): JSX.Element {
  const {
    reports,
    setSelectedReport,
    selectedReport,
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
      {loading && (
        <div className="grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}
      {!loading && (
        <>
          {setSelectedReport !== null ? (
            <>
                    <h2 className="text-slate-100  text-xl font-semibold leading-6">
                      Comments
                    </h2>
              {reports[selectedReport].comments.map((comment: CommentType) => {
                return (
                  
                    <button
                      className={`text-left duration-300 hover:bg-slate-700 cursor-pointer select-none ${
                        comment.id === selectedComment ? "text-orange-500" : ""
                      }`}
                      key={comment.id}
                      onClick={(e) => {
                        setSelectedComment(comment.id);
                        setEdit(comment.id);
                        setEdittedValue(comments[comment.id]);
                        setIsAdding(false);
                      }}
                    >
                      {comment.title}
                    </button>
                  
                );
              })}
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
          ) : (
            <div className="text-slate-100 text-lg font-semibold text-center">
              Select report from the list
            </div>
          )}
        </>
      )}
    </>
  );
}
export default CommentList;
