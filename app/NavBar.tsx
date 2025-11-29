import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'>logo</Link>
        <ul className='flex space-x-6 '>
            <li>
                <Link href='/'>Dashboard</Link>
            </li>
            <li>
                <Link href='/Issue'>Issues</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar