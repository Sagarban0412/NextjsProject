import React from 'react'
import Table from './Table'

const AllTables = () => {
    const tables = [
        {
            id: 1,
            tableName: "Table 1",
            status: "Available",
            src:"/images/table1.jpg"
        },
        {
            id: 2,
            tableName: "Table 2",
            status: "Booked",
            src:"/images/table2.jpg "
        },
        {
            id: 3,
            tableName: "Table 3",
            status: "Available",
            src:"/images/table1.jpg"
        },
        {
            id: 4,
            tableName: "Table 4",
            status: "Occupied",
            src:"/images/table2.jpg"
        },
        {
            id: 5,
            tableName: "Table 5",
            status: "Available",
            src:"/images/table1.jpg"
        },
        {
            id: 6,
            tableName: "Vip Table",
            status: "Occupied",
            src:"/images/vip table.jpg"
        },
    ]
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
            tables.map((table)=>(
                <div key={table.id}>
                    <Table name={table.tableName } src={table.src} status={table.status} />
                </div>
            ))
        }
    </div>
  )
}

export default AllTables