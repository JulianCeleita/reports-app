import { useState } from "react";
import { reports } from "../database/reportsData";
import ListComment from "./comments/ListComment";

function Reports() {
  
  // AGREGAR REPORTES A LA LISTA
  
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const handleReportClick = (reportId: number) => {
    setSelectedReportId(reportId);
  };
  return (
    <div className="flex-1 h-full flex">
      <div className="flex-1 grid gap-2 grid-flow-row-dense lg:grid-rows-3 lg:grid-cols-4 md:grid-cols-3 md:grid-rows-2">
        

        {/* LISTA DE REPORTES */}
        
        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-3 lg:col-span-1 md:col-span-1">
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
              Select report from the list
            </div>
          )}
        </div>


            {/* LISTA DE COMENTARIOS */}

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-2 lg:col-span-1 md:col-span-1">
          <ListComment/>
          {/* <h2 className="text-slate-100 text-xl mb-4 font-semibold leading-6">
            Comments
          </h2>
          <p className="text-slate-200">
            <ol>
              <li className="mb-2"> Feature 1 </li>
              <li className="mb-2"> Feature 2 </li>
              <li className="mb-2"> Feature 3 </li>
              <li className="mb-2"> Feature 4 </li>
              <li className="mb-2"> Feature 5 </li>
              <li className="mb-2"> Feature 6 </li>
            </ol>
          </p>
          <div className="flex justify-end bg-inherit bottom-0 right-0">
            <button className="p-2 max-h-10 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase">
              Add
            </button>
          </div> */}
        </div>


        {/* DESCRIPCION DEL COMENTARIO */}

        <div className="grid grid-cols-1 place-items-stretch bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md p-4 lg:col-span-3 md:col-span-2 md:row-span-1">
          <h2 className="text-slate-100 text-xl font-semibold leading-6">
            Title Comment
          </h2>
          <p className="text-slate-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque faucibus cursus sollicitudin. Aenean bibendum id leo
            sit amet ultricies. Pellentesque faucibus cursus sollicitudin.
            Aenean bibendum id leo sit amet ultricies. a id velit. Fusce ut nibh
            et ex semper rhoncus.
          </p>
          <div className="flex justify-between">
            <button 

              className="max-h-10 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase">
              Delete
            </button>
            <button className="max-h-10 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reports;
