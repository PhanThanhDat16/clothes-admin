import { getOrderAll } from '@/apis/orderService'
import Heading from '@/components/common/Heading'
import Table from '@/components/common/Table'
import { ORDERS_PAGE } from '@/constants'
import { IOrder } from '@/models/order'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

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
          case 'processing':
            color = 'text-blue-700'
            bg = 'bg-blue-100'
            break
          case 'completed':
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

  const handleGetAllOrder = async () => {
    try {
      const res = await getOrderAll()
      console.log(res)
      setOrders(res.data)
    } catch (error) {
      console.log(error)
    }
  }

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
        <div className="grid gap-4 md:grid-cols-5 py-2">
          <div>
            <input
              className="block w-full h-12 px-3 py-1 text-sm border rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 focus:outline-none"
              type="search"
              name="search"
              placeholder="Search by Customer Name"
            />
          </div>
          <div>
            <select className="block w-full h-12 px-2 py-1 text-sm border rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 focus:outline-none">
              <option value="Status">Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 py-2">
          <div>
            <label className="block text-sm text-gray-800">Start Date</label>
            <input
              className="block w-full h-12 px-3 py-1 text-sm border rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 focus:outline-none"
              type="date"
              name="startDate"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800">End Date</label>
            <input
              className="block w-full h-12 px-3 py-1 text-sm border rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 focus:outline-none"
              type="date"
              name="startDate"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="block text-sm text-gray-800" style={{ visibility: 'hidden' }}>
                Filter
              </label>
              <button
                className="w-full h-12 px-4 text-sm text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 focus:outline-none"
                type="submit"
              >
                Filter
              </button>
            </div>
            <div className="w-full">
              <label className="block text-sm text-gray-800" style={{ visibility: 'hidden' }}>
                Reset
              </label>
              <button
                className="w-full h-12 px-4 text-sm text-gray-600 bg-gray-200 rounded-lg focus:outline-none"
                type="reset"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
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
      )}
    </div>
  )
}

export default Order
