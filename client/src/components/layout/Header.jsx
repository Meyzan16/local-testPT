import React from 'react'
import {NavLink} from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
const Header = () => {

  const [auth,setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      user:null,
      token:''
    })
    toast.success('Logout Succesfully');
    localStorage.removeItem('auth');
  }

  return (
    <>
        <div className='container'>      
              <header className='flex w-full h-[80px] leading-[80px] items-center 
              justify-between  '>
                          <div className="flex items-center gap-2">
                              <div className="leading-relaxed">
                                  <h2 className="text-lg text-primary font-[700]">Test App</h2>
                              </div>
                          </div>

                        {/* desktop navigation */}
                        <div className="menu" >
                            <ul className="flex items-center gap-10">
                              {
                                auth.user ? (
                                  <>
                                    <div className='w-10 h-10 bg-gradient-to-r
                                            from-primary to-gray-400
                                                rounded-full flex items-center justify-center 
                                                object-cover overflow-hidden '>
                                                 
                                                <img src={`/api/v1/users/photo-user/${auth?.user?._id}`} 
                                                      alt="user"
                                                      className='object-cover object-center' width={40} />
                                                   
                                    </div>
                                    <NavLink onClick={handleLogout} to='/' className="text-base font-[600] hover:text-primary"  >Logout</NavLink>
                                  </>
                                ):(
                                  <>
                                    
                                    <li><NavLink to="/" className="text-base font-[600] hover:text-primary"  >Login</NavLink></li>
                                  </>

                                )
                              }
                                                               
                                      

                                    


                                  
                            </ul>
                        </div>

          
              </header>
        </div>
    </>
  )
}

export default Header