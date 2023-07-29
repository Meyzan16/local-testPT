import React from 'react'
import Layout from '../../components/layout/Layout';
import MenuNavbar from '../../components/layout/MenuNavbar';
import axios from 'axios'
import { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/Auth'
import DashboardCom from '../../components/DashboardCom';

const Dashboard = () => {
  const [auth] = useAuth();
  const [getuser,setUsers] = useState([]);

  const getUserSingle = async () =>{
    try {
        const {data} = await axios.get(`/api/v1/users/get-user/${auth?.user?._id}`)
        setUsers(data?.userDoc)
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
    }
  }

  useEffect(() => {
     getUserSingle();
  },[])

  return (
    <Layout title={'Dashboard - Admin'}>
          <MenuNavbar />

          <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6 my-6
            leading-relaxed text-xl font-bold border-l-4
             border-solid border-teal-500 shadow-lg mt-6'>
              <h1 className='text-2xl text-primary'>Admin dashboard</h1>

              <DashboardCom datauser={getuser} type="admin" />

          </div>

    </Layout>
  )
}

export default Dashboard
