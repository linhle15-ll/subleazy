'use client'
import { useCallback, useMemo } from 'react'

import { useThreadsState } from '../context'
import { CommentCard } from './comment-card'
import { ThreadCard } from './thread-card'
import { ThreadComposer } from './thread-composer'

export const ThreadsListItem = ({
  thread,
  provider,
  active,
  open,
}) => {
  const {
    onClickThread,
    deleteThread,
    onHoverThread,
    onLeaveThread,
    resolveThread,
    unresolveThread,
  } = useThreadsState()

  const comments = useMemo(() => provider.getThreadComments(thread.id, true), [provider, thread])
  const firstComment = comments && comments[0]

  const handleDeleteClick = useCallback(() => {
    deleteThread(thread.id)
  }, [thread.id, deleteThread])

  const handleResolveClick = useCallback(() => {
    resolveThread(thread.id)
  }, [thread.id, resolveThread])

  const handleUnresolveClick = useCallback(() => {
    unresolveThread(thread.id)
  }, [thread.id, resolveThread])

  const editComment = useCallback((commentId, val) => {
    provider.updateComment(thread.id, commentId, { content: val })
  }, [provider, thread.id])

  const deleteComment = useCallback(commentId => {
    provider.deleteComment(thread.id, commentId, { deleteContent: true })
  }, [provider, thread.id, deleteThread, firstComment])

  return (
    <div
      onMouseEnter={() => onHoverThread(thread.id)}
      onMouseLeave={() => onLeaveThread()}
      className={`
        rounded-lg border border-gray-200 bg-white shadow-sm mb-3
        ${active || open ? 'ring-2 ring-orange-300' : ''}
        transition-all
      `}
    >
      <ThreadCard
        id={thread.id}
        active={active}
        open={open}
        onClick={!open ? onClickThread : null}
      >
        {open ? (
          <>
            <div className="border-b border-gray-100 p-2">
              <div className="flex flex-row items-center gap-3">
                {!thread.resolvedAt ? (
                  <button
                    onClick={handleResolveClick}
                    className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
                  >
                    ✓ Resolve
                  </button>
                ) : (
                  <button
                    onClick={handleUnresolveClick}
                    className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                  >
                    ⟲ Unresolve
                  </button>
                )}
                <button
                  onClick={handleDeleteClick}
                  className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  X Delete
                </button>
              </div>
            </div>

            {thread.resolvedAt ? (
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded px-3 py-1 my-2 text-xs text-yellow-800">
                💡 Resolved at {new Date(thread.resolvedAt).toLocaleDateString()} {new Date(thread.resolvedAt).toLocaleTimeString()}
              </div>
            ) : null}

            <div className="flex flex-col gap-3">
              {Array.isArray(comments) && comments?.map(comment => (
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
            <div className="mt-2">
              <ThreadComposer threadId={thread.id} provider={provider} />
            </div>
          </>
        ) : null}

        {!open && firstComment && firstComment.data ? (
          <div className="flex flex-col gap-2">
            <CommentCard
              key={firstComment.id}
              name={firstComment.data.userName}
              content={firstComment.content}
              createdAt={firstComment.createdAt}
              deleted={firstComment.deletedAt}
              onEdit={val => {
                if (val) {
                  editComment(firstComment.id, val)
                }
              }}
            />
            <div className="flex items-center gap-1 text-xs text-gray-500 ml-2">
              <label>
                {Math.max(0, comments?.length - 1) || 0} {(comments?.length - 1 || 0) === 1 ? 'reply' : 'replies'}
              </label>
            </div>
          </div>
        ) : null}
      </ThreadCard>
    </div>
  )
}