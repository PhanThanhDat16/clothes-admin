import { getDashboard } from '@/apis/dashboardService'
import { getProductTopPopular } from '@/apis/productService'
import Heading from '@/components/common/Heading'
import { IProduct } from '@/models/product'
import { formatCurrencyVND } from '@/utils'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { toast } from 'react-toastify'

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title)

// // Datamock line chart
// const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`)
// const totalOrderData = Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 20)
// const sumFinalTotalData = totalOrderData.map((order) => order * (Math.random() * 10000 + 50000))

// // Datamock doughnut chart
// const defaultLabelsDoughnutChart = ['Pending', 'Cancelled', 'Success']
// const doughnutChartData = [120, 90, 230]

interface ILineChart {
  labels: string[]
  datasets: {
    totalOrderData: number[]
    sumFinalTotalData: number[]
  }
}

interface IDoughnutChart {
  labels: string[]
  datasets: number[]
}

const HomePage = () => {
  const [overview, setOverview] = useState({
    summary: {
      todayOrder: 0,
      thisMonth: 0,
      totalInRange: 0
    },
    orders: {
      totalOrder: 0,
      orderPending: 0,
      orderCancelled: 0,
      orderPaid: 0
    }
  })
  const [lineChart, setLineChart] = useState<ILineChart>({
    labels: [],
    datasets: {
      totalOrderData: [],
      sumFinalTotalData: []
    }
  })
  const [doughnutChart, setDoughnutChart] = useState<IDoughnutChart>({
    labels: [],
    datasets: []
  })
  const [itemPopular, setItemPopular] = useState<IProduct[] | []>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleGetItemPopular = async () => {
    try {
      const res = await getProductTopPopular()
      setItemPopular(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetDashboard = async (filter?: { startDate?: string; endDate?: string }) => {
    try {
      const res = await getDashboard(filter)
      setOverview({
        summary: res.data.summary,
        orders: res.data.orders
      })
      setLineChart(res.data.charts.lineChart)
      setDoughnutChart(res.data.charts.doughnutChart)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilterByDate = async () => {
    if (!startDate || !endDate) {
      toast.warning('Please select full start and end dates!', {
        pauseOnHover: false
      })
      return
    }

    await handleGetDashboard({ startDate, endDate })
  }

  useEffect(() => {
    ;(async () => {
      await Promise.all([handleGetDashboard(), handleGetItemPopular()])
    })()
  }, [])

  return (
    <div className="h-full">
      <Heading text="Dashboard Overview" />

      <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-5 mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <i className="bx bx-calendar text-emerald-500 text-2xl"></i>
              Time filter
            </h3>
            <p className="text-sm text-gray-500">Select a time period to view sales statistics</p>
          </div>

          {/* Các ô chọn ngày */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">From date</label>
              <input
                type="date"
                className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">To day</label>
              <input
                type="date"
                className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Nút hành động */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleFilterByDate}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <i className="bx  bx-filter text-lg"></i>
                Filter
              </button>

              <button
                onClick={() => {
                  setStartDate('')
                  setEndDate('')
                  handleGetDashboard()
                }}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200"
              >
                <i className="bx  bx-refresh-ccw text-lg"></i>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Over view */}
      {/* <div className="grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-3">
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex justify-center h-full">
          <div className=" border border-gray-200 justify-between w-full p-6 rounded-lg text-white bg-teal-600">
            <div className="text-center xl:mb-0 mb-3">
              <div className="text-center inline-block text-3xl text-white bg-teal-600">
                <i className="bx  bx-layers"></i>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50">Today Orders</p>
                <p className="text-2xl font-bold leading-none text-gray-50">
                  {formatCurrencyVND(overview.summary.todayOrder)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex justify-center text-center h-full">
          <div className=" border border-gray-200 w-full p-6 rounded-lg text-white bg-blue-500">
            <div className="text-center inline-block text-3xl text-white bg-blue-500">
              <i className="bx  bx-cart"></i>
            </div>
            <div>
              <p className="mb-3 text-base font-medium text-gray-50">This Month</p>
              <p className="text-2xl font-bold leading-none text-gray-50">
                {formatCurrencyVND(overview.summary.thisMonth)}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex justify-center h-full">
          <div className=" border border-gray-200 justify-between w-full p-6 rounded-lg text-white bg-orange-400">
            <div className="text-center xl:mb-0 mb-3">
              <div className="text-center inline-block text-3xl text-white bg-orange-400">
                <i className="bx  bx-layers"></i>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50">Last Month</p>
                <p className="text-2xl font-bold leading-none text-gray-50">
                  {' '}
                  {formatCurrencyVND(overview.summary.lastMonth)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="grid gap-2 mb-8 xl:grid-cols-3 md:grid-cols-3">
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex justify-center h-full">
          <div className=" border border-gray-200 justify-between w-full p-6 rounded-lg text-white bg-teal-600">
            <div className="text-center xl:mb-0 mb-3">
              <div className="text-center inline-block text-3xl text-white bg-teal-600">
                <i className="bx bx-layers"></i>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50">
                  {startDate || endDate ? 'Total in Range' : 'Today Orders'}
                </p>
                <p className="text-2xl font-bold leading-none text-gray-50">
                  {formatCurrencyVND(
                    startDate || endDate ? overview.summary.totalInRange : overview.summary.todayOrder
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!startDate && !endDate && (
          <div className="min-w-0 rounded-lg overflow-hidden bg-white flex justify-center text-center h-full">
            <div className="border border-gray-200 w-full p-6 rounded-lg text-white bg-blue-500">
              <div className="text-center inline-block text-3xl text-white bg-blue-500">
                <i className="bx bx-cart"></i>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50">This Month</p>
                <p className="text-2xl font-bold leading-none text-gray-50">
                  {formatCurrencyVND(overview.summary.thisMonth)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-4 mb-8">
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex h-full">
          <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 bg-orange-100">
              <i className="bx  bx-cart"></i>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600">
                <span>Total Order</span>
              </h6>
              <p className="text-lg font-bold leading-none text-gray-600"> {overview.orders.totalOrder}</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex h-full">
          <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 bg-blue-100">
              <svg
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600">
                <span>Orders Pending</span>
              </h6>
              <p className="text-lg font-bold leading-none text-gray-600">{overview.orders.orderPending}</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex h-full">
          <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-red-600 bg-red-100">
              <svg
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="2" />
                <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600">
                <span>Orders Cancelled</span>
              </h6>
              <p className="text-lg font-bold leading-none text-gray-600">{overview.orders.orderCancelled}</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex h-full">
          <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-emerald-600 bg-emerald-100">
              <i className="bx  bx-check"></i>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600">
                <span>Orders Paid</span>
              </h6>
              <p className="text-2xl font-bold leading-none text-gray-600">{overview.orders.orderPaid}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col gap-5 lg:flex-row mb-9">
        {/* Line Chart */}
        <div className="flex-1 bg-white shadow-md line-chart">
          <div className="flex items-center justify-between p-5 border-b db-card-header">
            <h4 className="db-card-title text-[14.5px] md:text-[16px]">Sales Summary</h4>
          </div>
          <div className="p-5 h-[400px]">
            <Line
              data={{
                labels: lineChart.labels,
                datasets: [
                  {
                    label: 'Total Orders',
                    data: lineChart.datasets.totalOrderData,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    enabled: true,
                    callbacks: {
                      label: (tooltipItem) => {
                        const dayIndex = tooltipItem.dataIndex
                        const totalOrder = lineChart.datasets.totalOrderData[dayIndex]
                        const sumFinalTotal = lineChart.datasets.sumFinalTotalData[dayIndex]
                        return [`Total Orders: ${totalOrder}`, `Total Amount: ${sumFinalTotal.toLocaleString()} VND`]
                      }
                    }
                  }
                },
                scales: {
                  x: { title: { display: true, text: 'Day' } },
                  y: { display: true, title: { display: true, text: 'Orders' } }
                }
              }}
            />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-md doughnut-chart w-full lg:max-w-[400px] mx-auto flex flex-col">
          <div className="flex justify-between p-5 border-b db-card-header">
            <h3 className="db-card-title text-[14.5px] md:text-[16px]">Orders Summary</h3>
          </div>
          <div className="flex items-center justify-center flex-1 ">
            <div className="max-w-[350px] max-h-[350px] p-5 doughnut-chart">
              <Doughnut
                data={{
                  labels: doughnutChart.labels,
                  datasets: [
                    {
                      data: doughnutChart.datasets,
                      backgroundColor: ['#a953ff', '#5ec869', '#FFCD56', '#f74d4d', '#36A2EB'],
                      hoverOffset: 4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                      callbacks: {
                        label: (context: any) => {
                          const value = context.raw as number
                          const dataArr = context.dataset.data as number[]
                          const total = dataArr.reduce((a, b) => a + b, 0)
                          const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'
                          const label =
                            context.label ??
                            (context.chart.data.labels && context.dataIndex !== undefined
                              ? context.chart.data.labels[context.dataIndex]
                              : '')
                          return `${label}: ${value} (${percent}%)`
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Product */}
      {itemPopular.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {itemPopular.map((item) => (
              <div key={item._id} className="p-4 border rounded-lg bg-white shadow-sm">
                {/* Phần ảnh + tên ngang hàng */}
                <div className="flex items-center gap-3 mb-2">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="font-semibold text-gray-800">{item.name}</div>
                </div>

                {/* Phần giá */}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    OldPrice: <span className="font-bold">{formatCurrencyVND(item.oldPrice)}</span>
                  </span>
                  <span>
                    Price: <span className="font-bold">{formatCurrencyVND(item.price)}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
