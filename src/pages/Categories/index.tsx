import ExportImport from '@/components/common/ExportImport'
import Table from '@/components/common/Table'

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
  const columns = [
    { title: 'Id', dataKey: 'id' },
    { title: 'Name', dataKey: 'name' },
    { title: 'Description', dataKey: 'description' },
    {
      title: 'Actions',
      dataKey: 'actions',
      render: () => (
        <td className="flex items-center gap-2 text-sm font-normal">
          <span>
            <i className="bx bx-trash text-[var(--Aluminium)] text-base"></i>
          </span>
          <span>
            <i className="bx bx-edit text-[var(--Aluminium)] text-base"></i>
          </span>
        </td>
      )
    }
  ]

  const dataFormat = dataCategory.map((cate) => ({
    id: cate.id,
    name: cate.name,
    description: cate.description,
    actions: cate
  }))

  return (
    <>
      <h1 className="text-2xl font-semibold">Category</h1>
      {/* export */}
      <div className="grid w-full grid-cols-2 gap-4 p-4 mt-6 text-sm bg-white rounded-md">
        <ExportImport />
        <div className="flex w-full gap-2 py-4">
          <button className="flex items-center justify-center flex-1 text-gray-500 bg-gray-200 border rounded-md">
            <i className="pr-1 bx bx-edit"></i>
            <span>Bulk Action</span>
          </button>
          <button className="flex items-center justify-center flex-1 text-white bg-red-400 border rounded-md">
            <i className="pr-1 bx bx-trash"></i>
            <span>Delete</span>
          </button>
          <button className="flex items-center justify-center flex-1 text-white border rounded-md bg-emerald-500">
            <i className="pr-1 bx bx-plus"></i>
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* fillter */}
      <div className="grid w-full grid-cols-2 gap-4 p-4 mt-6 text-sm bg-white rounded-md">
        <input
          type="text"
          placeholder="Search by Category name"
          className="items-center h-12 px-4 m-2 bg-gray-100 border rounded-md"
        />
        <div className="flex w-full gap-2 my-2">
          <button className="flex items-center justify-center flex-1 text-white border rounded-md bg-emerald-500">
            Fillter
          </button>
          <button className="flex items-center justify-center flex-1 bg-gray-200 border rounded-md ">Reset</button>
        </div>
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden bg-white rounded-lg">
        <Table columns={columns} data={dataFormat as any} />

        <div className="flex flex-col justify-between p-4 text-xs text-gray-600 sm:flex-row dark:text-gray-400">
          <span className="flex items-center font-semibold tracking-wide uppercase">Showing 1-12 of 12</span>
          <div className="flex mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button
                    className="inline-flex items-center justify-center p-2 font-medium leading-5 text-gray-600 align-bottom transition-colors duration-150 border border-transparent rounded-md opacity-50 cursor-pointer focus:outline-none dark:text-gray-400"
                    type="button"
                    aria-label="Previous"
                  >
                    <svg className="w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium leading-5 text-white align-bottom transition-colors duration-150 border border-transparent rounded-md cursor-pointer focus:outline-none bg-emerald-500 active:bg-emerald-600 hover:bg-emerald-600"
                    type="button"
                  >
                    1
                  </button>
                </li>
                <li>
                  <button
                    className="inline-flex items-center justify-center p-2 font-medium leading-5 text-gray-600 align-bottom transition-colors duration-150 border border-transparent rounded-md opacity-50 cursor-pointer cursor-not-allowed focus:outline-none dark:text-gray-400"
                    type="button"
                    aria-label="Next"
                  >
                    <svg className="w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Category
