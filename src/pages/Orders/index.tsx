import Heading from '@/components/common/Heading'
import Table from '@/components/common/Table'

const mockData = [
  {
    id: 1,
    orderTime: '2025-01-01 10:00:00',
    orderNumber: '1234567890',
    customerName: 'John Doe',
    email: 'john.doe@example.com',
    customerPhone: '1234567890',
    total: 200,
    status: 'Pending'
  },
  {
    id: 2,
    orderTime: '2025-01-02 11:00:00',
    orderNumber: '1234567891',
    customerName: 'Jane Smith',
    email: 'jane.smith@example.com',
    customerPhone: '0987654321',
    total: 150,
    status: 'Processing'
  },
  {
    id: 3,
    orderTime: '2025-01-03 12:00:00',
    orderNumber: '1234567892',
    customerName: 'Mike Brown',
    email: 'mike.brown@example.com',
    customerPhone: '1122334455',
    total: 300,
    status: 'Completed'
  },
  {
    id: 4,
    orderTime: '2025-01-04 13:00:00',
    orderNumber: '1234567893',
    customerName: 'Emily White',
    email: 'emily.white@example.com',
    customerPhone: '2233445566',
    total: 250,
    status: 'Pending'
  },
  {
    id: 5,
    orderTime: '2025-01-05 14:00:00',
    orderNumber: '1234567894',
    customerName: 'Chris Green',
    email: 'chris.green@example.com',
    customerPhone: '3344556677',
    total: 180,
    status: 'Processing'
  },
  {
    id: 6,
    orderTime: '2025-01-06 15:00:00',
    orderNumber: '1234567895',
    customerName: 'Sarah Black',
    email: 'sarah.black@example.com',
    customerPhone: '4455667788',
    total: 220,
    status: 'Completed'
  },
  {
    id: 7,
    orderTime: '2025-01-07 16:00:00',
    orderNumber: '1234567896',
    customerName: 'David Blue',
    email: 'david.blue@example.com',
    customerPhone: '5566778899',
    total: 270,
    status: 'Pending'
  },
  {
    id: 8,
    orderTime: '2025-01-08 17:00:00',
    orderNumber: '1234567897',
    customerName: 'Laura Gray',
    email: 'laura.gray@example.com',
    customerPhone: '6677889900',
    total: 190,
    status: 'Processing'
  },
  {
    id: 9,
    orderTime: '2025-01-09 18:00:00',
    orderNumber: '1234567898',
    customerName: 'Tom Yellow',
    email: 'tom.yellow@example.com',
    customerPhone: '7788990011',
    total: 210,
    status: 'Completed'
  },
  {
    id: 10,
    orderTime: '2025-01-10 19:00:00',
    orderNumber: '1234567899',
    customerName: 'Anna Purple',
    email: 'anna.purple@example.com',
    customerPhone: '8899001122',
    total: 230,
    status: 'Pending'
  },
  {
    id: 11,
    orderTime: '2025-01-11 20:00:00',
    orderNumber: '1234567900',
    customerName: 'Mark Red',
    email: 'mark.red@example.com',
    customerPhone: '9900112233',
    total: 240,
    status: 'Processing'
  },
  {
    id: 12,
    orderTime: '2025-01-12 21:00:00',
    orderNumber: '1234567901',
    customerName: 'Sophia Pink',
    email: 'sophia.pink@example.com',
    customerPhone: '1011121314',
    total: 260,
    status: 'Completed'
  },
  {
    id: 13,
    orderTime: '2025-01-13 22:00:00',
    orderNumber: '1234567902',
    customerName: 'Oliver Brown',
    email: 'oliver.brown@example.com',
    customerPhone: '1213141516',
    total: 280,
    status: 'Pending'
  },
  {
    id: 14,
    orderTime: '2025-01-14 23:00:00',
    orderNumber: '1234567903',
    customerName: 'Emma Green',
    email: 'emma.green@example.com',
    customerPhone: '1314151617',
    total: 300,
    status: 'Processing'
  },
  {
    id: 15,
    orderTime: '2025-01-15 00:00:00',
    orderNumber: '1234567904',
    customerName: 'Liam Gray',
    email: 'liam.gray@example.com',
    customerPhone: '1415161718',
    total: 320,
    status: 'Completed'
  },
  {
    id: 16,
    orderTime: '2025-01-16 01:00:00',
    orderNumber: '1234567905',
    customerName: 'Ava Blue',
    email: 'ava.blue@example.com',
    customerPhone: '1516171819',
    total: 340,
    status: 'Pending'
  },
  {
    id: 17,
    orderTime: '2025-01-17 02:00:00',
    orderNumber: '1234567906',
    customerName: 'Noah White',
    email: 'noah.white@example.com',
    customerPhone: '1617181920',
    total: 360,
    status: 'Processing'
  },
  {
    id: 18,
    orderTime: '2025-01-18 03:00:00',
    orderNumber: '1234567907',
    customerName: 'Isabella Black',
    email: 'isabella.black@example.com',
    customerPhone: '1718192021',
    total: 380,
    status: 'Completed'
  },
  {
    id: 19,
    orderTime: '2025-01-19 04:00:00',
    orderNumber: '1234567908',
    customerName: 'Mason Yellow',
    email: 'mason.yellow@example.com',
    customerPhone: '1819202122',
    total: 400,
    status: 'Pending'
  },
  {
    id: 20,
    orderTime: '2025-01-20 05:00:00',
    orderNumber: '1234567909',
    customerName: 'Sophia Purple',
    email: 'sophia.purple@example.com',
    customerPhone: '1920212223',
    total: 420,
    status: 'Processing'
  }
]

const Order = () => {
  const columns = [
    { title: 'Id', dataKey: 'id' },
    { title: 'Order Time', dataKey: 'orderTime' },
    { title: 'Order Number', dataKey: 'orderNumber' },
    { title: 'Customer Name', dataKey: 'customerName' },
    { title: 'Email', dataKey: 'email' },
    { title: 'Phone', dataKey: 'customerPhone' },
    { title: 'Total', dataKey: 'total' },
    {
      title: 'Status',
      dataKey: 'status',
      render: (status: string) => {
        let color = ''
        let bg = ''

        switch (status) {
          case 'Pending':
            color = 'text-yellow-700'
            bg = 'bg-yellow-100'
            break
          case 'Processing':
            color = 'text-blue-700'
            bg = 'bg-blue-100'
            break
          case 'Completed':
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
      render: () => (
        <div className="flex items-center gap-2 text-sm font-normal">
          <span>
            <i className="bx  bx-printer text-[var(--Aluminium)] text-base"></i>
          </span>
          <span>
            <i className="bx  bx-search-alt text-[var(--Aluminium)] text-base"></i>
          </span>
        </div>
      )
    }
  ]

  const dataFormat = mockData.map((order) => ({
    id: order.id,
    orderTime: new Date(order.orderTime).toDateString(),
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    email: order.email,
    customerPhone: order.customerPhone,
    total: order.total,
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
    </div>
  )
}

export default Order
