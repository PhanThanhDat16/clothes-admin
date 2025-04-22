import ExportImport from '@/components/common/ExportImport'

const dataCategory = [
  {
    id: 1,
    name: 'Category 1',
    description: 'Description for Category 1'
  },
  {
    id: 2,
    name: 'Category 2',
    description: 'Description for Category 2'
  },
  {
    id: 3,
    name: 'Category 3',
    description: 'Description for Category 3'
  },
  {
    id: 4,
    name: 'Category 4',
    description: 'Description for Category 4'
  },
  {
    id: 5,
    name: 'Category 5',
    description: 'Description for Category 5'
  },
  {
    id: 6,
    name: 'Category 6',
    description: 'Description for Category 6'
  }
]

const Category = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Category</h1>
      {/* export */}
      <div className="grid grid-cols-2 gap-4 p-4 w-full bg-white text-sm rounded-md mt-6">
        <ExportImport />
        <div className="flex w-full py-4 gap-2">
          <button className="flex-1 bg-gray-200 text-gray-500 border rounded-md flex items-center justify-center">
            <i className="bx bx-edit pr-1"></i>
            <span>Bulk Action</span>
          </button>
          <button className="flex-1 bg-red-400 text-white border rounded-md flex items-center justify-center">
            <i className="bx bx-trash pr-1"></i>
            <span>Delete</span>
          </button>
          <button className="flex-1 bg-emerald-500 text-white border rounded-md flex items-center justify-center">
            <i className="bx bx-plus pr-1"></i>
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* fillter */}
      <div className="grid grid-cols-2 gap-4 p-4 w-full bg-white text-sm rounded-md mt-6">
        <input
          type="text"
          placeholder="Search by Category name"
          className="items-center border rounded-md bg-gray-100 h-12 px-4 m-2"
        />
        <div className="flex w-full gap-2 my-2">
          <button className="flex-1 bg-emerald-500 text-white border rounded-md flex justify-center items-center">
            Fillter
          </button>
          <button className="flex-1 bg-gray-200 border rounded-md flex justify-center items-center ">Reset</button>
        </div>
      </div>

      {/* table */}
      <div className="border border-gray-300 bg-gray-200 rounded-md mt-6 text-sm font-semibold overflow-hidden">
        <table className="w-full ">
          <thead>
            <tr className="">
              <td className="py-2.5 px-5">ID</td>
              <td className="py-2.5 px-5">NAME</td>
              <td className="py-2.5 px-5">DESCRIPTION</td>
              <td className="py-2.5 px-5 text-end">ACTION</td>
            </tr>
          </thead>
          <tbody>
            {dataCategory.map((category) => (
              <tr key={category.id} className="bg-white border">
                <td className="py-2.5 px-5">{category.id}</td>
                <td className="py-2.5 px-5">{category.name}</td>
                <td className="py-2.5 px-5">{category.description}</td>
                <td className="py-2.5 px-5 text-end">
                  <div className="items-center">
                    <button className="text-xl text-gray-500 hover:text-green-500">
                      <i className="bx bx-edit pr-1"></i>
                    </button>
                    <button className="text-xl text-gray-500 hover:text-red-500">
                      <i className="bx bx-trash pr-1"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center bg-white text-sm w-full">
          <div className="p-5 ">Showing 1-12 of 12</div>
          <div className="p-5 flex items-center justify-center">
            <button>
              <i className="bx bx-chevron-left p-1"></i>
            </button>
            <span className="px-2.5 border rounded-md bg-green-500 text-white">1</span>
            <button>
              <i className="bx bx-chevron-right p-1"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Category
