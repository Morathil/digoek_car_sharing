import React from 'react'
import { GET_ACTIVE_RENTS } from 'client/graphql/queries'
import { CANCLE_RENT } from 'client/graphql/mutations'
import { useQuery, useMutation } from "@apollo/client"
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

function RentList (props) {
  const accountId = localStorage.getItem('accountId')
  const { loading, error, data } = useQuery(GET_ACTIVE_RENTS, {
    variables: { accountId: accountId}
  })
  const [cancelRent, cancelRentOpts] = useMutation(CANCLE_RENT);

  function cancelRentTest (id) {
    cancelRent({ variables: { id: id } })
    location.href = '/active_rents.html'
  }

  if (loading || error) {
    return null
  }
  const columns = [
    { field: 'carId', headerName: 'CarID' },
    { field: 'days', headerName: 'Days' },
    { field: 'price', headerName: 'Price' },
    { field: 'startedAt', headerName: 'Start' },
    { field: 'canceled', headerName: 'Canceled' },
    { field: 'id', headerName: 'Rent', renderCell: (params) => (
      <Grid container justifyContent='center' alignItems='center'>
        <Button variant="text" onClick={() => {
          cancelRentTest(params.value)
        }}>Cancel</Button>
      </Grid>
     ) }
  ]

  const rows = data.rentsFiltered

  return (
    <Grid container style={{ height: '400px' }}>
      <Grid item xs={12}>
        <DataGrid rows={rows} columns={columns} checkboxSelection={false} autoPageSize disableSelectionOnClick />
      </Grid>
    </Grid>
  )
}

export default RentList
