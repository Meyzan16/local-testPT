import React from 'react'
import Layout from '../../components/layout/Layout'
import MenuNavbar from '../../components/layout/MenuNavbar'
import Datalog from '../../components/Admin/Datalog'

const LogCheckIn = () => {
  return (
    <Layout>
        <MenuNavbar />
            <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6 my-6
                leading-relaxed text-xl font-bold border-l-4
                border-solid border-teal-500 shadow-lg mt-6'>
                <h1 className='text-2xl text-primary'>Log absensi checkin</h1>
                <Datalog type="checkin" />
            </div>

    </Layout>
  )
}

export default LogCheckIn
