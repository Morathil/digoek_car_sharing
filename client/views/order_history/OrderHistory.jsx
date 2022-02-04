import React from 'react'
import { GET_ALL_RENTS } from 'client/graphql/queries'
import { useQuery } from "@apollo/client"
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

function RentListAll (props) {
  const accountId = localStorage.getItem('accountId')
  const { loading, error, data } = useQuery(GET_ALL_RENTS, {
    variables: { accountId: accountId}
  })
  //console.log(data)
  if (loading || error) {
    return null
  }
  const columns = [
    { field: 'carId', headerName: 'CarID' },
    { field: 'days', headerName: 'Days' },
    { field: 'price', headerName: 'Price' },
    { field: 'startedAt', headerName: 'Start' }
  ]

  const rows = data.rentsFilteredAll

  return (
    <Grid container style={{ height: '400px' }}>
      <Grid item xs={12}>
        <DataGrid rows={rows} columns={columns} checkboxSelection={false} autoPageSize disableSelectionOnClick />
      </Grid>
    </Grid>
  )
}

export default RentListAll
