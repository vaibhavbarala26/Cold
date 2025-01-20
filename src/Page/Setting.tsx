import React from 'react'
import Header from '../Component/Header'
import Email from '@/Component/Setting'

import { ToastProvider } from '@/components/ui/toast'

const Setting = () => {
  
  return (
    <div>
      <Header></Header>
      <div>
        <div>
          <ToastProvider>
          <Email></Email>
          </ToastProvider>
        </div>
      </div>
    </div>
  )
}

export default Setting
