//TODO: Move context to editor store
import { useThreadsState } from '../context'

import { ThreadsListItem } from './thread-list-item'

export const ThreadsList = ({ provider, threads, user } : { provider: any, threads: any[], user: any}) => {
    const { selectedThreads, selectedThread } = useThreadsState()

    if (threads.length === 0) {
        return <label className='label'> No threads. </label>
    }

    return (
        <div className='threads-group mb-5'>
            {threads.map(t => (
                <ThreadsListItem 
                    key={t.id}
                    thread={t}
                    active={selectedThreads.includes(t.id) || selectedThread === t.id}
                    open={selectedThread === t.id}
                    provider={provider}
                    user={user}
                />
            ))}
        </div>
    )
}
