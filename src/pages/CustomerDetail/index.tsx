import { useState, useEffect, Fragment } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { useParams } from 'react-router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { getProfile, getUserDetail, updateUser } from '@/apis/userService'
import { uploadAvatar } from '@/apis/uploadService'
import { toast } from 'react-toastify'

interface IDefaultForm {
  email: string
  fullName: string
  phone: string | null
  totalBill: number
  type: string
  avatar: string | null
}

const accountTypes = ['user', 'admin']

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('required'),
  fullName: yup.string().max(100, 'Maximum 100 characters').required('required'),
  totalBill: yup.number().min(0, 'Minimum 0').required('required'),
  type: yup.string().oneOf(accountTypes).required('required'),
  phone: yup.string().max(11, 'Phone number maximum 11 characters').nullable(),
  avatar: yup.string().nullable()
})

const defaultForm = {
  mode: 'onChange' as const,
  resolver: yupResolver(schema) as any,
  defaultValues: {
    email: '',
    fullName: '',
    phone: null,
    totalBill: 0,
    type: 'user',
    avatar: null
  }
}

const CustomerDetail = () => {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IDefaultForm>(defaultForm)

  const getCustomerDetail = async (id: string) => {
    try {
      const res = await getUserDetail(id)
      const userData = res.data
      reset(userData)
      setAvatar(userData.avatar || null)
    } catch (error) {
      console.log(error)
    }

    const test = await getProfile()
    console.log(test)
  }

  const handleUpdateUser: SubmitHandler<IDefaultForm> = async (data) => {
    try {
      let avatarUrl = avatar
      let payload
      if (avatarFile) {
        const res = await uploadAvatar(avatarFile)
        avatarUrl = res.data.image

        payload = {
          ...data,
          avatar: avatarUrl ?? '',
          phone: data.phone ?? ''
        }
        await updateUser(id as string, payload)
        toast.success('Update successfull', {
          pauseOnHover: false
        })
      } else {
        payload = {
          ...data,
          avatar: '',
          phone: data.phone ?? ''
        }
        await updateUser(id as string, payload)
        toast.success('Update successfull', {
          pauseOnHover: false
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setAvatar(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (id) getCustomerDetail(id)
  }, [id])

  return (
    <div className="flex items-center justify-center bg-gradient-to-br ">
      <div className="w-full bg-white p-8 rounded-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Customer Detail</h1>
        </div>

        <div className="flex justify-center mb-8">
          <label className="relative cursor-pointer">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-indigo-500 transition relative group">
              {avatar ? (
                <>
                  <img src={avatar} alt="Avatar Preview" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setAvatar(null)
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                  >
                    <button className="p-3 bg-white rounded-full shadow-md transition">
                      <i className="bx bx-trash text-red-500 text-lg"></i>
                    </button>
                  </button>
                </>
              ) : (
                <span className="text-gray-400 text-sm">Upload</span>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <form onSubmit={handleSubmit(handleUpdateUser)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              {...register('fullName')}
              placeholder="Nguyen Van A"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="+84 912 345 678"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Listbox value={field.value} onChange={field.onChange}>
                  <div className="relative">
                    <ListboxButton className="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-3 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                      <span className="block truncate capitalize">{field.value}</span>
                    </ListboxButton>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {accountTypes.map((type) => (
                          <ListboxOption
                            key={type}
                            value={type}
                            className={({ active }) =>
                              `cursor-pointer select-none py-2 pl-4 pr-4 ${
                                active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                              }`
                            }
                          >
                            {type}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              )}
            />
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Bill</label>
            <input
              type="number"
              min={0}
              {...register('totalBill')}
              placeholder="0"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            {errors.totalBill && <p className="text-red-500 text-sm mt-1">{errors.totalBill.message}</p>}
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-8">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Reset
            </button>
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
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerDetail
