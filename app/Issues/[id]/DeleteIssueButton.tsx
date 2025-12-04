import { Button } from '@radix-ui/themes'
import React from 'react'

export const DeleteIssueButton = ({IssueId}:{IssueId:number}) => {
  return (
    <Button color='red'>Delete Issue</Button>
  )
}
