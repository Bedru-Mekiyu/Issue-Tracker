import { Button } from "@radix-ui/themes"
import Link from "next/link"

function IssuePage() {
  return (
   <Button><Link href='/Issues/new'>new issue</Link></Button>
  )
}

export default IssuePage