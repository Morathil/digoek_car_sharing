import React from 'react'
import ReactDom from 'react-dom'
import RentCar from 'client/views/rent_car/RentCar'
import CommonLayout from 'client/views/common/CommonLayout'

ReactDom.render(
  <CommonLayout>
    <RentCar />
  </CommonLayout>
  ,
  document.getElementById('car_sharing')
)