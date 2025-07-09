/* eslint-disable prettier/prettier */
'use client'

import React from 'react'

export const CommentCard = ({
    name,
    createdAt,
    deleted,
    content,
    onDelete,
    onEdit,
    showActions = false,
} : {
    name: string;
    createdAt: string;
    deleted: boolean;
    content: string;
    onDelete: () => void;
    onEdit: (value: string) => void;
    showActions?: boolean;
}) => {
    const [isComposing, setIsComposing] = React.useState(false)
    const [composeValue, setComposeValue] = React.useState(content ?? '')

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (onEdit) {
            setIsComposing(false)
            onEdit(composeValue)
        }
    }, [composeValue, onEdit])

    const commentWrapperClass = ['comment']

    if (deleted) {
        commentWrapperClass.push('deleted')
    }

    return (
        <div className={commentWrapperClass.join(' ')}>
            <div className='label-group'>
                <label> {name} </label>
                <label> {new Date(createdAt).toLocaleTimeString()} </label>
            </div>

            {deleted && (
                <div className='comment-content'>
                    <p> Comment was deleted </p>
                </div>
            )}

            {!isComposing && !deleted ? (
                <div className='comment-content'>
                    <p> {content} </p>
                    {showActions ? (
                        <div className='button-group'>
                            <button onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                setIsComposing(true)
                            }}>
                                Edit
                            </button>
                            {onDelete ? <button onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                onDelete()
                            }}> Delete </button> : null}
                        </div>
                    ) : null}
                </div>
            ) : null}

            {isComposing && !deleted ? (
                <div className='comment-edit'>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            onChange={e => setComposeValue(e.currentTarget.value)}
                            value={composeValue ?? ''}
                            className='border border-lightGray rounded-md focus:border-gray-500 focus:outline-none p-2 w-full'
                        />
                        <div className='flex-row'>
                            <div className='button-group'>
                                <button type='reset' onClick={() => setIsComposing(false)}> Cancel </button>
                                <button type='submit' className='primary' disabled={!composeValue.length || composeValue === content}> Save </button>
                            </div>
                        </div>
                    </form> 
                </div>
            ) : null }
        </div>
    )

}