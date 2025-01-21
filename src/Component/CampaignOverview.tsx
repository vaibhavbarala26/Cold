
const CampaignOverview = ({data}) => {
  console.log(data);
  
  return (
    <div className=" shadow-lg bg-white w-[70vw] md:w-[20vw] rounded-lg p-2 ">
        <div className=" p-2">
      <span className="text-2xl font-bold">Campaign Overview</span>
      <br />
      <span className="text-sm text-gray-400">Your campaign performance at your glance</span>
      <div className="grid grid-cols-2 gap-4  p-4 rounded-lg">
  <div className="flex flex-col items-center text-center">
    <span className="md:text-2xl text-yellow-400 font-bold">{data?.totalMailSent}</span>
    <span className="text-sm text-gray-600">Total Emails Sent</span>
  </div>
  
  <div className="flex flex-col items-center text-center">
    <span className="md:text-2xl text-yellow-400 font-bold">{ data?.totalMailSent ? data?.totalClickRate/data?.totalMailSent *100 : 0 }%</span>
    <span className="text-sm text-gray-600">Click Rate</span>
  </div>
  
</div>

</div>
    </div>
  )
}

export default CampaignOverview
