import { createCategory } from '@/apis/categories'
import { ICategory } from '@/models/categories'
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ButtonBadge from '../Button/ButtonBadge'
import { EButtonType } from '@/models/common'

interface ISidebarAddProps {
  nameAction: string
  type: 'product' | 'category'
  handleGetAll: () => void
}

const SidebarAdd = ({ nameAction, type, handleGetAll }: ISidebarAddProps) => {
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
              {type === 'category' ? (
                <SidebarAddCategory setOpen={setOpen} handleGetAll={handleGetAll} />
              ) : (
                <SidebarAddProduct setOpen={setOpen} />
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

interface ISidebarCate {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleGetAll: () => void
}

interface ISidebarProduct {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarAddProduct = ({ setOpen }: ISidebarProduct) => {
  //  TEST
  setOpen(true)
  return (
    <form className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-info-circle text-emerald-500 text-xl"></i>
          Basic Information
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
          <div className="relative">
            <i className="bx bx-package absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            <input
              type="text"
              placeholder="e.g. T-shirt"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="Short product description"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Section: Pricing */}
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-dollar-circle text-emerald-500 text-xl"></i>
          Pricing
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
            <div className="relative">
              <i className="bx bx-money absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
              <input
                type="number"
                placeholder="100000"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>
          </div>
          {/* Old Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Old Price</label>
            <div className="relative">
              <i className="bx bx-money-withdraw absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
              <input
                type="number"
                placeholder="120000"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Category */}
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-category text-emerald-500 text-xl"></i>
          Category
        </h3>
        <div className="relative">
          <i className="bx bx-category-alt absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
          <input
            type="text"
            placeholder="Enter category ID"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Section: Images */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-image-add text-emerald-500 text-xl"></i>
          Product Images
        </h3>
        <input
          type="file"
          multiple
          className="w-full file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-emerald-600 file:text-white file:text-sm hover:file:bg-emerald-700 transition"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow"
        >
          <i className="bx bx-save text-lg"></i>
          Save Product
        </button>
      </div>
    </form>
  )
}

const SidebarAddCategory = ({ setOpen, handleGetAll }: ISidebarCate) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<ICategory>({
    defaultValues: {
      name: '',
      description: '',
      status: 'active'
    }
  })

  const handleCreateCategory = async (data: ICategory) => {
    if (data.name === '' || data.description === '') return
    try {
      await createCategory(data)
      // console.log(res)
      handleGetAll()
      toast.success('Create category success', {
        pauseOnHover: false
      })
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateCategory)} className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-info-circle text-emerald-500 text-xl"></i>
          Basic Information
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Category Name</label>
          <div className="relative">
            <i className="bx bx-tag absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            <input
              type="text"
              {...register('name', { required: true })}
              placeholder="e.g. Electronics"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            {...register('description', { required: true })}
            rows={3}
            placeholder="Short description about this category"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      <div className="pb-4 ">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-cog text-emerald-500 text-xl"></i>
          Settings
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
          <select
            {...register('status')}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        {/* <button
          type="submit"
          className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow"
        >
          <i className="bx bx-save text-lg"></i>
          Save Category
        </button> */}
        <ButtonBadge
          icon={<i className="bx bx-save text-lg"></i>}
          type={EButtonType.SUBMIT}
          text=" Save Category"
          className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow"
          isSubmitting={isSubmitting}
          isDisabled={isSubmitting}
          onClick={() => {}}
        />
      </div>
    </form>
  )
}

export default SidebarAdd
