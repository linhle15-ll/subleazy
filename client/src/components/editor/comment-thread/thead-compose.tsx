'use client'
import React from 'react'
import { useUser } from '@/hooks/use-user'

export const ThreadComposer = ({ threadId, provider } : { threadId: string, provider: any}) => {
    const user = useUser()
    const [comment, setComment] = React.useState<string>('')

    const handleSubmit = React.useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if (!comment) {
                return
            }

            if (provider) {
                provider.addComment(threadId, {
                    content: comment,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    data: { userName: user.name }
                })

                setComment('')
            }
        },
        [comment, provider]
    )

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                placeholder='Reply to thread ...'
                onChange={e => setComment(e.currentTarget.value)}
                value={comment}
            />
            <div className='flex-row'>
                <div className='button-group'>
                    <button type='submit' className='btn-primary' disabled={!comment.length}> 
                        Send
                    </button>
                </div>

            </div>
        </form>
    )
}