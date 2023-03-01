function ReportList(props: any): JSX.Element {
  const { reports, loading, setSelectedReport, selectedReport,
  newReport, setNewReport, handleAddReport } = props
  
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
          {Object.keys(reports).map((reportKey, i) => {
            return (
              <button key={i}
              className={`text-left duration-300 hover:bg-slate-700 cursor-pointer select-none ${
                reportKey === selectedReport ? "text-orange-500" : ""
              }`}
              onClick={()=> setSelectedReport(reportKey)}
              >
                {reports[reportKey].title}
              </button>
            );
          })}

          {/* NEW BUTTON TO ADD COMMENTS */}

          <div className="w-full h-full flex flex-col  sm:gap-2 overflow-y-auto ">
        <input
          type="text"
          placeholder="Enter new report title"
          value={newReport?.title ?? ""}
          onChange={(e) =>
            setNewReport({ ...newReport, title: e.target.value })
          }
          className="bg-slate-900 outline-none rounded-md p-3 text-base sm:text-lg text-white flex-1"
        />
        <textarea
          placeholder="Enter new Url description"
          value={newReport?.docUrl ?? ""}
          onChange={(e) =>
            setNewReport({ ...newReport, docUrl: e.target.value })
          }
          className="bg-slate-900 outline-none rounded-md text-white p-3 text-base sm:text-lg flex-1"
        />
        <div className="flex justify-between">
           <button
            className="max-h-10 py-1 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase"
            onClick={() => {
              handleAddReport();
            }}
          >
            Save
          </button>
        </div>
      </div>
          
        </>
      )}
    </>
  );
}

export default ReportList;
