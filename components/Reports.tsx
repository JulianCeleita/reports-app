function Reports() {
  return (
    <div className="flex-1 h-full flex">
      <div className="flex-1 grid gap-2 grid-flow-row-dense lg:grid-rows-3 lg:grid-cols-4 md:grid-cols-3 md:grid-rows-2">
        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-3 lg:col-span-1 md:col-span-1">
          <h2 className="text-slate-100 text-xl mb-4 font-semibold leading-6">
            Reports
          </h2>
          <p className="text-slate-200">
            <ol>
              <li className="mb-2"> Section 1 </li>
              <li className="mb-2"> Section 2 </li>
              <li className="mb-2"> Section 3 </li>
              <li className="mb-2"> Section 4 </li>
              <li className="mb-2"> Section 5 </li>
              <li className="mb-2"> Section 6 </li>
              <li className="mb-2"> Section 7 </li>
              <li className="mb-2"> Section 8 </li>
              <li className="mb-2"> Section 9 </li>
              <li className="mb-2"> Section 10 </li>
              <li className="mb-2"> Section 11 </li>
              <li className="mb-2"> Section 12 </li>
              <li className="mb-2"> Section 13 </li>
              <li className="mb-2"> Section 14 </li>
              <li className="mb-2"> Section 15 </li>
            </ol>
          </p>
          <div className="flex justify-end bg-inherit items-center">
            <button className="p-2 max-h-10 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase">
              Add
            </button>
            </div>
        </div>

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-2 lg:col-span-2 md:col-span-2 flex flex-col justify-center">
          <h2 className="text-slate-100 text-lg font-semibold leading-6 text-center ">
            IFRAME
          </h2>
        </div>

        <div className="bg-slate-800 border-l-2 border-orange-400 rounded-md shadow-md space-y-2 p-4 lg:row-span-2 lg:col-span-1 md:col-span-1">
          <h2 className="text-slate-100 text-xl mb-4 font-semibold leading-6">
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
            </div>
        </div>

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
            <button className="max-h-10 bg-orange-500 rounded-md text-white font-medium duration-200 hover:scale-105 hover:bg-orange-700 w-[10ch] border-solid uppercase">
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
