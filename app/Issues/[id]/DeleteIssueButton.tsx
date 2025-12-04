'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import React from 'react'

export const DeleteIssueButton = ({IssueId}:{IssueId:number}) => {
 const router= useRouter();
  return (

    <AlertDialog.Root>
      <AlertDialog.Trigger>
  <Button color='red'>Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you wanna delete this issue ? this action is not undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'> Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>   
            <Button color='red'

            onClick={async ()=>{
              await axios.delete('/api/issues/' +IssueId);
              router.push('/Issues');
              router.refresh();  
            }}
            >
              Delete Issue</Button>
          </AlertDialog.Action>
           
        </Flex>

      </AlertDialog.Content>
    </AlertDialog.Root>
  
  )
}
