import React from 'react'
import { GET_AVAILABLE_CARS } from 'client/graphql/queries'
import { UPDATE_CAR } from 'client/graphql/mutations'
import { useQuery, useMutation } from "@apollo/client"
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

function CarList (props) {
  const { onRent, cars, days } = props
  const columns = [
    { field: 'doors', headerName: 'Doors' },
    { field: 'seats', headerName: 'Seats' },
    { field: 'availability', headerName: 'Availability' },
    { field: 'manufacturer', headerName: 'Manufacturer' },
    { field: 'owner', headerName: 'Owner' },
    { field: 'location', headerName: 'Location' },
    { field: 'pricePerDay', headerName: 'Price per day' },
    { field: 'price', headerName: 'Price' },
    { field: 'id', headerName: 'Rent', renderCell: (params) => (
      <Grid container justifyContent='center' alignItems='center'>
        <Button variant="text" onClick={() => {
          onRent(params.value, params.row.pricePerDay)
        }}>Rent</Button>
      </Grid>
     ) }
  ]

  const rows = cars.map((car) => {
    return Object.assign({}, car, {
      price: car.pricePerDay * days
    })
  })
  return (
    <Grid container style={{ height: '400px' }}>
      <Grid item xs={12}>
        <DataGrid rows={rows} columns={columns} checkboxSelection={false} autoPageSize disableSelectionOnClick />
      </Grid>
    </Grid>
  )
}

export default CarList
