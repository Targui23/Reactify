import React from 'react'

export const Button = ({ id, title, leftIcon, containerClass }) => {
  return (
    <button id={id} className={`group relative z-10 w-fit cursor-pointer
     overflow-hidden rounded-full px-7 py-3 text-black ${containerClass} bg-white`}>
        {leftIcon}
        <span className="relative incline-flex overflow-hidden font-general text-xs uppercase" >
            <div>
                {title}
            </div>
        </span>
    </button>
  )
}
  
export default Button
