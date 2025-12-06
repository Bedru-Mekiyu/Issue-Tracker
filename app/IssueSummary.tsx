import { Status } from '@prisma/client';
import { Card, Flex,Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'
 interface Props{
        open:number;
        inProgress:number;
        closed:number}
export const IssueSummary = ({open,inProgress,closed}:Props) => {
    const container:{
        label:string;
        value:number;
        status:Status
    }[]=[
        {label:'Open',value:open,status:Status.OPEN},
        {label:'In Progress',value:inProgress,status:Status.IN_PROGRESS},
        {label:'Closed',value:closed,status:Status.CLOSED}, 
    ]
  return (
 <Flex gap='4'>
    {container.map(status=>(
        <Card key={status.label} >
            <Flex direction='column' align='center' gap='2' >
                <Link className='text-sm font-medium' href={`/Issues/list?status=${status.status}`}>
                {status.label}
                </Link>
                <Text size='7' weight='bold'>
                {status.value}
                </Text>
            </Flex>
        </Card>     
    )
                
    )}
 </Flex>

  )
}
