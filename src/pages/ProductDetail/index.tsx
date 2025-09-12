'use client'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EProductSize, IProduct } from '@/models/product'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'
import { getProductDetail, updateProduct } from '@/apis/productService'
import { v4 } from 'uuid'
import { getAllCategoryAll } from '@/apis/categories'
import { ICategory } from '@/models/categories'
import { uploadImages } from '@/apis/uploadService'

const schema = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().typeError('Must be a number').positive('Price must be greater than 0').required(),
  oldPrice: yup.number().typeError('Must be a number').min(0, 'Cannot be negative'),
  categoryId: yup.string().required('Category is required'),
  images: yup.array().optional(),
  options: yup.array().of(
    yup.object({
      size: yup.string().required('Select a size'),
      stockQuantity: yup.number().typeError('Must be a number').min(0, 'Cannot be negative')
    })
  )
})

const ProductDetail = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<IProduct>({
    resolver: yupResolver(schema) as any,
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
  const [previewsImg, setPreviewsImg] = useState<string[]>([])
  const [filesImg, setFilesImg] = useState<File[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const { id } = useParams()

  const {
    fields: optionFields,
    append: addOption,
    remove: removeOption
  } = useFieldArray({
    control,
    name: 'options'
  })

  const handleGetProductDetail = async (id: string) => {
    try {
      const res = await getProductDetail(id)
      reset(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetCategoryAll = async () => {
    try {
      const res = await getAllCategoryAll()
      setCategories(res.data)
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

  const onSubmit = async (data: IProduct) => {
    const mergedOptions = Object.values(
      data.options.reduce(
        (acc, { size, stockQuantity }) => {
          if (!acc[size]) {
            acc[size] = { size, stockQuantity }
          } else {
            acc[size].stockQuantity += stockQuantity
          }
          return acc
        },
        {} as Record<string, { size: string; stockQuantity: number }>
      )
    )
    data.options = mergedOptions
    if (!data.name || !data.description || !data.price || !data.oldPrice || !data.categoryId) return
    try {
      let imageUrls: string[] = []
      if (filesImg.length > 0) {
        console.log(filesImg)
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

      await updateProduct(id as string, productPayload as unknown as IProduct)
      handleGetProductDetail(id as string)
      toast.success('update successfully', { pauseOnHover: false })
      setFilesImg([])
      setPreviewsImg([])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      ;(async () => {
        await Promise.all([handleGetCategoryAll(), handleGetProductDetail(id)])
      })()
    }
  }, [])

  return (
    <div className="p-8 bg-white rounded-xl">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Product Detail</h1>
      <label className="block text-sm font-medium text-gray-700 mb-3">Images product</label>
      {getValues('images') && getValues('images').length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {getValues('images').map((img) => (
            <div key={v4()} className="relative w-full h-[300px] border rounded-md overflow-hidden group">
              <img src={img} alt={`product-img-${v4()}`} className="object-cover w-full h-full" />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                // onClick={() => handleRemoveServerImg(idx)} // Uncomment and implement if you want to allow removing server images
                disabled
                title="Không thể xóa ảnh đã lưu"
              >
                <i className="bx bx-lock text-white text-lg"></i>
              </button>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div>
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

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            {...register('name')}
            placeholder="Enter namename"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <input
            type="text"
            {...register('categoryId')}
            placeholder="Nhập ID danh mục"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
        </div> */}
        {/* Category */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
          <div className="relative">
            <i className="bx bx-category-alt absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            <select
              {...register('categoryId', { required: true })}
              className="w-full pl-4 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            {...register('description')}
            placeholder="Description productproduct..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        {/* Price + OldPrice */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PricePrice</label>
            <input
              type="number"
              {...register('price')}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">OldPrice</label>
            <input
              type="number"
              {...register('oldPrice')}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            {errors.oldPrice && <p className="text-red-500 text-xs mt-1">{errors.oldPrice.message}</p>}
          </div>
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tùy chọn Size</label>
          <div className="space-y-3">
            {optionFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <select
                  {...register(`options.${index}.size`)}
                  className="px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={EProductSize.M}>M</option>
                  <option value={EProductSize.L}>L</option>
                  <option value={EProductSize.XL}>XL</option>
                </select>
                <input
                  type="number"
                  {...register(`options.${index}.stockQuantity`)}
                  placeholder="Số lượng"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => removeOption(index)}
                >
                  <i className="bx  bx-trash"></i>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            onClick={() => addOption({ size: EProductSize.M, stockQuantity: 0 })}
          >
            + Thêm size
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              'Update product'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductDetail
