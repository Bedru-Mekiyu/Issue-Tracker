
'use client';

import { Issue, User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

type IssueWithAssignee = Issue & { assignedToUserId?: string | null };

export const AssigneeSelect = ({issue}:{issue: IssueWithAssignee}) => {

 const{data:users,error,isLoading} =   useQuery({
        queryKey:['users'], 
        queryFn:() => axios.get<User[]>('/api/users').then(res=>res.data),
        staleTime:60*1000, 
        retry:2,
        });

if(isLoading)return <Skeleton />;
if(error)return null;
  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ''}
      onValueChange={(userId) => {
        axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null });
      }}
    >
      <Select.Trigger placeholder="Assign issue to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions </Select.Label>
          <Select.Item value='bedru'>Unassigned</Select.Item>

          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
