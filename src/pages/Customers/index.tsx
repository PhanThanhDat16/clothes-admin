// Components
import ExportImport from '@/components/common/ExportImport'
import Heading from '@/components/common/Heading'
import Table from '@/components/common/Table'
// import { IUser } from '@/models/user'

const mockData = [
  {
    id: 1,
    userName: 'JohnDoe',
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    phone: '1234567890',
    totalBill: 200
  },
  {
    id: 2,
    userName: 'JaneSmith',
    email: 'jane.smith@example.com',
    fullName: 'Jane Smith',
    phone: '0987654321',
    totalBill: 150
  },
  {
    id: 3,
    userName: 'MikeBrown',
    email: 'mike.brown@example.com',
    fullName: 'Mike Brown',
    phone: '1122334455',
    totalBill: 300
  },
  {
    id: 4,
    userName: 'EmilyWhite',
    email: 'emily.white@example.com',
    fullName: 'Emily White',
    phone: '2233445566',
    totalBill: 250
  },
  {
    id: 5,
    userName: 'ChrisGreen',
    email: 'chris.green@example.com',
    fullName: 'Chris Green',
    phone: '3344556677',
    totalBill: 180
  },
  {
    id: 6,
    userName: 'SarahBlack',
    email: 'sarah.black@example.com',
    fullName: 'Sarah Black',
    phone: '4455667788',
    totalBill: 220
  },
  {
    id: 7,
    userName: 'DavidBlue',
    email: 'david.blue@example.com',
    fullName: 'David Blue',
    phone: '5566778899',
    totalBill: 270
  },
  {
    id: 8,
    userName: 'LauraGray',
    email: 'laura.gray@example.com',
    fullName: 'Laura Gray',
    phone: '6677889900',
    totalBill: 190
  },
  {
    id: 9,
    userName: 'TomYellow',
    email: 'tom.yellow@example.com',
    fullName: 'Tom Yellow',
    phone: '7788990011',
    totalBill: 210
  },
  {
    id: 10,
    userName: 'AnnaPurple',
    email: 'anna.purple@example.com',
    fullName: 'Anna Purple',
    phone: '8899001122',
    totalBill: 230
  },
  {
    id: 11,
    userName: 'MarkRed',
    email: 'mark.red@example.com',
    fullName: 'Mark Red',
    phone: '9900112233',
    totalBill: 240
  },
  {
    id: 12,
    userName: 'SophiaPink',
    email: 'sophia.pink@example.com',
    fullName: 'Sophia Pink',
    phone: '1011121314',
    totalBill: 260
  },
  {
    id: 13,
    userName: 'OliverBrown',
    email: 'oliver.brown@example.com',
    fullName: 'Oliver Brown',
    phone: '1213141516',
    totalBill: 280
  },
  {
    id: 14,
    userName: 'EmmaGreen',
    email: 'emma.green@example.com',
    fullName: 'Emma Green',
    phone: '1314151617',
    totalBill: 300
  },
  {
    id: 15,
    userName: 'LiamGray',
    email: 'liam.gray@example.com',
    fullName: 'Liam Gray',
    phone: '1415161718',
    totalBill: 320
  },
  {
    id: 16,
    userName: 'AvaBlue',
    email: 'ava.blue@example.com',
    fullName: 'Ava Blue',
    phone: '1516171819',
    totalBill: 340
  },
  {
    id: 17,
    userName: 'NoahWhite',
    email: 'noah.white@example.com',
    fullName: 'Noah White',
    phone: '1617181920',
    totalBill: 360
  },
  {
    id: 18,
    userName: 'IsabellaBlack',
    email: 'isabella.black@example.com',
    fullName: 'Isabella Black',
    phone: '1718192021',
    totalBill: 380
  },
  {
    id: 19,
    userName: 'MasonYellow',
    email: 'mason.yellow@example.com',
    fullName: 'Mason Yellow',
    phone: '1819202122',
    totalBill: 400
  },
  {
    id: 20,
    userName: 'SophiaPurple',
    email: 'sophia.purple@example.com',
    fullName: 'Sophia Purple',
    phone: '1920212223',
    totalBill: 420
  }
]

const Customer = () => {
  const columns = [
    { title: 'Id', dataKey: 'id' },
    { title: 'UserName', dataKey: 'username' },
    { title: 'Email', dataKey: 'email' },
    { title: 'FullName', dataKey: 'fullName' },
    { title: 'Phone', dataKey: 'phone' },
    { title: 'TotalBill', dataKey: 'totalBill' },
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

  const dataFormat = mockData.map((user) => ({
    id: user.id,
    username: user.userName,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
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
            placeholder="Search by category name"
            className="flex-1 px-3 h-full py-1 border text-sm placeholder:text-sm focus:bg-white rounded-md bg-[var(--Athens-Gray2)]"
          />
          <div className="flex items-center flex-1 h-full gap-4">
            <button className="px-4 flex-1 h-full text-sm py-2 bg-[var(--Watercourse)] font-medium text-white rounded-lg">
              Filter
            </button>
            <button className="px-4 flex-1 h-full text-sm py-2 bg-[var(--Athens-Gray)]  rounded-lg">Reset</button>
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

export default Customer
