import React from 'react'
import ReactDom from 'react-dom'
import Index from 'client/views/index/Index'
import CommonLayout from 'client/views/common/CommonLayout'

ReactDom.render(
  <CommonLayout>
    <Index />
  </CommonLayout>
  ,
  document.getElementById('app')
)