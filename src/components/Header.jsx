import { useState } from "react"

const Header = ({ToggleModalForAdding, setSearchTerm}) => {


  return (
    <>

    <header className='w-full pt-2 px-2'>
        <div className='w-full  flex items-center justify-between'>
          {/* Left Side */}
                <form action="" className='flex items-center gap-3'>
                    <label htmlFor="Show">Show</label>
                    <input type="number" name="number" id="NumberInput" className='bg-zinc-200 p-1 w-12 rounded-lg ' placeholder='10'  />
                    <label htmlFor="entries">Entries</label>
                    <input type="search" name="Search"  className='bg-zinc-200 p-1 px-2 w-28  rounded-lg'id="SearchInput"  onChange={(e) => setSearchTerm(e.target.value)} placeholder="search"/>
                </form>

    {/* Right Side */}
        <button className='border-2 rounded-2xl bg-violet-600 text-white text-[2vw] lg:text-[1.2vw] p-1 lg:p-2' onClick={ToggleModalForAdding}>+ Add Customer</button>

        </div>
      </header>
    </>
  )
}

export default Header