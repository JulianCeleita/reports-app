function ReportList(props: any): JSX.Element {
  const { reports, loading, setSelectedReport, selectedReport, setSelectedComment } = props;

  return (
    <>
      <h2 className="text-slate-100  text-xl font-semibold leading-6">
        Reports
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
              <button
                className={`text-left duration-300 hover:bg-slate-700 cursor-pointer select-none ${
                  reportKey === selectedReport ? "text-orange-500" : ""
                }`}
                key={i}
                value={reportKey}
                onClick={() => {
                  setSelectedReport(reportKey)
                  setSelectedComment(null)
                }}
              >
                {reports[reportKey].title}
              </button>
            );
          })}
        </>
      )}
    </>
  );
}

export default ReportList;
