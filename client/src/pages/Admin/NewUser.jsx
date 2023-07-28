import React from 'react'
import Layout from '../../components/layout/Layout'
import MenuNavbar from '../../components/layout/MenuNavbar'
import FormUser from '../../components/Admin/FormUser'
import { NavLink } from 'react-router-dom'

const NewUser = () => {
  return (
    <Layout>
      <MenuNavbar />
        <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6 my-6
            leading-relaxed text-xl font-bold border-l-4
             border-solid border-teal-500 shadow-lg'>

              <h1 className='text-2xl text-primary pb-4'>Create a new user</h1>

              <NavLink className="btn-delete" to="/admin/users">
                Cancel
              </NavLink>

              
              <FormUser type="create" />

          </div>

    </Layout>
  )
}

export default NewUser
