import { Button } from '@mui/material'
import React, { useState } from 'react'
import "./dataTable.scss"
import EnhancedTable from './appTable'

const DataTable = () => {
  const [rows, setRows] = useState([
    {
      id: 0,
      name: "Ramy Mohsen",
      username: "ramy.mohsen",
      email: "ramy.mohsen@gmail.com",
      group: "office",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
    {
      id: 1,
      name: "youssef Ahmad",
      username: "youssef.ahmad",
      email: "youssef.ahmad@gmail.com",
      group: "office",
      status: "Inactive",
      createdOn: "Dec 11, 2022"
    },
    {
      id: 2,
      name: "Fady Adalat",
      username: "fady.adalat",
      email: "fady.adalat@gmail.com",
      group: "managers",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
    {
      id: 3,
      name: "ahmad mohammed",
      username: "ahmad.mohammed",
      email: "ahmad.mohammed@gmail.com",
      group: "office",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
    {
      id: 4,
      name: "Ramy Mohsen",
      username: "ramy.mohsen",
      email: "ramy.mohsen@gmail.com",
      group: "office",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
    {
      id: 5,
      name: "youssef Ahmad",
      username: "youssef.ahmad",
      email: "youssef.ahmad@gmail.com",
      group: "office",
      status: "Inactive",
      createdOn: "Dec 11, 2022"
    },
    {
      id: 6,
      name: "Fady Adalat",
      username: "fady.adalat",
      email: "fady.adalat@gmail.com",
      group: "managers",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
    {
      id: 7,
      name: "ahmad mohammed",
      username: "ahmad.mohammed",
      email: "ahmad.mohammed@gmail.com",
      group: "office",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
    {
      id: 8,
      name: "Ramy Mohsen",
      username: "ramy.mohsen",
      email: "ramy.mohsen@gmail.com",
      group: "office",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
    {
      id: 9,
      name: "youssef Ahmad",
      username: "youssef.ahmad",
      email: "youssef.ahmad@gmail.com",
      group: "office",
      status: "Inactive",
      createdOn: "Dec 11, 2022"
    },
    {
      id: 10,
      name: "Fady Adalat",
      username: "fady.adalat",
      email: "fady.adalat@gmail.com",
      group: "managers",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
    {
      id: 11,
      name: "ahmad mohammed",
      username: "ahmad.mohammed",
      email: "ahmad.mohammed@gmail.com",
      group: "office",
      status: "Locked",
      createdOn: "Dec 10, 2022"
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <div className='dataTable'>
      <div className='dataTable-header'>
        <h3>User Management</h3>
        <Button variant="contained" onClick={() => { setIsAddModalOpen(true) }}>Add New</Button>
      </div>
      <EnhancedTable
        rows={rows}
        isAddModalOpen={isAddModalOpen}
        handleModalClose={() => {
          setIsAddModalOpen(false)
        }}
        setRows = {(newRows)=>{
          setRows(newRows);
        }}
        />
    </div>
  )
}

export default DataTable;