'use client'
import { useCallback, useState } from 'react'

export const CommentCard = ({
  name,
  createdAt,
  deleted,
  content,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  const [isComposing, setIsComposing] = useState(false)
  const [composeValue, setComposeValue] = useState(content)

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    if (onEdit) {
      setIsComposing(false)
      onEdit(composeValue)
    }
  }, [composeValue, onEdit])

  return (
    <div
      className={`rounded-md border border-gray-200 bg-white px-4 py-3 mb-2 shadow-sm transition-opacity ${
        deleted ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-row flex-wrap items-center gap-x-2 gap-y-1 mb-2 text-xs text-gray-500">
        <span className="font-semibold text-gray-900">{name}</span>
        <span className="before:content-['·'] before:pr-1">
          {new Date(createdAt).toLocaleTimeString()}
        </span>
      </div>

      {deleted && (
        <div className="text-gray-400 text-sm italic">
          <p>Comment was deleted</p>
        </div>
      )}

      {!isComposing && !deleted ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-800 break-words">{content}</p>
          {showActions ? (
            <div className="flex gap-2 mt-1">
              <button
                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsComposing(true)
                }}
              >
                Edit
              </button>
              {onDelete ? (
                <button
                  className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDelete()
                  }}
                >
                  Delete
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {isComposing && !deleted ? (
        <div className="mt-2">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full min-h-[60px] rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-y"
              type="text"
              onChange={e => setComposeValue(e.currentTarget.value)}
              value={composeValue}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="reset"
                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
                onClick={() => setIsComposing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-xs px-2 py-1 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
                disabled={!composeValue?.length || composeValue === content}
              >
                Accept
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}