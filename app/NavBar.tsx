'use client'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";
import classNames from 'classnames';
import  { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';

function NavBar() {
  

  return (
   
    <nav className=' border-b mb-5 px-5 py-3 '>
         <Container>
               <Flex justify='between'>
            <Flex align='center' gap='4'>
  <Link href='/'><AiFillBug  /></Link>
       <NavLink/>
            </Flex>
            <AuthStatus/>
        </Flex>
         </Container>
     
      
      
    </nav>
  )
}

export default NavBar


const NavLink=()=>{
        const links=[
        {label:'Dashboard',href:'/'},
        {label:'Issues',href:'/Issues/list'}
    ]
     const currentPath= usePathname();
      
    return(
           <ul className='flex space-x-6 '>

            {links.map((link)=>
            <li key={link.href}>
            <Link  className={classNames({
                "nav-link":true,
                'text-zinc-900!':link.href===currentPath,
            
            })} href={link.href}>{link.label}</Link>

            </li>)}
        
        </ul>
    )}

const AuthStatus=()=>{
    const {status, data: session}=useSession();
    if(status==='loading')return null;
    if(status==='unauthenticated')
        return <Link className='nav-link' href='/api/auth/signin'>Sign In</Link>;

    return(
        
             <Box>
            
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar src={session!.user!.image!}    fallback="?"
                        size='2'
                        radius='full'
                        className='cursor-pointer'
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>{session!.user!.name}</DropdownMenu.Label>
                        <DropdownMenu.Item>
                            <Link href='/api/auth/signout'>Sign Out</Link>
                        </DropdownMenu.Item>
                </DropdownMenu.Content>
                </DropdownMenu.Root>
        
             
            
        </Box>
    )
}


