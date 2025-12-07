'use client'
import dynamic from "next/dynamic"
import IssueFormSkeleton from "./loading"
import { Metadata } from "next"
const IssueForms = dynamic(()=>import('@/app/Issues/_components/IssueForm'),{ssr:false,
  loading:()=><IssueFormSkeleton/>
})

  const newIssuePage = () => {
  return (
    <IssueForms/>
  )
}
export const metadata: Metadata = {
  title: "Create Issue",
  description: "Create a new issue with title, description, and status.",
};
export default newIssuePage