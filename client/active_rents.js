import React from 'react'
import ReactDom from 'react-dom'
import ActiveRents from 'client/views/active_rents/ActiveRents'
import CommonLayout from 'client/views/common/CommonLayout'

ReactDom.render(
  <CommonLayout>
    <ActiveRents />
  </CommonLayout>
  ,
  document.getElementById('active_rents')
)
