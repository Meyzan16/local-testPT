import React from 'react'
import { useState,useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const FormUser = ({id, type, getSingleUser}) => {

      const [name,setname] = useState("");
      const [email,setemail] = useState("");
      const [posisi,setposisi] = useState("");
      const [phone,setphone] = useState("");
      const [photo,setphoto] = useState("");

      const getSingleUserForm = async () => {
        const {data} = await axios.get(`/api/v1/users/get-user/${id}`)
        setphoto(data?.userDoc?.photo)
        setname(data?.userDoc?.name)
        setemail(data?.userDoc?.email)
        setposisi(data?.userDoc?.posisi)
        setphone(data?.userDoc?.phone)
      }
  
      useEffect(()=>{
        if(!id){return} getSingleUserForm();
      }, [id]);


      const inputHeader = (text) => {
        return (
            <h2 className='text-lg mt-1 font-[500]'>{text}</h2>
        )
      } 
  
      const inputDescription = (text) => {
          return (
              <p className='text-gray-500 font-[600] text-sm leading-relaxed mb-2'>
                  {text}
              </p>
          )
      } 
  
      const preInput = (header,description) => {
          return (
              <div>
                  {inputHeader(header)}
                  {inputDescription(description)}
              </div>
          );
      } 

      const handleSubmit = async (ev) => {
          ev.preventDefault();
          const productData = new FormData();
          productData.append("name", name);
          productData.append("email", email);
          productData.append("posisi", posisi);
          productData.append("phone", phone);
          
          photo && productData.append("photo", photo);
          
          
        try{
             
              const {data} = await axios.put(`/api/v1/users/update-user/${id}`, productData);
    
              if(data?.success){
                toast.success(data?.message)
                getSingleUser();
              }else{
                toast.error(data?.message);
              }
         
        }catch(error){
          console.log(error)
          toast.error("semething went error handle submit ")
        }
  
      }
  

  return (
    <>
        <form onSubmit={handleSubmit} className="flexStart form">
                <div className='w-full'>
                    {preInput('Photo', 'upload a new photo')}
                    <label className='block w-full border-2 px-2 py-1.5 text-secondary
                            shadow-sm ring-inset ring-primary placeholder:text-gray-400
                            sm:text-sm sm:leading-6 rounded-2xl border-primary
                            focus:outline-none focus:border-primary focus:ring-primary focus:ring-1'>
                          {photo ? photo.name : "Upload photo" } 
                            <input type="file" className='hidden' name='photo' accept='image/*' onChange={(e)=> setphoto(e.target.files[0])} />
                    </label>
                </div>

                  <div> 
                      {
                        photo ? (
                          <div className='mb-3 flex h-40 justify-center relative'> 
                            <img src={URL.createObjectURL(photo)} alt="user_photo" height={"200px"} className="rounded-2xl object-cover" />
                          </div>
                        ):(
                          <div className='mb-3 flex h-40 justify-center relative'> 
                            <img src={`/api/v1/users/photo-user/${id}`} alt="user_photo" 
                            height={"200px"} className="rounded-2xl object-cover" />
                          </div>
  
                        )
                      }
                  </div>

          
              <div className='w-full'>
                  {preInput('Name', 'create a new name')}
                <input type="text" className='form_field-input' placeholder='Name' value={name} onChange={(e) => setname(e.target.value)} />
              </div>
              
              <div className='w-full'>
                  {preInput('Email', 'create a new email, unique at email')}
                <input type="text" className='form_field-input' placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} />
              </div>
              

              <div className='w-full'>
                  {preInput('Posisi', 'create a new posisi')}
                <input type="text" className='form_field-input' placeholder='Posisi' value={posisi} onChange={(e) => setposisi(e.target.value)} />
              </div>

              <div className='w-full'>
                  {preInput('Phone', 'create a new phone')}
                <input type="text" className='form_field-input' placeholder='Phone' value={phone} onChange={(e) => setphone(e.target.value)} />
              </div>

              <div className='my-4'>
                  <button className='btn-submit'>{type}</button>
              </div>
        </form>
    </> 
  )
}

export default FormUser
