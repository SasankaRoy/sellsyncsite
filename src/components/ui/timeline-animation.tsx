import { motion, useInView } from "framer-motion"
import { forwardRef, useRef } from "react"

interface TimelineContentProps {
  as?: keyof typeof motion
  animationNum: number
  timelineRef: React.RefObject<HTMLElement>
  customVariants: any
  children: React.ReactNode
  [key: string]: any
}

export const TimelineContent = forwardRef<HTMLElement, TimelineContentProps>(
  ({ as = "div", animationNum, timelineRef, customVariants, children, ...props }, ref) => {
    const internalRef = useRef<HTMLElement>(null)
    const elementRef = (ref as React.RefObject<HTMLElement>) || internalRef

    const isInView = useInView(elementRef, { root: timelineRef, once: true })

    const Component = motion[as as keyof typeof motion] || motion.div

    return (
      <Component
        ref={elementRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={customVariants}
        custom={animationNum}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

TimelineContent.displayName = "TimelineContent"