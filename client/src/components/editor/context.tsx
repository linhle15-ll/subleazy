// TODO: Change to store
'use client';
import React from 'react';

interface ThreadsProps {
  children: React.ReactNode;
  threads?: any[];
  selectedThreads?: any[];
  selectedThread?: any;
  onClickThread?: (threadId: string) => void;
  onDeleteThread?: (threadId: string) => void;
  onResolveThread?: (threadId: string) => void;
  onUnresolveThread?: (threadId: string) => void;
  onUpdateComment?: (
    threadId: string,
    comment: any,
    content: any,
    metaData: any
  ) => void;
  onHoverThread?: (threadId: string) => void;
  onLeaveThread?: () => void;
  setSelectedThread?: (threadId: any) => void;
}

interface ThreadsContextType {
  threads: any[];
  selectedThreads: any[];
  selectedThread: any;
  onClickThread: (threadId: any) => void;
  deleteThread: (threadId: any) => void;
  resolveThread: (threadId: any) => void;
  unresolveThread: (threadId: any) => void;
  onUpdateComment: (
    threadId: any,
    comment: any,
    content: any,
    metaData: any
  ) => void;
  onHoverThread: (threadId: any) => void;
  onLeaveThread: () => void;
}

export const ThreadsContext = React.createContext<ThreadsContextType>({
  threads: [],
  selectedThreads: [],
  selectedThread: null,
  onClickThread: () => {},
  deleteThread: () => {},
  resolveThread: () => {},
  unresolveThread: () => {},
  onUpdateComment: () => {},
  onHoverThread: () => {},
  onLeaveThread: () => {},
});

export const ThreadsProvider = ({
  children,
  threads = [],
  selectedThreads = [],
  selectedThread = null,
  onClickThread = () => {},
  onDeleteThread = () => {},
  onResolveThread = () => {},
  onUnresolveThread = () => {},
  onUpdateComment = () => {},
  onHoverThread = () => {},
  onLeaveThread = () => {},
  setSelectedThread = () => null,
}: ThreadsProps) => {
  const handleThreadClick = React.useCallback(
    (threadId: any) => {
      if (setSelectedThread) {
        // Toggle thread selection: if same thread is clicked, close it; otherwise, open the new one
        setSelectedThread((currentThreadId: any) => {
          const newThreadId = currentThreadId === threadId ? null : threadId;
          if (onClickThread) {
            onClickThread(newThreadId || threadId);
          }
          return newThreadId;
        });
      }
    },
    [onClickThread, setSelectedThread]
  );

  const providerValue: ThreadsContextType = {
    threads,
    selectedThreads,
    selectedThread,
    deleteThread: onDeleteThread,
    resolveThread: onResolveThread,
    unresolveThread: onUnresolveThread,
    onClickThread: handleThreadClick,
    onUpdateComment,
    onHoverThread,
    onLeaveThread,
  };

  return (
    <ThreadsContext.Provider value={providerValue}>
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreadsState = () => {
  return React.useContext(ThreadsContext);
};
