import React from 'react'
import ReactDom from 'react-dom'
import OrderHistory from 'client/views/order_history/OrderHistory'
import CommonLayout from 'client/views/common/CommonLayout'

ReactDom.render(
  <CommonLayout>
    <OrderHistory />
  </CommonLayout>
  ,
  document.getElementById('order_history')
)
