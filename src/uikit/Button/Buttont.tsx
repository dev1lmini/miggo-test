import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  memo,
  PropsWithChildren
} from "react"
import { twMerge } from "tailwind-merge"

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { loading?: boolean }

export const Button = memo<PropsWithChildren<Props>>(
  forwardRef(({ className, disabled, children, loading, ...props }, ref) => {
    return (
      <button
      disabled={loading || disabled}
        ref={ref}
        className={twMerge(
          "bg-blue-500 rounded-md font-bold px-3 py-2 w-full text-white",
          className
        )}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    )
  })
)

Button.displayName = "Button"
