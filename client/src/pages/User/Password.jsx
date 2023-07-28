import React from 'react'
import Layout from '../../components/layout/Layout'
import MenuNavbar from '../../components/layout/MenuNavbar'
import { useState } from 'react'
import { useAuth } from '../../context/Auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom';


const Password = () => {
    const [auth,setAuth]  = useAuth();
    const navigate = useNavigate();

    const [passwordOld, setpasswordOld] = useState("")
    const [passwordNew, setpasswordNew] = useState("")
    const [email] = useState(auth?.user?.email)

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
        try {
            const res = await axios.post('/api/v1/users/update-password',{
              email,passwordOld,passwordNew
            });

            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    user:null,
                    token:''
                  })
                localStorage.removeItem('auth');
                navigate('/');
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went error')
        }
    }

  return (
    <Layout>
      <MenuNavbar />
      <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6 my-6
            leading-relaxed text-xl font-bold border-l-4
             border-solid border-teal-500 shadow-lg'>
              
            <h1 className='text-2xl text-primary pb-4'>
                  Edit Password
            </h1>
        
            <form onSubmit={handleSubmit} className="flexStart form">
                <div className='w-full'>
                    {preInput('Password old', 'create a password old')}
                    <input type="text" className='form_field-input' placeholder='Password Old' value={passwordOld} onChange={(e) => setpasswordOld(e.target.value)} />
                </div>
                
                <div className='w-full'>
                    {preInput('Password new', 'create a new password')}
                    <input type="password" className='form_field-input' placeholder='Password New' value={passwordNew} onChange={(e) => setpasswordNew(e.target.value)} />
                </div>

                <div className='my-4'>
                    <button className='btn-submit'>update</button>
                </div>
            </form>

            
        </div>
    </Layout>
  )
}

export default Password
