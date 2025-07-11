'use client'

import React from 'react'

import { useThreadsState } from '../context'
import { CommentCard } from './comment-card'
import { ThreadCard } from './thread-card'
import { ThreadComposer } from './thead-compose'
import { Check, RotateCcw, X } from 'lucide-react'

export const ThreadsListItem = ({
    thread,
    provider,
    active,
    open,
    user
}: {
    thread: any,
    provider: any,
    active: boolean,
    open: boolean,
    user: any
}) => {
    const {
        onClickThread,
        deleteThread,
        onHoverThread,
        onLeaveThread,
        resolveThread,
        unresolveThread,
    } = useThreadsState()
    const classNames = ['threadsList--item']

    if (active || open) {
        classNames.push('threadsList--item--active')
    }

    const comments = React.useMemo(() => provider.getThreadComments(thread.id, true), [provider, thread])

    const firstComment = comments && comments[0]

    const handleDeleteClick = React.useCallback(() => {
        deleteThread(thread.id)
    }, [thread.id, deleteThread])

    const handleResolveClick = React.useCallback(() => {
        resolveThread(thread.id)
    }, [thread.id, resolveThread])

    const handleUnresolveClick = React.useCallback(() => {
        unresolveThread(thread.id)
    }, [thread.id, resolveThread])

    const editComment = React.useCallback((commentId: string, val: any) => {
        provider.updateComment(thread.id, commentId, { content: val })
    }, [provider, thread.id])

    const deleteComment = React.useCallback((commentId: string) => {
        provider.deleteComment(thread.id, commentId, { deleteContent: true })
    }, [provider, thread.id, deleteThread, firstComment])

    return (
        <div onMouseEnter={() => onHoverThread(thread.id)} onMouseLeave={() => onLeaveThread()}>
            <ThreadCard
                id={thread.id}
                active={active}
                open={open}
                onClick={(id: string) => {
                    if (!open) {
                        onClickThread(id)
                    }
                }}
            >
                {open ? (
                    <>
                        <div className="header-group">
                            <div className="button-group">
                                {!thread.resolvedAt ? (
                                    <button onClick={handleResolveClick}><Check size={12} />Resolve</button>
                                ) : (
                                    <button onClick={handleUnresolveClick}><RotateCcw size={12} />Unresolve</button>
                                )}
                                <button onClick={handleDeleteClick}><X size={12} /> Delete</button>
                            </div>
                        </div>

                        {thread.resolvedAt ? (
                            <div className="hint">Resolved at {new Date(thread.resolvedAt).toLocaleDateString()} {new Date(thread.resolvedAt).toLocaleTimeString()}</div>
                        ) : null}

                        <div className="comments-group">
                            {comments.map((comment: any) => (
                                <CommentCard
                                    key={comment.id}
                                    name={comment.data.userName}
                                    content={comment.deletedAt ? null : comment.content}
                                    createdAt={comment.createdAt}
                                    deleted={comment.deletedAt}
                                    onEdit={val => {
                                        if (val) {
                                            editComment(comment.id, val)
                                        }
                                    }}
                                    onDelete={() => {
                                        deleteComment(comment.id)
                                    }}
                                    showActions={true}
                                />
                            ))}
                        </div>
                        <div className="reply-group">
                            <ThreadComposer threadId={thread.id} provider={provider} user={user} />
                        </div>
                    </>
                ) : null}

                {!open && firstComment && firstComment.data ? (
                    <div className="comments-group">
                        <CommentCard
                            key={firstComment.id}
                            name={firstComment.data.userName}
                            content={firstComment.content}
                            createdAt={firstComment.createdAt}
                            deleted={firstComment.deletedAt}
                            onEdit={(val: string) => {
                                if (val) {
                                    editComment(firstComment.id, val)
                                }
                            }}
                            onDelete={() => {
                                deleteComment(firstComment.id)
                            }}

                        />
                        <div className="comments-count">
                            <label>{Math.max(0, comments.length - 1) || 0} {(comments.length - 1 || 0) === 1 ? 'reply' : 'replies'}</label>
                        </div>
                    </div>
                ) : null}
            </ThreadCard>
        </div>
    )
}