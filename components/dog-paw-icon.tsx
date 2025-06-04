import type { SVGProps } from "react"

export function DogPawIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 5a3 3 0 0 1-5.24 2 3 3 0 0 1 0-4 3 3 0 0 1 5.24 2Z" />
      <path d="M18 5a3 3 0 1 1-5.24 2 3 3 0 0 1 0-4A3 3 0 0 1 18 5Z" />
      <path d="M9 11.5a3 3 0 1 1-5.24 2 3 3 0 0 1 0-4A3 3 0 0 1 9 11.5Z" />
      <path d="M20 11.5a3 3 0 1 1-5.24 2 3 3 0 0 1 0-4A3 3 0 0 1 20 11.5Z" />
      <path d="M9 19a3 3 0 0 1 6 0c0 1.7-1.3 3-3 3s-3-1.3-3-3Z" />
    </svg>
  )
}
