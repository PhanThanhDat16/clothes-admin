import { getOrderAll } from '@/apis/orderService'
import Heading from '@/components/common/Heading'
import Table from '@/components/common/Table'
import { ORDERS_PAGE } from '@/constants'
import { IOrder } from '@/models/order'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router'

const listStatusOrder = [
  {
    value: 'pending',
    text: 'Pending'
  },
  {
    value: 'cancelled',
    text: 'Cancelled'
  },
  {
    value: 'paid',
    text: 'Paid'
  }
]
const LIMIT_PAGE = 20

const Order = () => {
  const columns = [
    { title: 'Id', dataKey: 'id' },
    { title: 'Created At', dataKey: 'createdAt' },
    {
      title: 'Quantity Product',
      dataKey: 'orderItems',
      render: (lenght: number) => <p className="text-center">{lenght}</p>
    },
    { title: 'FullName', dataKey: 'fullName' },
    { title: 'Email', dataKey: 'email' },
    { title: 'Total', dataKey: 'totalPrice' },
    { title: 'FinalTotal', dataKey: 'finalTotal' },
    {
      title: 'Status',
      dataKey: 'status',
      render: (status: string) => {
        let color = ''
        let bg = ''

        switch (status) {
          case 'pending':
            color = 'text-yellow-700'
            bg = 'bg-yellow-100'
            break
          case 'cancelled':
            color = 'text-red-700'
            bg = 'bg-red-100'
            break
          case 'paid':
            color = 'text-green-700'
            bg = 'bg-green-100'
            break
          default:
            color = 'text-gray-700'
            bg = 'bg-gray-100'
        }
        return <span className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${color}`}>{status}</span>
      }
    },
    {
      title: 'Actions',
      dataKey: 'actions',
      render: (order: IOrder) => (
        <div className="flex items-center gap-2 text-sm font-normal">
          <span>
            <i className="bx  bx-printer text-[var(--Aluminium)] text-base"></i>
          </span>
          <NavLink to={`${ORDERS_PAGE}/${order._id}`}>
            <i className="bx  bx-search-alt text-[var(--Aluminium)] text-base"></i>
          </NavLink>
        </div>
      )
    }
  ]

  const [orders, setOrders] = useState<IOrder[] | []>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetAllOrder = async (params?: {
    search?: string
    page?: number
    limit?: number
    categoryId?: string
  }) => {
    try {
      setIsLoading(true)
      const res = await getOrderAll(params)
      setOrders(res.data.data)
      setTotalPages(res.data.totalPages)
      setTotal(res.data.total)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchOrderOrder = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      handleGetAllOrder()
    } else {
      const param = {
        search: e.target.value,
        status: selectedStatus,
        page: 1,
        limit: 20
      }
      handleGetAllOrder(param)
    }
  }, 500)

  useEffect(() => {
    const param = {
      search: '',
      status: selectedStatus,
      page: 1,
      limit: 20
    }
    handleGetAllOrder(param)
  }, [selectedStatus])

  useEffect(() => {
    handleGetAllOrder()
  }, [])

  const dataFormat = orders.map((order) => ({
    id: order._id,
    createdAt: new Date(order.createdAt).toDateString(),
    orderItems: order.orderItems.length,
    fullName: order.fullName,
    email: order.email,
    totalPrice: order.totalPrice,
    finalTotal: order.finalTotal,
    status: order.status,
    actions: order
  }))

  return (
    <div className="h-full">
      <Heading text="Orders" />

      <div className="p-4 mt-4 bg-white rounded-md">
        <div className="grid gap-4 md:grid-cols-4 py-2">
          <div>
            <input
              className="block w-full h-12 px-3 py-1 text-sm border rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 focus:outline-none"
              onChange={(e) => handleSearchOrderOrder(e)}
              type="search"
              name="search"
              placeholder="Search by Customer Name"
            />
          </div>
          <div>
            <select
              className="block w-full h-12 px-2 py-1 text-sm border rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 focus:outline-none"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Status</option>
              {listStatusOrder.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-sm text-gray-600">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm mt-6">
          <div className="p-6 bg-emerald-50 rounded-full mb-4">
            <i className="bx bx-receipt text-5xl text-emerald-500"></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-800">No Orders Found</h3>
          <p className="text-sm text-slate-500 mt-2 mb-6 text-center max-w-sm">
            There are no orders yet. Orders will appear here once customers start purchasing products.
          </p>
        </div>
      ) : (
        <div className="mt-4 overflow-hidden bg-white rounded-lg">
          <div className="w-full overflow-hidden overflow-x-scroll">
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
                      const newPage = selectedItem.selected + 1
                      setPage(newPage)
                      handleGetAllOrder({ page: newPage, limit: LIMIT_PAGE })
                    }}
                    pageRangeDisplayed={3}
                    pageCount={totalPages}
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
        </div>
      )}
    </div>
  )
}

export default Order
