interface IframeProps {
    selectedReportId: number | null;
    reports: {
        id: number;
        name: string;
        text: string
    }[]
}

function IframeGrid({selectedReportId, reports}: IframeProps): JSX.Element {
    const reportText = reports.find((report) => report.id === selectedReportId)?.text
    return (
        <>
            {selectedReportId !== null ? (
                <iframe
                className="bg-slate-400 h-full rounded-md"
                srcDoc={reportText}/>
            ) : (
                <div className="text-slate-100 text-lg font-semibold text-center">
                Select report from the list
                </div>
            )}
        </>
    )
}

export default IframeGrid;