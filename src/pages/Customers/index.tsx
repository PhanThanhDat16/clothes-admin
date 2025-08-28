// Components
import { deleteUser, getAllUser } from '@/apis/userService'
import ExportImport from '@/components/common/ExportImport'
import Heading from '@/components/common/Heading'
import Table from '@/components/common/Table'
import { CUSTOMERS_PAGE } from '@/constants'
import { IUser } from '@/models/user'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router'
import Swal from 'sweetalert2'

// const mockData: any[] = [
//   {
//     id: 1,
//     userName: 'JohnDoe',
//     email: 'john.doe@example.com',
//     fullName: 'John Doe',
//     phone: '1234567890',
//     totalBill: 200
//   },
//   {
//     id: 2,
//     userName: 'JaneSmith',
//     email: 'jane.smith@example.com',
//     fullName: 'Jane Smith',
//     phone: '0987654321',
//     totalBill: 150
//   },
//   {
//     id: 3,
//     userName: 'MikeBrown',
//     email: 'mike.brown@example.com',
//     fullName: 'Mike Brown',
//     phone: '1122334455',
//     totalBill: 300
//   },
//   {
//     id: 4,
//     userName: 'EmilyWhite',
//     email: 'emily.white@example.com',
//     fullName: 'Emily White',
//     phone: '2233445566',
//     totalBill: 250
//   },
//   {
//     id: 5,
//     userName: 'ChrisGreen',
//     email: 'chris.green@example.com',
//     fullName: 'Chris Green',
//     phone: '3344556677',
//     totalBill: 180
//   },
//   {
//     id: 6,
//     userName: 'SarahBlack',
//     email: 'sarah.black@example.com',
//     fullName: 'Sarah Black',
//     phone: '4455667788',
//     totalBill: 220
//   },
//   {
//     id: 7,
//     userName: 'DavidBlue',
//     email: 'david.blue@example.com',
//     fullName: 'David Blue',
//     phone: '5566778899',
//     totalBill: 270
//   },
//   {
//     id: 8,
//     userName: 'LauraGray',
//     email: 'laura.gray@example.com',
//     fullName: 'Laura Gray',
//     phone: '6677889900',
//     totalBill: 190
//   },
//   {
//     id: 9,
//     userName: 'TomYellow',
//     email: 'tom.yellow@example.com',
//     fullName: 'Tom Yellow',
//     phone: '7788990011',
//     totalBill: 210
//   },
//   {
//     id: 10,
//     userName: 'AnnaPurple',
//     email: 'anna.purple@example.com',
//     fullName: 'Anna Purple',
//     phone: '8899001122',
//     totalBill: 230
//   },
//   {
//     id: 11,
//     userName: 'MarkRed',
//     email: 'mark.red@example.com',
//     fullName: 'Mark Red',
//     phone: '9900112233',
//     totalBill: 240
//   },
//   {
//     id: 12,
//     userName: 'SophiaPink',
//     email: 'sophia.pink@example.com',
//     fullName: 'Sophia Pink',
//     phone: '1011121314',
//     totalBill: 260
//   },
//   {
//     id: 13,
//     userName: 'OliverBrown',
//     email: 'oliver.brown@example.com',
//     fullName: 'Oliver Brown',
//     phone: '1213141516',
//     totalBill: 280
//   },
//   {
//     id: 14,
//     userName: 'EmmaGreen',
//     email: 'emma.green@example.com',
//     fullName: 'Emma Green',
//     phone: '1314151617',
//     totalBill: 300
//   },
//   {
//     id: 15,
//     userName: 'LiamGray',
//     email: 'liam.gray@example.com',
//     fullName: 'Liam Gray',
//     phone: '1415161718',
//     totalBill: 320
//   },
//   {
//     id: 16,
//     userName: 'AvaBlue',
//     email: 'ava.blue@example.com',
//     fullName: 'Ava Blue',
//     phone: '1516171819',
//     totalBill: 340
//   },
//   {
//     id: 17,
//     userName: 'NoahWhite',
//     email: 'noah.white@example.com',
//     fullName: 'Noah White',
//     phone: '1617181920',
//     totalBill: 360
//   },
//   {
//     id: 18,
//     userName: 'IsabellaBlack',
//     email: 'isabella.black@example.com',
//     fullName: 'Isabella Black',
//     phone: '1718192021',
//     totalBill: 380
//   },
//   {
//     id: 19,
//     userName: 'MasonYellow',
//     email: 'mason.yellow@example.com',
//     fullName: 'Mason Yellow',
//     phone: '1819202122',
//     totalBill: 400
//   },
//   {
//     id: 20,
//     userName: 'SophiaPurple',
//     email: 'sophia.purple@example.com',
//     fullName: 'Sophia Purple',
//     phone: '1920212223',
//     totalBill: 420
//   }
// ]

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

  const handleGetAll = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const res = await getAllUser(params)
      if (!res || !res.data) return
      setUsers(res.data.data)
      setTotalPages(res.data.totalPages)
      setTotal(res.data.total)
      setPage(res.data.page)
    } catch (error) {
      console.log(error)
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

      <div className="p-4 bg-white rounded-md">
        <div className="gap-4 py-3 lg:gap-6 xl:gap-6 md:flex xl:flex">
          <ExportImport />
        </div>
      </div>

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

      {/* Table */}
      {users && users.length === 0 ? (
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
