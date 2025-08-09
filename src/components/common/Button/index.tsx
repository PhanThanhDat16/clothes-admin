import { EButtonType } from '@/models/common'

interface IButtonProps {
  type?: EButtonType
  text?: string
  isSubmitting?: boolean
  className?: string
  onClick: () => void
  isDisabled?: boolean
  style?: React.CSSProperties
}

const Button = ({
  type = EButtonType.BUTTON,
  text,
  isDisabled,
  isSubmitting,
  className,
  style,
  onClick
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={`w-full h-10 font-medium text-center text-white capitalize rounded-3xl 
              bg-[radial-gradient(circle_at_center,black,#00000078)] 
              bg-[length:200%_200%] transition-all duration-500 ease-in-out
              hover:bg-[radial-gradient(circle_at_center,#1a1a1a,#000000aa)]
              hover:bg-[length:250%_250%] ${className} ${isDisabled ? 'opacity-50 flex items-center justify-center' : ''}`}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
    >
      {isSubmitting ? <div className="w-6 h-6 button-loading animate-spin"></div> : <span>{text}</span>}
    </button>
  )
}

export default Button
