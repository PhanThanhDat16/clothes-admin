import { getOrderDetail, updateOrder } from '@/apis/orderService'
import { IOrderDetail } from '@/models/order'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

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

  const handleChangeStatus = async (newStatus: string) => {
    if (!id) return

    if (order?.status === 'paid') {
      toast.warning('The order has been paid, the status cannot be changed!')
      return
    }

    try {
      await updateOrder(id, { status: newStatus })
      setOrder((prevOrder) => (prevOrder ? { ...prevOrder, status: newStatus } : prevOrder))
      toast.success('Update status successfully!')
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
            <p className="flex items-center">
              <span className="font-semibold mr-2">Trạng thái:</span>
              <div className="flex items-center gap-2">
                {order?.status === 'pending' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm">
                    <i className="bx bx-time text-base mr-1"></i> Pending
                  </span>
                )}
                {order?.status === 'cancelled' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
                    <i className="bx bx-x-circle text-base mr-1"></i> Cancelled
                  </span>
                )}
                {order?.status === 'paid' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                    <i className="bx bx-check-circle text-base mr-1"></i> Paid
                  </span>
                )}

                <div className="ml-2">
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 text-xs font-medium text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={order?.status}
                    onChange={(e) => handleChangeStatus(e.target.value)}
                    disabled={order?.status === 'paid'}
                  >
                    <option value="pending" disabled={order?.status === 'paid'}>
                      Pending
                    </option>
                    <option value="cancelled" disabled={order?.status === 'paid'}>
                      Cancelled
                    </option>
                    <option value="paid" disabled={order?.status === 'paid'}>
                      Paid
                    </option>
                  </select>
                </div>
              </div>
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
