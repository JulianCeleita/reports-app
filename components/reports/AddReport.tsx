function AddReport(props: any): JSX.Element {
    const {
      newReport,
      setNewReport,
      handleAddReport,
    } = props;
  
    return (
      <>
        <div>
          <input
            type="text"
            placeholder="Enter new report title"
            value={newReport?.title ?? ""}
            onChange={(e) =>
              setNewReport({ ...newReport, title: e.target.value })
            }
          />
          <input type="text"
          placeholder="Enter new document URL"
          value={newReport?.docUrl ?? ""}
          onChange={(e)=> 
            setNewReport({ ...newReport, docUrl: e.target.value})
            }
          />
          <div className="flex justify-between">
            <button
              onClick={() => {
                handleAddReport(null);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </>
    );
  }
  export default AddReport;
  