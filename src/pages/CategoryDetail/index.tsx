import { useEffect, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ICategory } from '@/models/categories'
import { useParams } from 'react-router'
import { getCategoryDetail, updateCategory } from '@/apis/categories'
import { toast } from 'react-toastify'

const statuses = [
  { id: 1, name: 'Active', value: 'active' },
  { id: 2, name: 'Inactive', value: 'inactive' }
]

const CategoryDetail = () => {
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])
  const [category, setCategory] = useState<ICategory | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { id } = useParams()

  const getCateDetail = async (id: string) => {
    try {
      const res = await getCategoryDetail(id)
      setCategory(res.data)
      const resultStatus = statuses.find((st) => st.value === res.data.status)
      setSelectedStatus(resultStatus as any)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategory((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [e.target.name]: e.target.value ?? ''
      }
    })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const result = {
      ...category,
      status: selectedStatus.value
    }
    try {
      setIsSubmitting(true)
      const res = await updateCategory(id as string, result as ICategory)
      setCategory(res.data)
      toast.success('Update category successfull', {
        pauseOnHover: false
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (id) {
      getCateDetail(id)
    }
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Category Detail</h1>

      {category && (
        <div className="grid gap-8">
          {/* Form fields */}
          <form className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={category.name}
                placeholder="Enter category name"
                name="name"
                onChange={(e) => handleChangeInput(e)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={category.description}
                placeholder="Enter category description"
                rows={4}
                name="description"
                onChange={(e) => handleChangeInput(e)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Listbox value={selectedStatus} onChange={setSelectedStatus}>
                <div className="relative">
                  <ListboxButton className="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-3 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                    <span>{selectedStatus.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i className="bx bx-chevron-down text-gray-400 text-lg"></i>
                    </span>
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm z-10">
                    {statuses.map((status) => (
                      <ListboxOption
                        key={status.id}
                        value={status}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-3 pl-4 pr-10 ${
                            active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`${selected ? 'font-semibold' : 'font-normal'}`}>{status.name}</span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
                                <i className="bx bx-check text-lg"></i>
                              </span>
                            )}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition disabled:opacity-50"
                onClick={(e) => handleSubmit(e)}
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
      )}
    </div>
  )
}

export default CategoryDetail
