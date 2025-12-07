import { Metadata } from "next";
import IssueFormClient from "./IssueFormClient";

export const metadata: Metadata = {
  title: "Create Issue",
  description: "Create a new issue with title, description, and status.",
};

const NewIssuePage = () => {
  return <IssueFormClient />;
};

export default NewIssuePage;
