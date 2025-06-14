import ExportImport from '@/components/common/ExportImport'
import Heading from '@/components/common/Heading'
import Table from '@/components/common/Table'

const dataProduct = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 100,
    oldprice: 120,
    category: 'Category 1',
    image: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
    stock: 10
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for Product 2',
    price: 200,
    oldprice: 220,
    category: 'Category 2',
    image: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
    stock: 20
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for Product 3',
    price: 300,
    oldprice: 320,
    category: 'Category 3',
    image: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
    stock: 30
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Description for Product 4',
    price: 400,
    oldprice: 420,
    category: 'Category 4',
    image: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
    stock: 40
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'Description for Product 5',
    price: 500,
    oldprice: 520,
    category: 'Category 5',
    image: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
    stock: 50
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'Description for Product 6',
    price: 600,
    oldprice: 620,
    category: 'Category 6',
    image: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
    stock: 60
  }
]

const Product = () => {
  const columns = [
    { title: 'Id', dataKey: 'id' },
    { title: 'Name', dataKey: 'name' },
    { title: 'Description', dataKey: 'description' },
    { title: 'Price', dataKey: 'price' },
    { title: 'Old Price', dataKey: 'oldprice' },
    { title: 'Category', dataKey: 'category' },
    {
      title: 'Actions',
      dataKey: 'actions',
      render: () => (
        <div className="flex items-center gap-2 text-sm font-normal">
          <span>
            <i className="bx bx-trash text-[var(--Aluminium)] text-base"></i>
          </span>
          <span>
            <i className="bx bx-edit text-[var(--Aluminium)] text-base"></i>
          </span>
        </div>
      )
    }
  ]

  const dataFormat = dataProduct.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    oldprice: product.oldprice,
    category: product.category,
    stock: product.stock,
    actions: product
  }))

  return (
    <>
      <Heading text="Product" />
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
      <div className="grid w-full grid-cols-4 gap-6 p-4 mt-6 text-sm bg-white rounded-md">
        <input
          type="text"
          placeholder="Search by Category name"
          className="items-center h-12 px-4 my-2 bg-gray-100 border rounded-md"
        />
        <div className="">
          <select className="items-center w-full h-12 px-2 my-2 bg-gray-100 border rounded-md">
            <option value="">Select Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
          </select>
        </div>
        <div>
          <select className="items-center w-full h-12 px-4 my-2 bg-gray-100 border rounded-md">
            <option value="">Select Orderby</option>
            <option value="1">Orderby 1</option>
            <option value="2">Orderby 2</option>
          </select>
        </div>
        <div className="flex w-full gap-2 my-2">
          <button className="flex items-center justify-center flex-1 text-white border rounded-md bg-emerald-500">
            Fillter
          </button>
          <button className="flex items-center justify-center flex-1 bg-gray-200 border rounded-md ">Reset</button>
        </div>
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden bg-white rounded-lg">
        <div className="w-full overflow-hidden overflow-x-scroll">
          <Table columns={columns} data={dataFormat as any} />
        </div>
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

export default Product
