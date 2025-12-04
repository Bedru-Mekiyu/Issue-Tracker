'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import Spinner from '@/app/components/Spinner'
import delay from 'delay'

export const DeleteIssueButton = ({IssueId}:{IssueId:number}) => {
 const router= useRouter();
 const [error,setError]=useState(false);
 const [isDeleting,setIsDeleting]=useState(false);
 const deleteIssue=async ()=>{

              try {
                setIsDeleting(true); 
             await axios.delete('/api/issues/' +IssueId);
              router.push('/Issues/list');
              router.refresh();  
              } catch (error) {
                setIsDeleting(false);
                setError(true )
              }
         
            }
  return (
    <>

    <AlertDialog.Root>
      <AlertDialog.Trigger>
  <Button color='red' disabled={isDeleting}>
    Delete Issue
    {isDeleting && <Spinner  />}
    </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you wanna delete this issue ? this action is undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'> Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>   
            <Button color='red'

            onClick={deleteIssue}
            >
              Delete Issue</Button>
          </AlertDialog.Action>
           
        </Flex>

      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Issue Deleted</AlertDialog.Title>
        <AlertDialog.Description>
          The issue has not been successfully deleted.
        </AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray' onClick={()=>setError(false)}>ok</Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    </>
  
  )
}



