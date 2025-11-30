import { NextRequest } from "next/server";
import {string, z} from 'zod'

export async function Post(request:NextRequest) {
    const body=await request.json();
    z.object({
        title:z.string().min(1).max(255),
        description:z.string().min(1)
    })
}