import React from 'react'

const RecentActivity = () => {
    return (
        <div className='bg-white shadow-lg md:w-[20vw]  rounded-lg p-2'>
            <div className='p-2 flex flex-col gap-2'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='bg-yellow-400 h-3 w-3 rounded-full'></div>
                        <div className='flex flex-col '>
                            <span className=''>Email Sent</span>
                            <span className='text-xs text-gray-400'>John Doe</span>
                        </div>
                    </div>
                    <span>2 minutes ago</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='bg-yellow-400 h-3 w-3 rounded-full'></div>
                        <div className='flex flex-col '>
                            <span className=''>Reply Received</span>
                            <span className='text-xs text-gray-400'>John Doe</span>
                        </div>
                    </div>
                    <span>12 minutes ago</span>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='bg-yellow-400 h-3 w-3 rounded-full'></div>
                        <div className='flex flex-col '>
                            <span className=''>Follow-up scheduled</span>
                            <span className='text-xs text-gray-400'>John Doe</span>
                        </div>
                    </div>
                    <span>1 hour ago</span>
                </div>


            </div>
        </div>
    )
}

export default RecentActivity
