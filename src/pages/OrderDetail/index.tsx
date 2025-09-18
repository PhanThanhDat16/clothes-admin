import { getOrderDetail } from '@/apis/orderService'
import { IOrderDetail } from '@/models/order'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const OrderDetail = () => {
  const [order, setOrder] = useState<IOrderDetail | null>(null)
  const { id } = useParams()

  const handleGetOrderDetail = async (id: string) => {
    try {
      const res = await getOrderDetail(id)
      setOrder(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      handleGetOrderDetail(id)
    }
  }, [])

  return (
    <>
      <div className="order-detail-container p-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg rounded-2xl p-6 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Chi tiết đơn hàng</h2>
          <p className="opacity-90">Mã đơn: #{order ? order._id : ''}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Thông tin khách hàng</h3>
          <div className="grid grid-cols-2 gap-6 text-gray-700">
            <p>
              <span className="font-semibold">Khách hàng:</span> {order?.fullName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {order?.email}
            </p>
            <p>
              <span className="font-semibold">Trạng thái:</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm
            ${order?.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
            ${order?.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
            ${order?.status === 'canceled' ? 'bg-red-100 text-red-700' : ''}`}
              >
                {order?.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Ngày tạo:</span>{' '}
              {order ? new Date(order.createdAt).toLocaleDateString() : ''}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h3>
          <div className="space-y-4">
            {order &&
              order.items.map((oi) => (
                <div key={oi._id} className="flex items-center border rounded-xl p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={oi.itemDetail.images[0]}
                    alt={oi.itemDetail.name}
                    className="w-20 h-20 object-cover rounded-xl shadow-sm"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold text-lg">{oi.itemDetail.name}</p>
                    <p className="text-sm text-gray-500">Size: {oi.size}</p>
                    <p className="text-sm text-gray-500">SL: {oi.quantity}</p>
                  </div>
                  <p className="font-semibold text-indigo-600 text-lg">{(oi.price * oi.quantity).toLocaleString()} ₫</p>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white shadow-inner rounded-2xl p-6 mt-6 text-right space-y-2 border-t">
          <p className="text-gray-700">
            <span className="font-semibold">Tổng tiền hàng:</span> {order?.totalPrice} ₫
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Giảm giá:</span> -{order?.discount} ₫
          </p>
          <p className="text-2xl font-bold text-indigo-600">Thành tiền: {order?.finalTotal.toLocaleString()} ₫</p>
        </div>
      </div>
    </>
  )
}
export default OrderDetail
