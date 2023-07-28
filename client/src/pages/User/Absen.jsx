import React from 'react'
import Layout from '../../components/layout/Layout'
import MenuNavbar from '../../components/layout/MenuNavbar'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Absen = () => {
  const date = new Date();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [userId] = useState(auth?.user?._id);
  const [checkIn] = useState(Date.now());
  const [checkOut] = useState(Date.now());
  const [message,setmessage] = useState("");
  const [status,setstatus] = useState("");


  
  const handleAbsen = async () => {
        const jam = date.getHours()
        // const jam = 15;

        if(jam >= 7 && jam <= 17)
        {
              if(jam >= 8 && jam < 12) 
              {
                try {
                  const {data} = await axios.post('/api/v1/absen/check-in', {
                    userId,checkIn
                  });
                  
                  if(data?.success){
                    toast.success(data?.message)
                    setstatus(data?.success);
                    setmessage(data?.message)
                    navigate('/user/absen')
                  }else{
                    toast.error(data?.message);
                  }
              
                } catch (error) {
                    console.log(error);
                    toast.error("error checkin absensi");
                }

              }

              if(jam >= 12 && jam <= 17) {
                try {
                  const {data} = await axios.post('/api/v1/absen/check-out', {
                    userId,checkOut
                  });
                  
                  if(data?.success){
                    toast.success(data?.message)
                    setstatus(data?.success);
                    setmessage(data?.message)
                    navigate('/user/absen')
                  }else{
                    toast.error(data?.message);
                  }
              
                } catch (error) {
                    console.log(error);
                    toast.error("error checkout absensi");
                }
              }
        } else {
          toast.error("Time is not valid for absensi");
        } 
  }

 


  return (
    <Layout>
        <MenuNavbar />
        <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6 my-6
            leading-relaxed text-xl font-bold border-l-4
             border-solid border-teal-500 shadow-lg'>
              
              <h1 className='text-2xl text-primary pb-4'>
                  Absen
                </h1>
              <div>

                {
                  !status ? (
                    <div className='p-8 rounded-3xl bg-red-600 text-center leading-normal mb-4'>
                        <span className='lg:text-xl text-base md:text-lg xl:text-2xl text-white '>
                          !!! {" "}
                        <span className='text-white pr-2'>
                            Salam hormat
                        </span>
                            <span className='underline pr-2 '>
                              {auth?.user?.name}
                            </span> 
                            Silahkan lakukan absensi anda
                        </span>
                    </div>
                  ):(
                    <div className='p-8 rounded-3xl bg-primary text-center leading-normal mb-4'>
                        <span className='lg:text-xl text-base md:text-lg xl:text-2xl text-white '>
                          !!! {" "}
                        <span className='text-white pr-2'>
                            Terima kasih
                        </span>
                            <span className='underline pr-2 '>
                              {auth?.user?.name}
                            </span> 
                            {message}
                        </span>
                    </div>

                  )
                }

                <div className='flex justify-center items-center' onClick={handleAbsen}>
                  <button className='btn-submit' >
                      KLIK TO ABSEN
                  </button> 
                </div>

              </div>
        </div>
    </Layout>
  )
}

export default Absen
