import ComponentProps from "../types/componentProps"

export default function Output({components, risks, controls, annexes}: ComponentProps) {
  const val = JSON.stringify({components, risks, controls, annexes})
  return (
  <textarea className="w-screen h-screen text-sm font-mono" value={val} readOnly={true}></textarea>
  )
}
