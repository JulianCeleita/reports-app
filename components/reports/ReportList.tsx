function ReportList(props: any): JSX.Element {
  const { reports, selectedReport, setSelectedReport, setSelectedComment } =
    props;

  return (
    <>
      <h2 className="text-slate-100  text-xl font-semibold leading-6">
        Reports
      </h2>

      {Object.keys(reports).map((reportKey, i) => {
        return (
          <button
            className={`text-left duration-300 hover:bg-slate-700 cursor-pointer select-none ${
              reportKey === selectedReport ? "text-orange-500" : ""
            }`}
            key={i}
            value={reportKey}
            onClick={() => {
              setSelectedReport(reportKey);
              setSelectedComment(null);
            }}
          >
            {reports[reportKey].title}
          </button>
        );
      })}
    </>
  );
}

export default ReportList;
