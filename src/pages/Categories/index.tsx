import { deleteCategory, getAllCategory } from '@/apis/categories'
import ExportImport from '@/components/common/ExportImport'
import Heading from '@/components/common/Heading'
import SidebarAdd from '@/components/common/SidebarAdd'
import Table from '@/components/common/Table'
import { ICategory } from '@/models/categories'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router'
import { CATEGORIES_PAGE } from '@/constants'

// const dataCategory = [
//   {
//     id: 1,
//     name: 'Category 1',
//     description: 'Description for Category 1'
//   },
//   {
//     id: 2,
//     name: 'Category 2',
//     description: 'Description for Category 2'
//   },
//   {
//     id: 3,
//     name: 'Category 3',
//     description: 'Description for Category 3'
//   },
//   {
//     id: 4,
//     name: 'Category 4',
//     description: 'Description for Category 4'
//   },
//   {
//     id: 5,
//     name: 'Category 5',
//     description: 'Description for Category 5'
//   },
//   {
//     id: 6,
//     name: 'Category 6',
//     description: 'Description for Category 6'
//   }
// ]

interface IColorStatus {
  name: string
  background: string
  color: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const COLORSTATUS: IColorStatus[] = [
  {
    name: 'active',
    background: 'bg-green-100',
    color: 'text-green-700'
  },
  {
    name: 'inactive',
    background: 'bg-red-100',
    color: 'text-red-700'
  }
]

const LIMIT_PAGE = 10
const Category = () => {
  const columns = [
    { title: 'Id', dataKey: 'id' },
    { title: 'Name', dataKey: 'name' },
    { title: 'Description', dataKey: 'description' },
    {
      title: 'Status',
      dataKey: 'status',
      render: (status: string) => {
        const style = COLORSTATUS.find((c) => c.name === status)
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${style?.background} ${style?.color}`}>
            {status}
          </span>
        )
      }
    },
    {
      title: 'Actions',
      dataKey: 'actions',
      render: (item: ICategory) => (
        <div className="flex items-center gap-2 text-sm font-normal">
          <span className="cursor-pointer" onClick={() => handleDeleteCategory(item)}>
            <i className="bx bx-trash text-[var(--Aluminium)] text-base"></i>
          </span>
          <NavLink to={`${CATEGORIES_PAGE}/${item._id}`} className="cursor-pointer">
            <i className="bx bx-edit text-[var(--Aluminium)] text-base"></i>
          </NavLink>
        </div>
      )
    }
  ]
  const [categories, setCategories] = useState<ICategory[] | []>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(1)

  const handleGetAll = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const res = await getAllCategory(params)
      if (!res || !res.data) return
      setCategories(res.data.data)
      setTotalPages(res.data.totalPages)
      setTotal(res.data.total)
      setPage(res.data.page)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCategory = (item: ICategory) => {
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
          if (!item) throw new Error('Cant do it')
          // Handle Delete
          await deleteCategory(item._id as string)
          Swal.fire({
            title: 'Deleted!',
            text: 'The Category has been deleted.',
            icon: 'success'
          })
          handleGetAll()
        } catch (error) {
          console.error('Category', error)
        }
      }
    })
  }

  const handleSearchCate = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
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
    handleGetAll()
  }, [])

  const dataFormat = categories.map((cate) => ({
    id: cate._id,
    name: cate.name,
    description: cate.description,
    status: cate.status,
    actions: cate
  }))

  return (
    <>
      <Heading text="Category" />

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
          <SidebarAdd nameAction="Add Category" type="category" handleGetAll={handleGetAll} />
        </div>
      </div>

      {/* fillter */}
      <div className="w-full p-4 mt-6 bg-white rounded-md">
        <div className="relative">
          <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
          <input
            type="text"
            placeholder="Search by Category name"
            className="w-full h-12 pl-10 pr-4 text-sm bg-gray-100 border rounded-lg"
            onChange={(e) => handleSearchCate(e)}
          />
        </div>
      </div>

      {/* table */}
      {categories && categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm mt-6">
          <div className="p-6 bg-emerald-50 rounded-full mb-4">
            <i className="bx bx-folder-open text-5xl text-emerald-500"></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No Categories Found</h3>
          <p className="text-sm text-slate-500 mt-2 mb-6 text-center max-w-sm">
            You haven’t created any categories yet. Start by adding your first category so you can organize your
            products.
          </p>
          <SidebarAdd nameAction="Add Category" type="category" handleGetAll={handleGetAll} />
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

export default Category
