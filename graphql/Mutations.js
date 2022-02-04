// CAR
var addCar = require('./Car/AddCar').AddCar
var updateCar = require('./Car/UpdateCar').UpdateCar
var deleteCar = require('./Car/DeleteCar').DeleteCar

// RENT
var addRent = require('./Rent/AddRent').AddRent
var updateRent = require('./Rent/UpdateRent').UpdateRent
var cancelRent = require('./Rent/UpdateRent').CancelRent

module.exports = {
  addCar,
  updateCar,
  deleteCar,
  addRent,
  updateRent,
  cancelRent
}
