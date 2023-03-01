
function IframeGrid( props: any): JSX.Element {
  const {reports, setSelectedReport, selectedReport} = props;

  return (
    <>
      {setSelectedReport !== null ? (
        <iframe
          className="bg-slate-400 h-full rounded-md"
          srcDoc={reports[selectedReport].title}
        />
      ) : (
        <div className="text-slate-100 text-lg font-semibold text-center">
          Select report from the list
        </div>
      )}
    </>
  );
}

export default IframeGrid;
