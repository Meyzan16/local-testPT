import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Datalog = ({type}) => {
    const [logdata, setData] = useState([]);
    const date = new Date();
    const arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = logdata.slice(firstIndex, lastIndex);

  const npage = Math.ceil(logdata.length / recordsPerPage)
  const numbers = [...Array(npage+1).keys()].slice(1)

  const getAllLog = async () => {
    if(type === 'checkin')
    {
        try {
          const {data} = await axios.get('/api/v1/absen/get-checkin');
          if(data?.success){
            setData(data?.checkIn);
        }
          } catch (error) {
          console.log(error)
          toast.error('Something went wrong in getting checkin')
        }
    }

    if(type === 'checkout')
    {
        try {
          const {data} = await axios.get('/api/v1/absen/get-checkout');
          if(data?.success){
            setData(data?.checkOut);
        }
          } catch (error) {
          console.log(error)
          toast.error('Something went wrong in getting checkout')
        }
    }


  }

  useEffect(()=> {
    getAllLog();
  }, []);

  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }

  function nextPage () {
    if(currentPage !== npage){
        setCurrentPage(currentPage + 1);
    }
  }

  if (!records) return (
    toast.error("Not found at data")
  )



  return (
    <>
                         {
                            records?.length > 0 ? (
                              
                              <>
                             
                                <div className=" overflow-x-auto shadow-md sm:rounded-lg  mt-4">
                                      <table className="basic">
                                        <thead>
                                          <tr>
                                            <th scope="col">
                                                Photo
                                            </th>
                                            <th scope="col">
                                                name
                                            </th>
                                            <th scope="col">
                                                email
                                            </th>
                                            <th scope="col">
                                                posisi
                                            </th>

                                            {
                                                type === 'checkin' ? (
                                                    <th scope="col">
                                                        tanggal checkin
                                                    </th>
                                                ):(
                                                    <th scope="col">
                                                        tanggal checkout
                                                    </th>
                                                )
                                            }
                                            
                                          </tr>
                                        </thead>

                                        <tbody>

                                            {
                                                  records?.map((item) => 
                                                      <tr key={item._id}>
                                                            
                        
                                                            <td scope="row" className="px-6 py-4">
                                                                  <div className='w-10 h-10 bg-gradient-to-r
                                                                  from-primary to-gray-400
                                                                      rounded-full flex items-center justify-center 
                                                                      object-cover overflow-hidden '>
                                                                      
                                                                      <img src={`/api/v1/users/photo-user/${item.user._id}`} 
                                                                            alt="user"
                                                                            className='object-cover object-center' width={40} />
                                                                        
                                                                  </div>
                                                              </td>
                        
                                                              <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                                                {item.user.name}
                                                              </td>
                                                              <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                                                {item.user.email}
                                                              </td>
                                                              <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                                                {item.user.posisi}
                                                              </td>
                        
                                                              {
                                                                  
                        
                                                                type === 'checkin' ? (
                                                                      <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                                                          {item.checkIn}
                                                                      {/* { date.getDate(item.checkIn)} {arrbulan[date.getMonth(item.checkIn)]} {date.getFullYear(item.checkIn)} {" "}
                                                                      {date.getHours(item.checkIn)}:{date.getMinutes(item.checkIn)}:{date.getSeconds(item.checkIn)} */}
                                                                      </td>
                                                                ) : (
                                                                      <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                                                      {item.checkOut}
                                                                      </td>
                        
                                                                )
                                                              }
                                                              
                        
                                                            
                                                            
                                                      </tr>
                                                  )
                                              
                                            }
                                          
                                        </tbody>
                                      </table>
                                  </div>

                                  <nav className='mt-8'>
                                          <ul className="inline-flex -space-x-px text-sm">
                                            <li>
                                              <div  className="flex items-center justify-center px-3 h-8 ml-0 
                                              leading-tight text-gray-500 bg-white border border-gray-300 
                                              rounded-l-lg cursor-pointer" onClick={prePage}>Previous</div>
                                            </li>
                                            {
                                              numbers.map((n,i) => (
                                                <li key={i}>
                                                  <div  className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300   ${currentPage === n ? 'bg-blue-600 text-white' : ''} `}
                                                  onClick={() => changeCPage(n)}> {n} </div>
                                                </li>
                                              ))
                                            }
                                          
                                            <li>
                                              <div className="cursor-pointer flex items-center justify-center px-3 h-8 
                                              leading-tight text-gray-500 bg-white border border-gray-300 
                                              rounded-r-lg" onClick={nextPage} >
                                                Next
                                              </div>
                                            </li>

                                          </ul>
                                  </nav>
                                </>
                            ):(
                            <div className='flex items-center justify-center mt-4 bg-primary p-4 rounded-3xl'>
                              <span className=' text-lg md:text-2xl text-center text-white '>
                                Not found in data
                              </span>
                            </div>
                            )
}
    </>
  )
}

export default Datalog
