



<div className="grid grid-cols-3 gap-4">
    <div className="col-span-2">
      <div className="grid grid-cols-1 place-items-stretch bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md p-4">
        {isChanging ? (
          <div className="flex w-full items-stretch rounded-md">
            <input
              type="text"
              placeholder="Enter new comment title"
              value={newComment?.title ?? ""}
              onChange={(e) =>
                setNewComment({ ...newComment, title: e.target.value })
              }
              className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
            />
            <textarea
              placeholder="Enter new comment description"
              value={newComment?.description ?? ""}
              onChange={(e) =>
                setNewComment({ ...newComment, description: e.target.value })
              }
              className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
            />
            <button
              onClick={handleAddComment}
              className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white font-medium text-base duration-300 hover:opacity-40"
            >
              ADD
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            {selectedComment !== null ? (
              comments[selectedComment] ? (
                <div className="w-full h-full flex flex-col sm:gap-2 overflow-y-auto ">
                  <h2 className="text-slate-100 text-xl font-semibold leading-6">
                    {comments[selectedComment].title}
                  </h2>
                  <div className="flex-1 flex">
                    {comments[selectedComment].description}
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="max-h-10 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase"
                      onClick={handleDelete(selectedComment)}
                    >
                      Delete
                    </button>
                    <button className="max-h-10 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase">
                      Save
                    </button>
                  </div>
                </div>
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
    <div className="col-span-1">
      <button
        onClick={handleChangeButtonClick}
        className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white font-medium text-base duration-300 hover:opacity-40"
      >
        Change
      </button>
    </div>
  </div>


 
 
 
 
 