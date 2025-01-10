import React from 'react'

//import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart } from "recharts"

import { Bar, BarChart, XAxis } from "recharts"
const chartData = [
    { Day: "Monday", Click: 186 },
    { Day: "Tuesday", Click: 305 },
    { Day: "Wednesday", Click: 237},
    { Day: "Thursday", Click: 73 },
    { Day: "Friday", Click: 209 },
    { Day: "Saturday", Click: 214 },
    { Day: "Sunday", Click: 214 },
  ]
  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
const chartConfig = {
    Click: {
      label: "Click-Through",
      color: "hsl(var(--chart-1))",
    },
    
  } satisfies ChartConfig
  const chartData2 = [
    { name: "Mon", rate: 0.1 },
  { name: "Tue", rate: 0.12 },
  { name: "Wed", rate: 0.15 },
  { name: "Thu", rate: 0.18 },
  { name: "Fri", rate: 0.11 },
  { name: "Sat", rate: 0.09 },
  { name: "Sun", rate: 0.08 },
  ]
  
  const chartConfig2 = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    
  } satisfies ChartConfig
  
const CampaignPerformance = () => {
  return (
    <div className='bg-white shadow-lg p-2 rounded-lg md:w-[45vw] w-[85vw]'>
      <div className='flex flex-col'>
        <span className='text-2xl font-bold'>Campaign Performance</span>
        <span className='text-gray-400 text-sm'>Weekly open rates and click-through rates</span>
      </div>
      <div>
      <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Click" fill="#FFD700" radius={1} />
          
          </BarChart>
        </ChartContainer>
      </div>
      <div  className='mt-10'>
    
  <ChartContainer config={chartConfig2}>
    <LineChart
      data={chartData2}
      margin={{
        top: 10,
        bottom: 10,
        left: 12,
        right: 12,
      }}
    >
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />
      <Line
        dataKey="rate"
        type="natural"
        stroke="#FFD700" // Yellow stroke for the line
        strokeWidth={2}
        dot={{ r: 4, stroke: "#FFD700", strokeWidth: 2 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ChartContainer>
</div>

   
    </div>
  )
}

export default CampaignPerformance
