import { getAllCategoryAll } from '@/apis/categories'
import { deleteProduct, getAllProduct } from '@/apis/productService'
// import ExportImport from '@/components/common/ExportImport'
import Heading from '@/components/common/Heading'
import SidebarAdd from '@/components/common/SidebarAdd'
import Table from '@/components/common/Table'
import { PRODUCTS_PAGE } from '@/constants'
import { ICategory } from '@/models/categories'
import { IProduct, IProductDefault } from '@/models/product'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router'
import Swal from 'sweetalert2'

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
      render: (product: IProduct) => (
        <div className="flex items-center gap-2 text-sm font-normal">
          <span className="cursor-pointer" onClick={() => handleDeleteProduct(product)}>
            <i className="bx bx-trash text-[var(--Aluminium)] text-base"></i>
          </span>
          <NavLink to={`${PRODUCTS_PAGE}/${product._id}`} className="cursor-pointer">
            <i className="bx bx-edit text-[var(--Aluminium)] text-base"></i>
          </NavLink>
        </div>
      )
    }
  ]
  const [products, setProducts] = useState<IProductDefault[] | []>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(1)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGetAll = async (params?: { search?: string; page?: number; limit?: number; categoryId?: string }) => {
    try {
      setIsLoading(true)
      const res = await getAllProduct(params)
      if (!res || !res.data) return
      setProducts(res.data.data)
      setTotalPages(res.data.totalPages)
      setTotal(res.data.total)
      setPage(res.data.page)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetAllCategory = async () => {
    try {
      const res = await getAllCategoryAll()
      setCategories(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteProduct = async (product: IProduct) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!product) throw new Error('Cant do it')
          // Handle Delete
          await deleteProduct(product._id as string)
          Swal.fire({
            title: 'Deleted!',
            text: 'The product has been deleted.',
            icon: 'success'
          })
          handleGetAll()
        } catch (error) {
          console.error('product', error)
        }
      }
    })
  }

  const handleSearchUser = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      handleGetAll()
    } else {
      const param = {
        search: e.target.value,
        page: 1,
        limit: 10
      }
      handleGetAll(param)
    }
  }, 500)

  useEffect(() => {
    const param = {
      search: '',
      page: 1,
      limit: 10,
      categoryId: selectedCategory.trim() !== '' ? selectedCategory : ''
    }
    handleGetAll(param)
  }, [selectedCategory])

  useEffect(() => {
    ;(async () => {
      await Promise.all([handleGetAll(), handleGetAllCategory()])
    })()
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

      {/* fillter */}
      <div className=" w-full flex items-center justify-between gap-6 p-4 mt-6 text-sm bg-white rounded-md">
        <div className="grid grid-cols-2 gap-6 flex-1">
          <input
            type="text"
            placeholder="Search by name"
            onChange={(e) => handleSearchUser(e)}
            className="items-center h-12 px-4 my-2 bg-gray-100 border rounded-md"
          />
          <div className="">
            <select
              className="items-center w-full h-12 px-2 my-2 bg-gray-100 border rounded-md"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <SidebarAdd nameAction="Add Product" type="product" handleGetAll={handleGetAll} />
      </div>

      {/* table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-sm text-gray-600">Loading products...</p>
        </div>
      ) : products && products.length === 0 ? (
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
