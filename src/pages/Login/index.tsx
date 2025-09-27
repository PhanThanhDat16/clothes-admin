// Libs
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

// Components
import Field from '@/components/common/Field'
import Input from '@/components/common/Input'

// Models

// API
import { logIn } from '@/apis/authService'

// Stores
import { HOME_PAGE } from '@/constants'
import InputPassword from '@/components/common/Input/InputPassword'
import { EButtonType } from '@/models/common'
import { IAuthForm } from '@/models/auth'
import Button from '@/components/common/Button'

// Constants

const schema = yup.object({
  email: yup.string().required('The email field is required.').email('Enter email, please!'),
  password: yup.string().required('The password field is required.').min(5, 'At least 5 characters.')
})

const defaultForm = {
  mode: 'onChange' as const,
  resolver: yupResolver(schema),
  defaultValues: {
    email: '',
    password: ''
  }
}

const Login = () => {
  const navigate = useNavigate()

  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<IAuthForm>(defaultForm)

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked)
    if (e.target.checked) {
      localStorage.setItem('email', getValues('email'))
      localStorage.setItem('password', getValues('password'))
    } else {
      localStorage.setItem('email', '')
      localStorage.setItem('password', '')
    }
  }

  const handleSignIn: SubmitHandler<IAuthForm> = async (values: IAuthForm) => {
    try {
      const res = await logIn(values)

      const { accessToken, refreshToken, dataToken } = res.data

      if (!accessToken || !refreshToken) {
        console.error('accessToken or refreshToken empty')
        throw new Error('Something went wrong')
      }

      toast.success(`Login successfull`, {
        pauseOnHover: false,
        autoClose: 3000
      })
      localStorage.setItem('userId', dataToken.id)
      localStorage.setItem('accessToken', accessToken)
      navigate(HOME_PAGE)

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      if (rememberMe) {
        localStorage.setItem('email', values.email)
        localStorage.setItem('password', values.password)
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        localStorage.removeItem('rememberMe')
      }
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || ''
    const savedPassword = localStorage.getItem('password') || ''
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true'

    if (savedRememberMe) {
      setValue('email', savedEmail)
      setValue('password', savedPassword)
      setRememberMe(true)
    }
  }, [setValue])

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="/img/login.jpg"
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={handleSubmit(handleSignIn)}>
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
                <div className="flex items-center justify-between mb-6">
                  <label htmlFor="remember-me" className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      name="remember-me"
                      id="remember-me"
                      onChange={handleRememberMe}
                    />
                    <span className="text-xs text-heading">Remember Me</span>
                  </label>
                  <NavLink
                    to="/forget-password"
                    className="text-xs font-medium capitalize transition cursor-pointer text-primary2 hover:underline"
                  >
                    Forget Password
                  </NavLink>
                </div>
                <Button
                  type={EButtonType.SUBMIT}
                  text="Login"
                  className="h-12"
                  isSubmitting={isSubmitting}
                  isDisabled={isSubmitting}
                  onClick={() => {}}
                />
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don’t have an account?{' '}
                  <NavLink to="/signup" className="font-medium text-emerald-500 dark:text-emerald-400 hover:underline">
                    Create one now
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

export default Login
