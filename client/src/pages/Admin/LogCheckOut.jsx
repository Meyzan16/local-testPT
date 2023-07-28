import React from 'react'
import Layout from '../../components/layout/Layout'
import MenuNavbar from '../../components/layout/MenuNavbar'
import Datalog from '../../components/Admin/Datalog'

const LogCheckOut = () => {
  return (
    <Layout>
        <MenuNavbar />
            <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6 my-6
                leading-relaxed text-xl font-bold border-l-4
                border-solid border-teal-500 shadow-lg mt-6'>
                <h1 className='text-2xl text-primary'>Log absensi checkout</h1>
            <Datalog type="checkout" />
            </div>

    </Layout>
  )
}

export default LogCheckOut
