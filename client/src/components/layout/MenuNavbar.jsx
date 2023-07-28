import React from 'react'
import { Link ,useLocation} from 'react-router-dom'
import { HiUserPlus } from "react-icons/hi2";
import { HiHome } from "react-icons/hi2";
import { useAuth } from '../../context/Auth';
import { FaClipboardCheck } from "react-icons/fa";
import { FaKey } from "react-icons/fa";



const MenuNavbar = () => {
  const [auth] = useAuth();

  const {pathname} = useLocation()
  let subpage = pathname.split('/')?.[2];
  // console.log(subpage);


  if(subpage === undefined){
      subpage = 'admin'; 
  }

  function linkClasses(type=null){    
   let clasess ='flex py-1 px-2 sm:p-3  items-center  bg-gray-500 rounded-2xl text-white gap-2';
   if(type === subpage){
     clasess += ' bg-primary text-white';
   }else{
     clasess += ' bg-gray-500'
   }
   return clasess;
 }
  const Dashboard = auth?.user?.role === 1 ? '/admin' : '/user';
  

  return (            
            <nav className="flex gap-2 overflow-y-auto text-sm sm:text-base lg:text-lg">


                  <Link to={Dashboard} className={linkClasses('admin')}>
                    <HiHome />
                    Dashborad
                  </Link>

                  {
                    auth?.user?.role === 1 ? (
                      <>
                          <Link to="/admin/users" className={linkClasses('users')}>
                            <HiUserPlus/>
                            User
                          </Link>

                          <Link to="/admin/log-checkin" className={linkClasses('log-checkin')}>
                            <FaClipboardCheck/>
                            Log CheckIn
                          </Link>
                          <Link to="/admin/log-checkout" className={linkClasses('log-checkout')}>
                            <FaClipboardCheck/>
                            Log CheckOut
                          </Link>
                      </>
                    ):(
                      <>
                          <Link to="/user/absen" className={linkClasses('absen')}>
                            <FaClipboardCheck className='text-xl'/>
                            Absen
                          </Link>

                          <Link to="/user/password" className={linkClasses('password')}>
                            <FaKey className='text-xl'/>
                            Password
                          </Link>

                          <Link to="/user/log-history" className={linkClasses('log-history')}>
                            <FaClipboardCheck className='text-xl'/>
                            History absen
                          </Link>

                      </>
                    )
                  }
                

            </nav>
  )
}

export default MenuNavbar
