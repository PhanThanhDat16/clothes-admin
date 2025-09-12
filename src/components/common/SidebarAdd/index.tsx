import { createCategory, getAllCategoryAll } from '@/apis/categories'
import { ICategory } from '@/models/categories'
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ButtonBadge from '../Button/ButtonBadge'
import { EButtonType } from '@/models/common'
import { EProductSize, IProduct } from '@/models/product'
import { createProduct } from '@/apis/productService'
import { uploadImages } from '@/apis/uploadService'

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
                <SidebarAddProduct setOpen={setOpen} handleGetAll={handleGetAll} />
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

interface ISidebar {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleGetAll: () => void
}

const SidebarAddProduct = ({ setOpen, handleGetAll }: ISidebar) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<IProduct>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      oldPrice: 0,
      categoryId: '',
      images: [],
      options: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  })

  const [categories, setCategories] = useState<ICategory[]>([])
  const [previewsImg, setPreviewsImg] = useState<string[]>([])
  const [filesImg, setFilesImg] = useState<File[]>([])

  const handleGetAllCategory = async () => {
    try {
      const res = await getAllCategoryAll()
      setCategories(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateProduct = async (data: IProduct) => {
    if (!data.name || !data.description || !data.price || !data.oldPrice || !data.categoryId) return

    try {
      let imageUrls: string[] = []
      if (filesImg.length > 0) {
        const uploadRes = await uploadImages(filesImg)
        imageUrls = uploadRes.data?.images || []
      }

      const productPayload = {
        ...data,
        price: Number(data.price),
        oldPrice: Number(data.oldPrice),
        images: imageUrls,
        options: data.options.filter((opt) => opt.size && opt.stockQuantity > 0) // clear option empty
      }

      console.log(productPayload)

      await createProduct(productPayload as unknown as IProduct)

      handleGetAll()
      toast.success('Create product success', { pauseOnHover: false })
      setOpen(false)
      setFilesImg([])
      setPreviewsImg([])
    } catch (error) {
      console.log(error)
    }
  }

  const handlePreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const fileArray = Array.from(files)

    if (fileArray.length + filesImg.length > 3) {
      toast.error('Accept limit 3 image', { pauseOnHover: false })
      return
    }

    setFilesImg((prev) => [...prev, ...fileArray])
    const urls = fileArray.map((file) => URL.createObjectURL(file))
    setPreviewsImg((prev) => [...prev, ...urls])
  }

  const handleRemoveImg = (index: number) => {
    setPreviewsImg((prev) => prev.filter((_, i) => i !== index))
    setFilesImg((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    handleGetAllCategory()
  }, [])

  return (
    <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
      {/* Basic Information */}
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-info-circle text-emerald-500 text-xl"></i>
          Basic Information
        </h3>
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Product Name</label>
          <div className="relative">
            <i className="bx bx-package absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            <input
              type="text"
              {...register('name', { required: true })}
              placeholder="e.g. T-shirt"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
          </div>
        </div>
        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            {...register('description', { required: true })}
            rows={3}
            placeholder="Short product description"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
        {/* Section: Pricing */}
        <div className="pb-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <i className="bx bx-dollar-circle text-emerald-500 text-xl"></i> Pricing
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
              <div className="relative">
                <i className="bx bx-money absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                <input
                  type="number"
                  {...register('price', { required: true })}
                  placeholder="100000"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Old Price</label>
              <div className="relative">
                <i className="bx bx-money-withdraw absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                <input
                  type="number"
                  {...register('oldPrice', { required: true })}
                  placeholder="120000"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
          <div className="relative">
            <i className="bx bx-category-alt absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            <select
              {...register('categoryId', { required: true })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-image-add text-emerald-500 text-xl"></i>
          Product Images (Limit 3)
        </h3>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePreviewImg}
          className="w-full file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-emerald-600 file:text-white file:text-sm hover:file:bg-emerald-700 transition"
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {previewsImg.map((src, idx) => (
            <div key={idx} className="group relative w-full h-32 border rounded-md overflow-hidden">
              <img src={src} alt={`preview-${idx}`} className="object-cover w-full h-full" />
              <button
                type="button"
                onClick={() => handleRemoveImg(idx)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
              >
                <i className="bx bx-trash text-white text-2xl"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Size & Stock */}
      <div className="pb-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <i className="bx bx-shirt text-emerald-500 text-xl"></i>
          Size & Stock
        </h3>

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Size</label>
              <select
                {...register(`options.${index}.size`, { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              >
                <option value="">Select size</option>
                <option value={EProductSize.M}>M</option>
                <option value={EProductSize.L}>L</option>
                <option value={EProductSize.XL}>XL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Stock Quantity</label>
              <div className="relative">
                <i className="bx bx-cube absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                <input
                  type="number"
                  {...register(`options.${index}.stockQuantity`, { required: true })}
                  placeholder="e.g. 50"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="col-span-2 text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
            >
              <i className="bx bx-trash"></i> Remove
            </button>
          </div>
        ))}

        {/* Add new option */}
        <button
          type="button"
          onClick={() => append({ size: '', stockQuantity: 0 })}
          className="mt-2 py-2 px-4 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
        >
          <i className="bx bx-plus"></i> Add Size Option
        </button>
      </div>

      {/* Submit */}
      <ButtonBadge
        icon={<i className="bx bx-save text-lg"></i>}
        type={EButtonType.SUBMIT}
        text="Create Product"
        className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow"
        isSubmitting={isSubmitting}
        isDisabled={isSubmitting}
        onClick={() => {}}
      />
    </form>
  )
}

const SidebarAddCategory = ({ setOpen, handleGetAll }: ISidebar) => {
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
          text="Create Category"
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
