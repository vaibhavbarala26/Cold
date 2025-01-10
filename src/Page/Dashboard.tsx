import React from 'react'
import Header from '../Component/Header'
import CampaignOverview from '@/Component/CampaignOverview'
import QuickAction from '@/Component/QuickAction'
import CampaignPerformance from '@/Component/CampaignPerformance'
import RecentActivity from '@/Component/RecentActivity'
import ContactInfo from '@/Component/ContactInfo'

const Dashboard = () => {
  return (
    <div className='overflow-x-hidden text-center'><Header></Header>
    <div className='flex flex-col justify-center items-center  '>
      
      <div className='flex md:flex-row flex-col  items-center gap-10 justify-center '>
        <CampaignOverview></CampaignOverview>
        <QuickAction></QuickAction>
      </div>
      <div className='px-14 md:px-96 mt-10'>
      <CampaignPerformance></CampaignPerformance>
      </div>
      <div className='flex md:flex-row  flex-col md:items-start  gap-10 justify-center mt-10 mb-10'>
        <RecentActivity></RecentActivity>
        <ContactInfo></ContactInfo>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
