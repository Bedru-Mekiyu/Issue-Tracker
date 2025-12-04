import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

export const EditIssueButton = ({issueId}:{issueId:number}) => {
  return (
     <Button>
          <Pencil2Icon/>
          <Link href={`/Issues/edit/${issueId }`}>Edit Issue</Link>
          </Button>
  )
}
