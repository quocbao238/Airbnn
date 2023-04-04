import React from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps {
  icon: IconType
  onClick: (value: string) => void
  selected: boolean
  label: string
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  onClick,
  selected,
  label,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={` rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-rose-500 transition cursor-pointer ${
        selected ? 'border-rose-500' : 'border-neutral-200'
      }
    `}
    >
      <Icon size={30} />
      <div className=" font-semibold ">{label}</div>
    </div>
  )
}

export default CategoryInput
