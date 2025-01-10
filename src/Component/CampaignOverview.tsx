
const CampaignOverview = () => {
  return (
    <div className=" shadow-lg bg-white w-[70vw] md:w-[20vw] rounded-lg p-2 ">
        <div className=" p-2">
      <span className="text-2xl font-bold">Campaign Overview</span>
      <br />
      <span className="text-sm text-gray-400">Your campaign performance at your glance</span>
      <div className="grid grid-cols-2 gap-4  p-4 rounded-lg">
  <div className="flex flex-col items-center text-center">
    <span className="md:text-2xl text-yellow-400 font-bold">1234</span>
    <span className="text-sm text-gray-600">Total Emails Sent</span>
  </div>
  <div className="flex flex-col items-center text-center">
    <span className="md:text-2xl text-yellow-400 font-bold">32.5%</span>
    <span className="text-sm text-gray-600">Open Rate</span>
  </div>
  <div className="flex flex-col items-center text-center">
    <span className="md:text-2xl text-yellow-400 font-bold">12.8%</span>
    <span className="text-sm text-gray-600">Click Rate</span>
  </div>
  <div className="flex flex-col items-center text-center">
    <span className="md:text-2xl text-yellow-400 font-bold">5.2%</span>
    <span className="text-sm text-gray-600">Response Rate</span>
  </div>
</div>

</div>
    </div>
  )
}

export default CampaignOverview
