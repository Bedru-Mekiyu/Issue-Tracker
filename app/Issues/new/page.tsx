'use client'

import { Button, TextArea, TextField } from '@radix-ui/themes'


function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-3' ><TextField.Root placeholder="Title…">
	
</TextField.Root>
<TextArea placeholder='Description'></TextArea>
<Button>Submit New Issue</Button>
</div>
  )
}

export default NewIssuePage