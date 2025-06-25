'use client'
import { useThreadsState } from '../context'
import { ThreadsListItem } from './thread-list-item'

export const ThreadsList = ({ provider, threads }) => {
  const { selectedThreads, selectedThread } = useThreadsState()

  if (threads?.length === 0) {
    return <label className="label">No threads.</label>
  }

  return (
    <div className="
      flex flex-col gap-2 self-stretch
     "
    >
      {threads.map(t => (
        <ThreadsListItem
          key={t.id}
          thread={t}
          active={selectedThreads.includes(t.id) || selectedThread === t.id}
          open={selectedThread === t.id}
          provider={provider}
        />
      ))}
    </div>
  )
}