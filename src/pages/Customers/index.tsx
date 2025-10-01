import { deleteUser, getAllUser } from '@/apis/userService'
import Heading from '@/components/common/Heading'
import Table from '@/components/common/Table'
import { CUSTOMERS_PAGE } from '@/constants'
import { IUser } from '@/models/user'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router'
import Swal from 'sweetalert2'

const LIMIT_PAGE = 10
const Customer = () => {
  const columns = [
    { title: 'Id', dataKey: 'id' },
    { title: 'Email', dataKey: 'email' },
    { title: 'FullName', dataKey: 'fullName' },
    { title: 'Type', dataKey: 'type' },
    { title: 'Phone', dataKey: 'phone' },
    { title: 'TotalBill', dataKey: 'totalBill' },
    {
      title: 'Actions',
      dataKey: 'actions',
      render: (user: IUser) => (
        <div className="flex items-center gap-2 text-sm font-normal">
          <span onClick={() => handleDeleteUser(user)}>
            <i className="bx bx-trash text-[var(--Aluminium)] text-base"></i>
          </span>
          <NavLink to={`${CUSTOMERS_PAGE}/${user._id}`} className="cursor-pointer">
            <i className="bx bx-edit text-[var(--Aluminium)] text-base"></i>
          </NavLink>
        </div>
      )
    }
  ]
  const [users, setUsers] = useState<IUser[] | []>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetAll = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      setIsLoading(true)
      const res = await getAllUser(params)
      if (!res || !res.data) return
      setUsers(res.data.data)
      setTotalPages(res.data.totalPages)
      setTotal(res.data.total)
      setPage(res.data.page)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = (item: IUser) => {
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
          await deleteUser(item._id as string)
          Swal.fire({
            title: 'Deleted!',
            text: 'The user has been deleted.',
            icon: 'success'
          })
          handleGetAll()
        } catch (error) {
          console.error('User', error)
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
    handleGetAll()
  }, [])

  const dataFormat = users.map((user) => ({
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    type: user.type,
    totalBill: user.totalBill,
    actions: user
  }))

  return (
    <div className="h-full">
      <Heading text="Customer" />
      <div className="p-4 mt-4 bg-white h-[104px] rounded-md">
        <div className="flex items-center h-full gap-6 py-3 ">
          <input
            type="text"
            placeholder="Search by full name"
            onChange={(e) => handleSearchUser(e)}
            className="flex-1 px-3 h-full py-1 border text-sm placeholder:text-sm focus:bg-white rounded-md bg-[var(--Athens-Gray2)]"
          />
        </div>
      </div>

      {/* table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-sm text-gray-600">Loading customers...</p>
        </div>
      ) : users && users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm mt-6">
          <div className="p-6 bg-emerald-50 rounded-full mb-4">
            <i className="bx bx-user text-5xl text-emerald-500"></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No Customers Found</h3>
          <p className="text-sm text-slate-500 mt-2 mb-6 text-center max-w-sm">
            You haven’t added any customers yet. Start by importing a list or adding a new customer.
          </p>
        </div>
      ) : (
        <div className="mt-4 overflow-hidden bg-white rounded-lg">
          <div className="w-full overflow-hidden overflow-x-scroll">
            <Table columns={columns} data={dataFormat as any} />
          </div>
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
      )}
    </div>
  )
}

export default Customer
