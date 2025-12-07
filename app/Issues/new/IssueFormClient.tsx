"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForms = dynamic(
  () => import("@/app/Issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

const IssueFormClient = () => {
  return <IssueForms />;
};

export default IssueFormClient;
