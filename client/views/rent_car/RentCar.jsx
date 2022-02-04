import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import { GET_AVAILABLE_CARS } from 'client/graphql/queries'
import { UPDATE_CAR, ADD_RENT } from 'client/graphql/mutations'
import { useQuery, useMutation } from "@apollo/client"
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CarList from 'client/views/rent_car/CarList'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';

function handleGoBack () {
  location.href = 'index.html'
}

function App () {
  const [location, setLocation] = React.useState('');
  const [rentTimeFrom, setRentTimeFrom] = React.useState(new Date());
  const [rentTimeTo, setRentTimeTo] = React.useState(new Date());
  const accountId = localStorage.getItem('accountId')
  const { loading, error, data } = useQuery(GET_AVAILABLE_CARS, {
    variables: { location, availability: true }
  })

  const [updateCar, updateCarOpts] = useMutation(UPDATE_CAR);
  const [addRent, addRentOpts] = useMutation(ADD_RENT);

  const days = Math.round((rentTimeTo - rentTimeFrom) / 1000 / 60 / 60 / 24) + 1

  function onRent (carId, pricePerDay) {
    const price = days * pricePerDay
    updateCar({ variables: { id: carId, availability: false }})
    addRent({ variables: { days: days, carId: carId, accountId: accountId, price: price } })
  }

  if (updateCarOpts && updateCarOpts.data && addRentOpts && addRentOpts.data) {
    return (
      <div>
        <Typography variant='h6'>Rent successfull. Have fun!</Typography>
        <Typography variant='body2'>Manufacturer: {updateCarOpts.data.updateCar.manufacturer}</Typography>
        <Typography variant='body2'>Owner: {updateCarOpts.data.updateCar.owner}</Typography>
        <Typography variant='body2'>Days: {addRentOpts.data.addRent.days}</Typography>
        <Typography variant='body2'>Price: {addRentOpts.data.addRent.price}</Typography>
        <Button onClick={handleGoBack}>Go Back</Button>
      </div>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Rent a Car</Typography>
        <Typography variant="body2">Select your location and the rent duration:</Typography>
      </Grid>
      <Grid item xs={12}>
        <form noValidate autoComplete='off'>
          <TextField onChange={(event) => setLocation(event.target.value)} id='location' label='Location' value={location} margin='dense' size='small' />
        </form>
      </Grid>
      <Grid item xs={6} md={3} lg={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            clearable
            label="Rent time from"
            value={rentTimeFrom}
            onChange={setRentTimeFrom}
            disabled
            renderInput={(params) => <TextField {...params} margin='dense' size='small' fullWidth />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6} md={3} lg={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            clearable
            label="Rent time to"
            value={rentTimeTo}
            onChange={setRentTimeTo}
            renderInput={(params) => <TextField {...params} margin='dense' size='small' fullWidth />}
          />
        </LocalizationProvider>
      </Grid>
      {(loading || error || data.carsFiltered.length === 0) ? null : (
        <CarList cars={data.carsFiltered} onRent={onRent} days={days} />
      )}
    </Grid>
  )
}

export default App
