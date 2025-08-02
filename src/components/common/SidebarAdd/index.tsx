import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface ISidebarAddProps {
  nameAction: string
  type: 'product' | 'category'
}

const SidebarAdd = ({ nameAction, type }: ISidebarAddProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
      >
        <i className="bx bx-plus text-lg" />
        <span>{nameAction}</span>
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
          <TransitionChild
            as={Fragment}
            enter="transition duration-300 transform ease-out"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition duration-200 transform ease-in"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed w-full md:w-[60%] top-0 right-0 h-full bg-white shadow-xl p-6 overflow-y-auto rounded-l-2xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  {type === 'category' ? (
                    <>
                      <h2 className="text-2xl font-semibold text-slate-800">Add Category</h2>
                      <p className="text-sm text-slate-500">Fill in the details below to create a new product.</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-semibold text-slate-800">Add Product</h2>
                      <p className="text-sm text-slate-500">Add your product and necessary information from here</p>
                    </>
                  )}
                </div>
                <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-red-500 transition">
                  <i className="bx bx-x text-2xl"></i>
                </button>
              </div>
              {type === 'category' ? <SidebarAddCategory /> : <SidebarAddProduct />}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

const SidebarAddProduct = () => {
  return (
    <>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
          <input
            type="text"
            placeholder="Product name"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="Short description"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
            <input
              type="number"
              placeholder="100.000"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Old Price</label>
            <input
              type="number"
              placeholder="120.000"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
          <input
            type="text"
            placeholder="Enter category ID"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Images</label>
          <input
            type="file"
            multiple
            className="w-full file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-emerald-600 file:text-white file:text-sm hover:file:bg-emerald-700"
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Save Product
          </button>
        </div>
      </form>
    </>
  )
}

const SidebarAddCategory = () => {
  return (
    <>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
          <input
            type="text"
            placeholder="Product name"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="Short description"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Images</label>
          <input
            type="file"
            multiple
            className="w-full file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-emerald-600 file:text-white file:text-sm hover:file:bg-emerald-700"
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Save Category
          </button>
        </div>
      </form>
    </>
  )
}

export default SidebarAdd
