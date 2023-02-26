import { reports } from "database";
import useState from "react";

interface ReportListProps {
  selectedReportId: number | null;
  handleReportClick: (reportId: number) => void;
}

function ReportList({ selectedReportId, handleReportClick }: ReportListProps) {
  return (
    <>
      <h2 className="text-slate-100 text-xl mb-4 font-semibold leading-6">
        Reports
      </h2>
      <div className="text-slate-200 flex flex-col">
        {reports.map((report) => (
          <button
            className={`text-left my-1 duration-300 hover:bg-slate-700 cursor-pointer select-none ${
              report.id === selectedReportId ? "text-orange-500" : ""
            }`}
            key={report.id}
            onClick={() => handleReportClick(report.id)}
          >
            {report.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default ReportList;
