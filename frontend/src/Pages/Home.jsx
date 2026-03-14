import React from 'react'
import { FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Home() {
  return (
    <div className='bg-[#0f0f0f] text-white min-h-screen'>
      
      <header className='bg-[#0f0f0f] h-15 border-b border-gray-800 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3'>
        
        {/* left */}
        <div className='flex items-center gap-4'>
          <button className='text-xl bg-[#272727] p-2 rounded-full'><FaBars /></button>

          <div className='flex items-center gap-1'>
            <img src='/playtube.png' className='w-[30px]' alt='logo'/>
            <span className='font-bold text-xl tracking-tight'>PlayTube</span>
          </div>
        </div>

        {/* search */}
        <div className='hidden md:flex items-center gap-2 max-w-xl w-full'>
          <div className='flex items-center w-full'>
            <input 
              type='text'
              placeholder='Search'
              className='flex-1 bg-[#121212] px-4 py-2 rounded-l-full outline-none border border-gray-700'
            />

            <button className='bg-[#272727] px-4 py-2 rounded-r-full border border-gray-700 text-2xl'>
              <CiSearch />
            </button>
          </div>

          <button className='bg-[#272727] p-3 rounded-full'>
            <FaMicrophone />
          </button>
        </div>

        {/* right */}
        <div className='flex items-center gap-3'>
          <button className='hidden md:flex items-center gap-1 bg-[#272727] px-3 py-1 rounded-full'>
            <span className='text-lg'>+</span>
            <span>Create</span>
          </button>

          <FaUserCircle className='text-3xl text-gray-400 hidden md:flex' />
          <CiSearch className='text-lg md:hidden flex'/>
        </div>

      </header>

    </div>
  )
}

export default Home