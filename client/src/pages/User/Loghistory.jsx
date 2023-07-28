import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import MenuNavbar from '../../components/layout/MenuNavbar'
import {DatePicker} from 'antd';
import moment from 'moment';
import { toast } from 'react-hot-toast';

const {RangePicker} = DatePicker;

const Loghistory = () => {
    const [disable, setDisable]= useState(true);
  const [todate, setTodate]= useState([]);
  const [fromdate, setFromdate]= useState([]);

  const [todateformat, setTodateformat]= useState('');
  const [fromdateformat, setFromdateformat]= useState('');

  const handletodate= (e)=>{
    const gettodatevalue= e.target.value;
    const setdateformat= gettodatevalue.split('-');
    const settoyear= setdateformat[0];
    const settomonth= setdateformat[1];
    const settodate= setdateformat[2];
    const settodateformat= settoyear+""+settomonth+""+settodate;
    setTodate(gettodatevalue);
    setTodateformat(settodateformat);
    setDisable(false);
    console.log(settodateformat);

 }

 const handlefromdate= (e)=>{
    const getfromdatevalue= e.target.value;
    const setfromformat= getfromdatevalue.split("-");
    const setfromyear= setfromformat[0];
    const setfrommonth= setfromformat[1];
    const setfromdate= setfromformat[2];
    const setfromformatdate= setfromyear+""+setfrommonth+""+setfromdate;   
    setFromdate(getfromdatevalue);
    setFromdateformat(setfromformatdate);
   console.log(setfromformatdate);

 }
 const handleSubmit= (e)=>{
    e.preventDefault();

    if(todateformat > fromdateformat )
    {
      toast.error("please valid selected date format");
    } else  {
      toast.success("the feature is still under development from the backend side");
    }

 }

  

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



  return (
    <Layout>
    <MenuNavbar />
            <div className='bg-gray-100 flex-grow  rounded-lg px-4 py-6 my-6
            leading-relaxed text-xl font-bold border-l-4
             border-solid border-teal-500 shadow-lg'>
              
                <h1 className='text-2xl text-primary pb-4'>
                    Log history absen
                </h1>

            <form onSubmit={ handleSubmit}>
                <div className='flex items-center justify-center gap-4'>
                  <div className='w-full'>
                    {preInput('From date', 'select from date')}
                    <input type="date" className='form_field-input' value={todate} placeholder="dd-mm-yyyy" onChange={(e)=>handletodate(e)} />
                  </div>
              
                  <div className='w-full'>
                    {preInput('To Date', 'select to date')}
                    <input type="date" className='form_field-input' value={fromdate} placeholder="dd-mm-yyyy" disabled={disable}  onChange={(e)=>handlefromdate(e)}/>
                  </div>

                </div>

                  <div className='w-full mt-4'>
                    <button className='btn-submit'> submit </button>
                  </div>
            </form>
                

                
            </div>
    </Layout>
  )
}

export default Loghistory
