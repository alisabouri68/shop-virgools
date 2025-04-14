import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import virgool from '../../../public/img/virgool.png'
import logo from '../../../public/img/logo.png'
function LeftHeader() {
  return (
    <div className=" grow bg-background">
        <Link href='/' className='flex items-center justify-end gap-2  h-full'>
        <h1 className='text-amber-500 font-semibold hidden md:flex'>فروشگاه آنلاین لوازم تحریر و کتاب </h1>
        <Image
        src={virgool}
        width={60}
        height={60}
        alt='logo'
        priority={true}
        quality={1}
        />
        <Image
        src={logo}
        width={60}
        height={60}
        alt='logo'
        priority={true}
        quality={1}
        />
        
        </Link>
    </div>
  )
}

export default LeftHeader