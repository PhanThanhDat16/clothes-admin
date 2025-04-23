const ExportImport = () => {
  return (
    <div className="flex justify-start py-4 ">
      <button className="flex p-2.5 hover:text-green-600 hover:border-green-600 rounded-md border border-black">
        <i className="bx bx-import pr-1"></i>
        Export
      </button>
      <button className="flex p-2.5 mx-2 hover:text-yellow-400 hover:border-yellow-400 rounded-md border border-black">
        <i className="bx bx-export pr-1"></i>
        Import
      </button>
    </div>
  )
}

export default ExportImport
