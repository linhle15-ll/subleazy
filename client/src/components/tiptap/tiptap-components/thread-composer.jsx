'use client'
import { useCallback, useState } from 'react'

import { useUser } from '../tiptap-hooks/use-user'

export const ThreadComposer = ({ threadId, provider }) => {
  const user = useUser()
  const [comment, setComment] = useState('')

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()

      if (!comment) {
        return
      }

      if (provider) {
        provider.addComment(threadId, {
          content: comment,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          data: { userName: user.name },
        })

        setComment('')
      }
    },
    [comment, provider],
  )

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Reply to thread …"
        onChange={e => setComment(e.currentTarget.value)}
        value={comment}
        className='border border-gray-500 rounded p-2 w-full h-25'
      />
      <div className="flex-row gap-2">
          <button type="submit" className="primary" disabled={!comment?.length}>Send</button>
      </div>
    </form>
  )
}