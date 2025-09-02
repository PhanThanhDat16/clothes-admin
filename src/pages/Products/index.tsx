import { getAllProduct } from '@/apis/productService'
import ExportImport from '@/components/common/ExportImport'
import Heading from '@/components/common/Heading'
import SidebarAdd from '@/components/common/SidebarAdd'
import Table from '@/components/common/Table'
import { IProductDefault } from '@/models/product'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

const LIMIT_PAGE = 20
const Product = () => {
  const columns = [
    { title: 'Id', dataKey: 'id' },
    { title: 'Name', dataKey: 'name' },
    { title: 'Description', dataKey: 'description' },
    { title: 'Price', dataKey: 'price' },
    { title: 'Old Price', dataKey: 'oldPrice' },
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
  const [products, setProducts] = useState<IProductDefault[] | []>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(1)
  const handleGetAll = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const res = await getAllProduct(params)
      if (!res || !res.data) return
      setProducts(res.data.data)
      setTotalPages(res.data.totalPages)
      setTotal(res.data.total)
      setPage(res.data.page)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetAll()
  }, [])

  const dataFormat = products.map((product) => ({
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    oldPrice: product.oldPrice,
    category: product.categoryId.name,
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
          <SidebarAdd nameAction="Add Product" type="product" handleGetAll={handleGetAll} />
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
      {products && products.length > 0 && products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm mt-6">
          <div className="p-6 bg-emerald-50 rounded-full mb-4">
            <i className="bx bx-package text-5xl text-emerald-500"></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No Products Found</h3>
          <p className="text-sm text-slate-500 mt-2 mb-6 text-center max-w-sm">
            You haven’t added any products yet. Start by adding your first product to showcase it here.
          </p>
          <SidebarAdd nameAction="Add Product" type="product" handleGetAll={handleGetAll} />
        </div>
      ) : (
        <>
          <div className="mt-6 overflow-hidden bg-white rounded-lg">
            <Table columns={columns} data={dataFormat as any} />
            <div className="flex flex-col justify-between p-4 text-xs text-gray-600 sm:flex-row dark:text-gray-400">
              <span className="flex items-center font-semibold tracking-wide uppercase">
                Showing {(page - 1) * LIMIT_PAGE + 1}-{Math.min(page * LIMIT_PAGE, total)} of {totalPages}
              </span>
              <div className="flex mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<i className="bx bx-chevron-right text-lg"></i>}
                    previousLabel={<i className="bx bx-chevron-left text-lg"></i>}
                    onPageChange={(selectedItem) => {
                      handleGetAll({ page: selectedItem.selected + 1, limit: LIMIT_PAGE })
                    }}
                    pageRangeDisplayed={3}
                    pageCount={totalPages}
                    forcePage={page - 1}
                    containerClassName="flex items-center justify-center gap-1 mt-6"
                    pageClassName="min-w-[36px] h-9 flex items-center justify-center rounded-md border border-gray-200 text-sm font-medium text-gray-600 hover:bg-emerald-100 hover:text-emerald-700 transition"
                    activeClassName="bg-emerald-500 text-white border-emerald-500 shadow-sm hover:bg-emerald-600"
                    previousClassName="min-w-[36px] h-9 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700 transition"
                    nextClassName="min-w-[36px] h-9 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700 transition"
                    breakClassName="px-2 text-gray-400 select-none"
                  />
                </nav>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Product
