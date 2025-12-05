
'use client';

import { User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const AssigneeSelect = () => {

 const{data:users,error,isLoading} =   useQuery({
        queryKey:['users'],
        queryFn:() => axios.get<User[]>('/api/users').then(res=>res.data),
        staleTime:60*1000, 
        retry:2,
        });

if(isLoading)return <Skeleton />;
if(error)return null;
  return (
    <Select.Root>
    <Select.Trigger placeholder="Assign issue to..." />
    <Select.Content>
        <Select.Group>
            <Select.Label>Suggestions </Select.Label>
            {users?.map((user)=>( 
                <Select.Item key={user.id} value={user.id}>
                    {user.name}
                </Select.Item>
            ))}
          
    
        </Select.Group>

    </Select.Content>
    </Select.Root>
  )
}
