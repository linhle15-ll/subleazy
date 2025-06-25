'use client'
import {
  createContext, useCallback, useContext, ReactNode
} from 'react'

type Thread = any

interface ThreadsContextType {
  threads: Thread[];
  selectedThreads: Thread[];
  selectedThread: Thread | null;
  onClickThread: (threadId: any) => void;
  deleteThread: (threadId: any) => void;
  resolveThread: (threadId: any) => void;
  unresolveThread: (threadId: any) => void;
  onUpdateComment: (threadId: any, commentId: any, content: any, metaData: any) => void;
  onHoverThread: () => void;
  onLeaveThread: () => void;
}

export const ThreadsContext = createContext<ThreadsContextType>({
  threads: [],
  selectedThreads: [],
  selectedThread: null,
  onClickThread: () => null,
  deleteThread: () => null,
  resolveThread: () => null,
  unresolveThread: () => null,
  onUpdateComment: () => null,
  onHoverThread: () => null,
  onLeaveThread: () => null,
})

export const ThreadsProvider = ({
  children,
  threads = [],
  selectedThreads = [],
  selectedThread = null,
  onClickThread = () => null,
  deleteThread = () => null,
  resolveThread = () => null,
  unresolveThread = () => null,
  onUpdateComment = () => null,
  onHoverThread = () => null,
  onLeaveThread = () => null,
  setSelectedThread = () => null,
}: {
  children: ReactNode,
  threads?: any[],
  selectedThreads?: any[],
  selectedThread?: any,
  onClickThread?: (threadId: any) => void,
  deleteThread?: (threadId: any) => void,
  onHoverThread?: () => void,
  resolveThread?: () => void,
  unresolveThread?: () => void,
  onUpdateComment?: (threadId: any, commentId: any, content: any, metaData: any) => void,
  onLeaveThread?: () => void,
  setSelectedThread?: (value: any) => void,
}) => {
  const handleThreadClick = useCallback((threadId: any) => {
    setSelectedThread((currentThreadId: any) => {
      if (currentThreadId !== threadId) {
        onClickThread(threadId)
        setSelectedThread(threadId)
      }

      return currentThreadId !== threadId ? threadId : null
    })
  }, [onClickThread])

  const providerValue = {
    threads,
    selectedThreads,
    selectedThread,
    deleteThread,
    resolveThread,
    unresolveThread,
    onClickThread: handleThreadClick,
    onHoverThread,
    onUpdateComment,
    onLeaveThread,
  }

  return (
    <ThreadsContext.Provider value={providerValue}>
      {children}
    </ThreadsContext.Provider>
  )
}

export const useThreadsState = () => {
  return useContext(ThreadsContext)
}
