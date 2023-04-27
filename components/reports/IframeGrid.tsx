function IframeGrid(props: any): JSX.Element {
  const { reports, selectedReport, setSelectedReport } = props;

  return (
    <>
      {setSelectedReport !== null ? (
        <div className="bg-slate-400 flex justify-center items-center w-full h-full rounded-md ">
          <iframe
            src={reports[selectedReport].docUrl}
            width="560"
            height="315"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="text-slate-100 text-lg font-semibold text-center">
          Select report from the list
        </div>
      )}
    </>
  );
}

export default IframeGrid;
