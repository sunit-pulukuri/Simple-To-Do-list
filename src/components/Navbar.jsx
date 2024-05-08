import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-neutral-800 text-white items-center py-2'>
        <span className='font-bold text-2xl font-sans mx-5 cursor-default'>
            Tasker
        </span>
      <ul className='flex gap-12'>
        <li className='cursor-pointer hover:text-white hover:border-b-2 p-1 hover:border-l-red-300 transition-all m-2'>Home</li>
        <li className='cursor-pointer hover:text-white hover:border-b-2 p-1 hover:border-l-red-300 transition-all m-2'>Your Tasks</li>
        <li></li>
      </ul>
    </nav>
  )
}

export default Navbar
