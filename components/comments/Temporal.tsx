



{/* LISTA DE REPORTES */}

<div className="bg-slate-800 border-l-2 border-orange-400 rounded-md p-4 lg:row-span-3 lg:col-span-1 md:col-span-1">
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
</div>

        {/* Aqui va el IFRAME */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md p-4 lg:row-span-2 lg:col-span-2 md:col-span-2 flex flex-col justify-center">
          {selectedReportId !== null ? (
            <iframe
              className="bg-slate-400 h-full rounded-md"
              srcDoc={
                reports.find((report) => report.id === selectedReportId)?.text
              }
            />
          ) : (
            <div className="text-slate-100 text-lg font-semibold text-center">
              Select comment from the list
            </div>
          )}
        </div>


 
 
 
 
 