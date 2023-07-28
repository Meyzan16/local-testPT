import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import FormUser from './FormUser';
import Modal from '../Modal';

const Users = () => {
  const [users,setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  //selected edit modal
  const[id, setId] = useState('');

  //pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);

  const npage = Math.ceil(users.length / recordsPerPage)
  const numbers = [...Array(npage+1).keys()].slice(1)

   //get all categories
   const getAllUsers = async () => {
    try {
      const {data} = await axios.get('/api/v1/users/get-user');
      if(data?.success){
        setUsers(data?.userDoc);
    }
      } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting users')
    }
  }


  useEffect(()=> {
    getAllUsers();
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

  const handleDelete = async (id) => {
    try{
      const {data} = await axios.delete(`/api/v1/users/delete-user/${id}`,)
      if(data?.success){
        toast.success(data.message);
        getAllUsers();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went error delete");
    }
  }


  return (
    <>
              <NavLink className='btn-submit' to="/admin/users/new" >
                  New User
              </NavLink>

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
                        <th scope="col">
                            phone
                        </th>
                        <th scope="col">
                          Action
                        </th>
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
                                                 
                                                <img src={`/api/v1/users/photo-user/${item._id}`} 
                                                      alt="user"
                                                      className='object-cover object-center' width={40} />
                                                   
                                            </div>
                                        </td>

                                        <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                          {item.name}
                                        </td>
                                        <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                          {item.email}
                                        </td>
                                        <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                          {item.posisi}
                                        </td>
                                        <td  className="font-medium text-gray-900 whitespace-nowrap ">
                                          {item.phone}
                                        </td>

                                        <td>
                                        <button className='btn-edit' onClick={() => 
                                          {
                                            setIsOpen(true); 
                                            setId(item._id);
                                          }}
                                          >
                                            edit
                                        </button>

                                        <button className='btn-delete' onClick={()=> handleDelete(item._id)}>
                                            delete
                                        </button>
                                        </td>
                                      
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

              {isOpen && 
                <Modal setIsOpen={setIsOpen}>
                  <h3 className='modal-head-text'> Edit a users </h3>
                  <FormUser id={id} type="edit" getAllUsers={getAllUsers} />
                </Modal>
              }
             

    </>

  )
}

export default Users
