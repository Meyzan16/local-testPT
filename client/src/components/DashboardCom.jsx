import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import FormUser from './User/FormUser';
import axios from 'axios';


const DashboardCom = ({datauser}) => {
  const [isOpen, setIsOpen] = useState(false);
  const[id, setId] = useState('');

  const [name,setname] = useState("");
  const [email,setemail] = useState("");
  const [posisi,setposisi] = useState("");
  const [phone,setphone] = useState("");



    const getSingleUser = async () => {
      const {data} = await axios.get(`/api/v1/users/get-user/${datauser?._id}`)
      setId(data?.userDoc?._id);
      setname(data?.userDoc?.name)
      setemail(data?.userDoc?.email)
      setposisi(data?.userDoc?.posisi)
      setphone(data?.userDoc?.phone)
    }

    useEffect(()=>{
      if(!datauser?._id){return} getSingleUser();
    }, [datauser?._id]);


  return (
    <>
              <button className='btn-submit' onClick={() => 
                                          {
                                            setIsOpen(true); 
                                            setId(datauser?._id);
                                          }}>
                        edit profile
              </button>


              <div className='md:flex gap-12 block items-center mt-6'>
                <div>
                  <img src={`/api/v1/users/photo-user/${id}`}  alt=""
                    className='w-100 h-100 md:w-60  lg:w-72 overflow-hidden object-center rounded-2xl'
                  />
                </div>

                <div className='mt-6 w-full  text-base font-normal'>
                      <div className='md:flex items-center mb-6 '>

                        <div className='md:w-1/5 text-lg md:mr-6 mb-2'>
                          nama
                        </div>

                        <div className='md:w-4/5 w-full bg-gray-100 px-4 py-2 rounded-xl border-l-2 border-l-primary shadow-md'>
                          {name}
                        </div>
                      </div>

                      <div className='md:flex items-center mb-6 '>

                        <div className='md:w-1/5 text-lg md:mr-6 mb-2'>
                          email
                        </div>

                        <div className='md:w-4/5 w-full bg-gray-100 px-4 py-2 rounded-xl border-l-2 border-l-primary shadow-md'>
                          {email}
                        </div>
                      </div>

                      <div className='md:flex items-center mb-6 '>

                        <div className='md:w-1/5 text-lg md:mr-6 mb-2'>
                          contact
                        </div>

                        <div className='md:w-4/5 w-full bg-gray-100 px-4 py-2 rounded-xl border-l-2 border-l-primary shadow-md'>
                          {phone}
                        </div>
                      </div>

                      <div className='md:flex items-center mb-6 '>

                        <div className='md:w-1/5 text-lg md:mr-6 mb-2'>
                          posisi
                        </div>

                        <div className='md:w-4/5 w-full bg-gray-100 px-4 py-2 rounded-xl border-l-2 border-l-primary shadow-md'>
                          {posisi}
                        </div>
                      </div>
                </div>
              </div>

              {isOpen && 
                <Modal setIsOpen={setIsOpen}>
                  <h3 className='modal-head-text'> Edit a users </h3>
                  <FormUser id={id} type="edit" getSingleUser={getSingleUser}/>
                </Modal>
              }
    </>
  )
}

export default DashboardCom
