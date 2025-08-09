// Libs
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

// Components
import Field from '@/components/common/Field'
import Input from '@/components/common/Input'

// Models

// API
import { register } from '@/apis/userService'

// Stores
import { LOGIN_PAGE } from '@/constants'
import InputPassword from '@/components/common/Input/InputPassword'
import { EButtonType } from '@/models/common'
import { IAuthSignUpForm } from '@/models/auth'
import Button from '@/components/common/Button'

const schema = yup.object({
  fullName: yup.string().required('The fullName field is required.'),
  email: yup.string().required('The email field is required.').email('Enter email, please!'),
  phone: yup
    .string()
    .required('The phone field is required.')
    .matches(/^[0-9]{9,11}$/, 'Phone number must be 9–11 digits'),
  password: yup.string().required('The password field is required.').min(5, 'At least 5 characters.')
})

const defaultForm = {
  mode: 'onChange' as const,
  resolver: yupResolver(schema),
  defaultValues: {
    fullName: '',
    email: '',
    phone: '',
    password: ''
  }
}

const SignUp = () => {
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<IAuthSignUpForm>(defaultForm)

  const handleSignUp: SubmitHandler<IAuthSignUpForm> = async (values: IAuthSignUpForm) => {
    try {
      const dataValues: IAuthSignUpForm = {
        ...values,
        type: 'admin'
      }
      await register(dataValues)

      toast.success(`SignUp successfull`, {
        pauseOnHover: false,
        autoClose: 3000
      })

      navigate(LOGIN_PAGE)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="/img/signup.jpg"
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Create account</h1>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <Field>
                  <Input
                    type="fullName"
                    name="fullName"
                    className={`!h-12 ${errors.fullName ? 'border-red-500' : ''}`}
                    control={control}
                    label="FullName"
                  />
                  {errors.fullName && (
                    <p className="text-[12.8px] text-[#ef4444] mt-1 ml-1">{errors.fullName.message}</p>
                  )}
                </Field>
                <Field>
                  <Input
                    type="email"
                    name="email"
                    className={`!h-12 ${errors.email ? 'border-red-500' : ''}`}
                    control={control}
                    label="Email"
                  />
                  {errors.email && <p className="text-[12.8px] text-[#ef4444] mt-1 ml-1">{errors.email.message}</p>}
                </Field>
                <Field>
                  <Input
                    type="phone"
                    name="phone"
                    className={`!h-12 ${errors.phone ? 'border-red-500' : ''}`}
                    control={control}
                    label="phone"
                  />
                  {errors.phone && <p className="text-[12.8px] text-[#ef4444] mt-1 ml-1">{errors.phone.message}</p>}
                </Field>
                <Field>
                  <InputPassword
                    type="password"
                    name="password"
                    className={errors.password ? 'border-red-500' : ''}
                    control={control}
                    label="Password"
                  />
                  {errors.password && (
                    <p className="text-[12.8px] text-[#ef4444] mt-1 ml-1">{errors.password.message}</p>
                  )}
                </Field>
                <Button
                  type={EButtonType.SUBMIT}
                  text="Create Account"
                  className="h-12"
                  isSubmitting={isSubmitting}
                  isDisabled={isSubmitting}
                  onClick={() => {}}
                />
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <NavLink to="/login" className="font-medium text-emerald-500 dark:text-emerald-400 hover:underline">
                    Login
                  </NavLink>
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default SignUp
