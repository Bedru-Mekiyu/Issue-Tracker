'use client'
 import { ResponsiveContainer,BarChart,XAxis ,YAxis,Bar, Label} from 'recharts'
 interface Props{
        open:number;
        inProgress:number;
        closed:number
    }
export   const IssueChart = ({open,inProgress,closed}:Props) => {
const data=[
    {label:'Open',value:open},
    {label:"In Progress", value:inProgress },
    {label:"Closed",value:closed}
]
  return (
   <ResponsiveContainer width='100%' height={100}>
<BarChart data={data}>
    <XAxis dataKey="label"/>
    <YAxis/>
    <Bar dataKey="value" barSize={60 } fill='#636309'/>

</BarChart>

   </ResponsiveContainer>
  )
}
