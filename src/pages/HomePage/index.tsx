import Heading from '@/components/common/Heading'
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
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title)

// Datamock line chart
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`)
const totalOrderData = Array.from({ length: 31 }, () => Math.floor(Math.random() * 100) + 20)
const sumFinalTotalData = totalOrderData.map((order) => order * (Math.random() * 10000 + 50000))

// Datamock doughnut chart
const defaultLabelsDoughnutChart = ['Pending', 'Processing', 'Delivered', 'Cancelled', 'Refunded']
const doughnutChartData = [120, 90, 230, 50, 20]

const HomePage = () => {
  return (
    <div className="h-full">
      <Heading text="Dashboard Overview" />

      {/* Over view */}
      <div className="grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2">
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex justify-center h-full">
          <div className=" border border-gray-200 justify-between w-full p-6 rounded-lg text-white bg-teal-600">
            <div className="text-center xl:mb-0 mb-3">
              <div className="text-center inline-block text-3xl text-white bg-teal-600">
                <i className="bx  bx-layers"></i>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50">Today Orders</p>
                <p className="text-2xl font-bold leading-none text-gray-50">$3248.80</p>
              </div>
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
                <p className="mb-3 text-base font-medium text-gray-50">Yesterday Orders</p>
                <p className="text-2xl font-bold leading-none text-gray-50">$139.79</p>
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
              <p className="text-2xl font-bold leading-none text-gray-50">$6787.88</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex justify-center text-center h-full">
          <div className=" border border-gray-200 w-full p-6 rounded-lg text-white bg-cyan-600">
            <div className="text-center inline-block text-3xl text-white bg-cyan-600">
              <i className="bx  bx-credit-card-alt"></i>
            </div>
            <div>
              <p className="mb-3 text-base font-medium text-gray-50">Last Month</p>
              <p className="text-2xl font-bold leading-none text-gray-50">$182709.65</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex justify-center text-center h-full">
          <div className=" border border-gray-200 w-full p-6 rounded-lg text-white bg-emerald-600">
            <div className="text-center inline-block text-3xl text-white bg-emerald-600">
              <i className="bx  bx-credit-card-alt"></i>
            </div>
            <div>
              <p className="mb-3 text-base font-medium text-gray-50">All-Time Sales</p>
              <p className="text-2xl font-bold leading-none text-gray-50">$819882.80</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex h-full">
          <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 bg-orange-100">
              <i className="bx  bx-cart"></i>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600">
                <span>Total Order</span>
              </h6>
              <p className="text-2xl font-bold leading-none text-gray-600">1007</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex h-full">
          <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 bg-blue-100">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
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
              <p className="text-2xl font-bold leading-none text-gray-600">313</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex h-full">
          <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 bg-teal-100">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x={1} y={3} width={15} height={13} />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600">
                <span>Orders Processing</span>
              </h6>
              <p className="text-2xl font-bold leading-none text-gray-600">139</p>
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
                <span>Orders Delivered</span>
              </h6>
              <p className="text-2xl font-bold leading-none text-gray-600">444</p>
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
                labels: days,
                datasets: [
                  {
                    label: 'Total Orders',
                    data: totalOrderData,
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
                      label: function (tooltipItem) {
                        const dayIndex = tooltipItem.dataIndex
                        const totalOrder = totalOrderData[dayIndex]
                        const sumFinalTotal = sumFinalTotalData[dayIndex]
                        return [`Total Orders: ${totalOrder}`, `Total Amount: ${sumFinalTotal.toLocaleString()} VND`]
                      }
                    }
                  }
                },
                scales: {
                  x: { title: { display: true, text: 'Day in Month' } },
                  y: { display: true, title: { display: true, text: 'Orders' } }
                }
              }}
            />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-md doughnut-chart w-full max-w-[400px] mx-auto">
          <div className="flex justify-between p-5 border-b db-card-header">
            <h3 className="db-card-title text-[14.5px] md:text-[16px]">Orders Summary</h3>
          </div>
          <div className="flex items-center justify-center">
            <div className="max-w-[350px] max-h-[350px] p-5">
              <Doughnut
                data={{
                  labels: defaultLabelsDoughnutChart,
                  datasets: [
                    {
                      data: doughnutChartData,
                      backgroundColor: ['#a953ff', '#5ec869', '#FFCD56', '#f74d4d', '#36A2EB'],
                      hoverOffset: 4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          const value = tooltipItem.raw as number
                          const total = doughnutChartData.reduce((a, b) => a + b, 0)
                          const percent = ((value / total) * 100).toFixed(1)
                          return `${tooltipItem.label}: ${value} (${percent}%)`
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
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="font-semibold text-gray-800 mb-1">T-shirt</div>
            <div className="text-sm text-gray-500 mb-2">Category: Shirt</div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Units Sold: <span className="font-bold">1,240</span>
              </span>
              <span>
                Revenue: <span className="font-bold">$62,000</span>
              </span>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="font-semibold text-gray-800 mb-1">Jacket Jean Black</div>
            <div className="text-sm text-gray-500 mb-2">Category: Jacket</div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Units Sold: <span className="font-bold">940</span>
              </span>
              <span>
                Revenue: <span className="font-bold">$37,600</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
