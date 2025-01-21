import React from 'react'

//import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart } from "recharts"

import { Bar, BarChart, XAxis } from "recharts"

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
 
  
  const chartConfig2 = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    
  } satisfies ChartConfig
  
const CampaignPerformance = ({data}) => {
  console.log(data);
  
  return (
    <div className='bg-white shadow-lg p-2 rounded-lg md:w-[45vw] w-[85vw]'>
      <div className='flex flex-col'>
        <span className='text-2xl font-bold'>Campaign Performance</span>
        <span className='text-gray-400 text-sm'>Weekly click rates and email sents</span>
      </div>
      <div>
      <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data?.weeklyClicks}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="clickRate" fill="#FFD700" radius={1} />
          
          </BarChart>
        </ChartContainer>
      </div>
      <div  className='mt-10'>
    
  <ChartContainer config={chartConfig2}>
    <LineChart
      data={data?.weeklyEmails}
      margin={{
        top: 10,
        bottom: 10,
        left: 12,
        right: 12,
      }}
    >
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis
        dataKey="day"
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
        dataKey="emailsSent"
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
