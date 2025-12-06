import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'

import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Is } from 'zod/v4/locales'
import IssueStatusBadge from './components/IssueStatusBadge'

export const latestIssues = () => {
    prisma.issue.findMany({
        orderBy:{createdAt:'desc'},
        take:5,
        include:{assingedToUser:true}   
    })  
  return (
    <Card> 
        <Heading size='3' mb='4'>Latest Issues</Heading>
    <Table.Root variant="surface">
        <Table.Body>
            {issues.map((issue)=>(
                <Table.Row key={issue.id}>
                    <Table.Cell>
                        <Flex>
                        <Flex direction='column' align='start' gap='2'>
                            <Link href={`/Issues/${issue.id}`}>
                              {issue.title}
                            </Link>
                            <IssueStatusBadge status={issue.status} />
                        </Flex>
                        {issue.assingedToUser && (
                            <Avatar src={issue.assingedToUser.image!} fallback={''}
                            size='2'
                            radius='full'
                            />
                        )  }
                        </Flex>
                      
                    </Table.Cell>
                </Table.Row>
            )) }
        </Table.Body>
    </Table.Root>
    </Card>
  )
}
