import React from 'react'
import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'
import Orders from './Orders'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <div className='w-full  flex items-start'>
      <Pagination/>
      <Orders/>
      </div>
    </div>
  )
}

export default Dashboard
