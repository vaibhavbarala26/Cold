import React from 'react'
import Header from '../Component/Header'
import Email from '@/Component/Setting'
import { useUser } from '@/Context/UserContext'
import { ToastProvider } from '@/components/ui/toast'

const Setting = () => {
  const {user} = useUser()
  return (
    <div>
      <Header user={user}></Header>
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
