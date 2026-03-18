import React from 'react'
import { FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { CgPlayList } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { FaThumbsUp } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Profile from '../components/profile.jsx'



function Home({ navigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedItem, setSelectedItem] = useState('Home')
  const [active, setActive] = useState("Home")
  const [showProfile, setShowProfile] = useState(false)
  const { userData } = useSelector((state) => state.user)
  const categories = ["Music", "Gaming", "Movies", "Tv Shows", "News", "Trending",
    "Entertainment", "Education", "Science & Tech", "Travel", "Fashion", "Cooking", "Sports", "Pets", "Art", "Comedy", "Vlogs"]
  return (
    <div className='bg-[#0f0f0f] text-white min-h-screen'>

      <header className='bg-[#0f0f0f] h-15 border-b border-gray-800 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3'>

        {/* left */}
        <div className='flex items-center gap-4'>
          <button className='text-xl bg-[#272727] p-2 rounded-full' onClick={() => setSidebarOpen(!sidebarOpen)}><FaBars /></button>

          <div className='flex items-center gap-1'>
            <img src='/playtube.png' className='w-[30px]' alt='logo' />
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
          {userData?.channel && <button className='hidden md:flex items-center gap-1 cursor-pointer bg-[#272727] px-3 py-1 rounded-full'>
            <span className='text-lg'>+</span>
            <span>Create</span>
          </button>}

          {userData?.photoUrl ? <button onClick={()=>setShowProfile(!showProfile)}><img className='w-8 h-8 cursor-pointer rounded-full border-2 hidden md:block border-white' src={userData?.photoUrl} alt='user'></img></button> : <button onClick={()=>setShowProfile(!showProfile)}><FaUserCircle className='text-3xl cursor-pointer text-gray-400 hidden md:flex' /></button>}
          <CiSearch className='text-lg md:hidden flex' />
        </div>

      </header>
      {/* sidbar */}
      <aside className={`bg-[#0f0f0f] border-r border-gray-800 transition-all duration-300 fixed top-15 bottom-0 z-40 ${sidebarOpen ? 'w-60' : 'w-20'} hidden md:flex flex-col overflow-y-auto`}>
        <nav>
          <SidebarItem icon={<FaHome />} text={"Home"} open={sidebarOpen} selected={selectedItem === "Home"} onClick={() => { setSelectedItem("Home"); navigate('/') }} />
        </nav>
        <nav>
          <SidebarItem icon={<SiYoutubeshorts />} text={"Shorts"} open={sidebarOpen} selected={selectedItem === "Shorts"} onClick={() => { setSelectedItem("Shorts"); navigate('/shorts') }} />
        </nav>
        <hr className='border-gray-800 my-3'></hr>
        {sidebarOpen ? <h2 className='p-2 text-lg gap-2 font-semibold flex items-center'>Subscriptions{<FaGreaterThan />}</h2> :

          <nav>
            <SidebarItem icon={<MdOutlineSubscriptions />} text={"Subscriptions"} open={sidebarOpen} selected={selectedItem === "Subscriptions"} onClick={() => setSelectedItem("Subscriptions")} />
          </nav>
        }
        <hr className='border-gray-800 my-3'></hr>
        {sidebarOpen ? <h2 className='p-2 text-lg gap-2 font-semibold flex items-center'>You{<FaGreaterThan />}</h2> :
          <nav>
            <SidebarItem icon={<FaRegUserCircle />} text={"You"} open={sidebarOpen} selected={selectedItem === "You"} onClick={() => setSelectedItem("You")} />
          </nav>
        }
        <nav>
          <SidebarItem icon={<FaHistory />} text={"History"} open={sidebarOpen} selected={selectedItem === "History"} onClick={() => setSelectedItem("History")} />
        </nav>
        <nav>
          <SidebarItem icon={<CgPlayList />} text={"Playlists"} open={sidebarOpen} selected={selectedItem === "Playlists"} onClick={() => setSelectedItem("Playlists")} />
        </nav>
        <nav>
          <SidebarItem icon={<GoVideo />} text={"Save Videos"} open={sidebarOpen} selected={selectedItem === "Save Videos"} onClick={() => setSelectedItem("Save Videos")} />
        </nav>
        <nav>
          <SidebarItem icon={<FaThumbsUp />} text={"Liked Videos"} open={sidebarOpen} selected={selectedItem === "Liked Videos"} onClick={() => setSelectedItem("Liked Videos")} />
        </nav>

      </aside>
      <main className={`overflow-y-auto p-4 flex flex-col pb-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-60' : 'md:ml-20'}`}>
        <div className='flex items-center gap-3 overflow-x-auto scrollbar-hide pt-2 mt-15 '>
          {categories.map((cat, index) => (
            <button key={index} className='whitespace-nowrap bg-[#272727] px-4 py-1 text-sm hover:bg-gray-700'>{cat}

            </button>
          ))}
        </div>
        <div className='mt-2'>
          <Outlet />

        </div>
        <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
      </main>
      {/* Bottom Nav */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-800 flex justify-around py-2 z-10'>
        <MobileSizeNav icon={<FaHome />} text={"Home"} active={active === "Home"} onClick={() => setActive("Home")} />
        <MobileSizeNav icon={<SiYoutubeshorts />} text={"Shorts"} active={active === "Shorts"} onClick={() => setActive("Shorts")} />
        <MobileSizeNav icon={<IoIosAddCircle />} text={"Create"} active={active === "+"} onClick={() => setActive("+")} />
        <MobileSizeNav icon={<MdOutlineSubscriptions />} text={"Subscriptions"} active={active === "Subscriptions"} onClick={() => setActive("Subscriptions")} />
        <MobileSizeNav icon={userData?.photoUrl ? <img className='w-8 h-8 rounded-full border-2 border-white' src={userData?.photoUrl}></img> : <FaRegUserCircle />} text={"You"} active={active === "You"} onClick={() => setActive("You")} />
      </nav>

    </div>
  )
}
function SidebarItem({ icon, text, open, selected, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 p-2 rounded w-full transition-colors ${open ? 'justify-start' : 'justify-center}'} ${selected ? 'bg-[#272727]' : 'hover:bg-[#272727]'}`}>
      <span className='text-lg'>{icon}</span>
      {open && <span className='text-sm'>{text}</span>}
    </button>

  )
}

function MobileSizeNav({ icon, text, onClick, active }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-300 ${active ? 'text-white' : 'text-gray-400'} hover:scale-105`}>
      <span className='text-2xl'>{icon}</span>
      <span className='text-xs'>{text}</span>
    </button>
  )
}

export default Home