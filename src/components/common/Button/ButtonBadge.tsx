import { EButtonType } from '@/models/common'

interface IButtonBadgeProps {
  type: EButtonType
  icon: React.ReactNode
  icon2?: React.ReactNode
  text: string
  isSubmitting?: boolean
  isDisabled?: boolean
  className?: string
  onClick: () => void
}

const ButtonBadge = ({
  type = EButtonType.BUTTON,
  icon,
  icon2,
  text,
  className,
  isSubmitting,
  isDisabled,
  onClick
}: IButtonBadgeProps) => {
  return (
    <button
      type={type}
      className={`flex items-center text-[12px] justify-center text-white border-transparent rounded-lg gap-x-1 bg-primary ${className} ${isDisabled ? 'opacity-50 flex items-center justify-center' : ''}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span>{icon2}</span>
      {isSubmitting ? (
        <div className="w-6 h-6 button-loading animate-spin "></div>
      ) : (
        <>
          <span>{icon}</span>
          {text}
        </>
      )}
    </button>
  )
}

export default ButtonBadge
