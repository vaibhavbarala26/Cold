//import { button } from '@/components/ui/button'
import React from 'react'

const QuickAction = () => {
  return (
    <div className='shadow-lg bg-white p-2 w-[80vw] md:w-[20vw] rounded-lg'>
      <div className='p-2'>
        <span className='text-2xl font-bold'>Quick Actions</span>
        <div className='flex flex-col mt-6 justify-center items-center gap-4 '>
        <button className='px-6  py-2 rounded-lg bg-yellow-400'>Start New Campaign</button>
        <button className='px-1 py-2 border-2 border-yellow-400 rounded-lg'>Schedule New Follow-Up</button>
        </div>
      </div>
    </div>
  )
}

export default QuickAction
