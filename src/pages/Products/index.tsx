import ExportImport from '@/components/common/ExportImport'
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
    { title: 'Image', dataKey: 'image' },
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

  const dataFormat = dataProduct.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    oldprice: product.oldprice,
    category: product.category,
    image: product.image,
    stock: product.stock,
    actions: product
  }))

  return (
    <>
      <h2 className="text-2xl font-semibold mt-6">Product</h2>
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
          <select className="items-center h-12 px-2 my-2 bg-gray-100 border rounded-md w-full">
            <option value="">Select Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
          </select>
        </div>
        <div>
          <select className="items-center h-12 px-4 my-2 bg-gray-100 border rounded-md w-full">
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
      <div className="overflow-x-auto mt-6">
        <Table columns={columns} data={dataFormat as any} />
      </div>
    </>
  )
}

export default Product
