'use client'
// --- Styles ---
import "@/components/tiptap/simple-editor.scss"

import React, { useCallback } from 'react'
// --- Tiptap Core ---
import { EditorContent, useEditor, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// --- Tiptap providers ---
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { ThreadsProvider } from './context'

// --- Tiptap Core Extensions ---
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"
import { Collaboration } from '@tiptap/extension-collaboration'
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension"
import { Selection } from "@/components/tiptap-extension/selection-extension"
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension"

import { CommentsKit, hoverOffThread, hoverThread } from '@tiptap-pro/extension-comments'
import { v4 as uuid } from 'uuid'
import * as Y from 'yjs'

// --- Tiptap Hooks ---
import { useThreads } from './tiptap-hooks/use-thread'
import { useUser } from './tiptap-hooks/use-user'
import { useWindowSize } from "@/hooks/use-window-size"
import { useMobile } from "@/hooks/use-mobile"
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"

// --- Tiptap Components ---
import contractTemplate from '@/components/tiptap/data/contract-template.json'
import { ThreadsList } from './tiptap-components/thread-list'
import { MainToolbarContent, MobileToolbarContent } from './tiptap-components/toolbar-content'

// --- UI Primitives ---
import { Toolbar } from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

const doc = new Y.Doc()

// const isDev = import.meta.env.MODE === 'development'
const isDev = true
const id = isDev ? 'dev' : uuid()

const provider = new TiptapCollabProvider({
  appId: '7j9y6m10',
  name: `tiptap-comments-demo/${id}`,
  document: doc,
})

export default function EditorWithComment() {
  const [showUnresolved, setShowUnresolved] = React.useState<boolean>(true)
  const [selectedThread, setSelectedThread] = React.useState<string | null>(null)
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main")
  const toolbarRef = React.useRef<HTMLDivElement>(null)

  type Thread = { id: string; resolvedAt?: any } // Adjust properties as needed
  const threadsRef = React.useRef<Thread[]>([])

  const user = useUser()
  const windowSize = useWindowSize()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {}, // enable history for undo/redo
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Superscript,
      Subscript,
      Selection,
      TrailingNode,
      Image,
      Collaboration.configure({
        document: doc,
      }),
      Link.configure({
        openOnClick: false
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user.name,
          color: user.color,
        },
      }),
      CommentsKit.configure({
        provider,
        useLegacyWrapping: false,
        onClickThread: threadId => {
          const isResolved = threadsRef.current.find(t => t.id === threadId)?.resolvedAt

          if (!threadId || isResolved) {
            setSelectedThread(null)
            editor?.chain().unselectThread().run()
            return
          }

          setSelectedThread(threadId)
          editor?.chain().selectThread({ id: threadId, updateSelection: false }).run()
        },
      }),
      Placeholder.configure({
        placeholder: 'Write a text to add comments …',
      }),
    ],
    content: contractTemplate
  })

  // Visibility - View
  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  const isMobile = useMobile();
  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])


  // Threads and Comments
  const { threads = [], createThread } = useThreads(provider, editor, user)
  threadsRef.current = threads

  type ThreadIdType = any | null

  const selectThreadInEditor = React.useCallback((threadId: ThreadIdType) => {
    editor?.chain().selectThread({ id: threadId ?? "" }).run()
  }, [editor])

  const deleteThread = React.useCallback((threadId: ThreadIdType) => {
    provider.deleteThread(threadId ?? "")
    editor?.commands.removeThread({ id: threadId ?? "" })

  }, [editor])

  const resolveThread = React.useCallback((threadId: ThreadIdType) => {
    editor?.commands.resolveThread({ id: threadId ?? "" })
  }, [editor])

  const unresolveThread = React.useCallback((threadId: ThreadIdType) => {
    editor?.commands.unresolveThread({ id: threadId ?? "" })
  }, [editor])

  interface UpdateCommentMetaData {
    [key: string]: any;
  }

  interface UpdateCommentFn {
    (
      threadId: ThreadIdType,
      commentId: string,
      content: string,
      metaData: UpdateCommentMetaData
    ): void;
  }

  const updateComment: UpdateCommentFn = React.useCallback(
    (threadId, commentId, content, metaData) => {
      editor?.commands.updateComment({
        threadId,
        id: commentId,
        content,
        data: metaData,
      });
    },
    [editor]
  );

  const onHoverThread = React.useCallback((threadId: ThreadIdType) => {
    if (!editor) { return }
    hoverThread(editor, [threadId])
  }, [editor])

  const onLeaveThread = useCallback(() => {
    if (!editor) { return }
    hoverOffThread(editor)
  }, [editor])

  if (!editor) {
    return null
  }

  const filteredThreads = (threads as Thread[]).filter(t => (showUnresolved ? !t.resolvedAt : !!t.resolvedAt))

  return (
    <ThreadsProvider
      onClickThread={selectThreadInEditor}
      deleteThread={deleteThread}
      onHoverThread={() => onHoverThread(selectedThread)} // ???????????????
      onLeaveThread={onLeaveThread}
      resolveThread={() => resolveThread(selectedThread)}
      onUpdateComment={updateComment}
      unresolveThread={() => unresolveThread(selectedThread)}
      selectedThreads={editor.storage.comments.focusedThreads}
      selectedThread={selectedThread}
      setSelectedThread={setSelectedThread}
      threads={threads}
    >
      <div className="flex flex-row flex-reverse w-full gap-8 lg:gap-12" data-viewmode={showUnresolved ? 'open' : 'resolved'}>

        <div className="flex flex-col md:flex-row w-full gap-6 md:gap-10">
          {/* Editor Section */}
          <div className="flex flex-col flex-1 items-start justify-start max-w-3xl mx-auto bg-white rounded-lg shadow p-4 md:p-8">

            {/* Editor Content */}
            <EditorContext.Provider value={{ editor }}>
              <div className="fixed">
                <button
                  onClick={createThread}
                  disabled={editor.state.selection.empty}
                  className="btn-secondary"
                >
                  Add comment
                </button>
                <Toolbar
                  ref={toolbarRef}
                  style={
                    isMobile
                      ? {
                        bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
                      }
                      : {}
                  }
                >
                  {mobileView === "main" ? (
                    <MainToolbarContent
                      onHighlighterClick={() => setMobileView("highlighter")}
                      onLinkClick={() => setMobileView("link")}
                      isMobile={isMobile}
                    />
                  ) : (
                    <MobileToolbarContent
                      type={mobileView === "highlighter" ? "highlighter" : "link"}
                      onBack={() => setMobileView("main")}
                    />
                  )}
                </Toolbar>
              </div>

              <div className="w-full max-w-2xl overflow-hidden">
                <EditorContent
                  editor={editor}
                  role="presentation"
                  className="w-full min-h-[320px] bg-gray-50 rounded-md p-4 border border-gray-200"
                />
              </div>
            </EditorContext.Provider>
          </div>

          {/* Comments Sidebar */}
          <aside className="w-full md:w-[380px] h-fit md:h-[calc(100vh-4rem)] bg-orange-50 p-4 rounded-lg shadow flex flex-col gap-4 sticky top-8">
            <div className="flex flex-col gap-3">
              <div className="font-medium text-lg text-primaryOrange">Comments</div>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="thread-state"
                    onChange={() => setShowUnresolved(true)}
                    checked={showUnresolved}
                    className="accent-orange-500"
                  />
                  <span className="text-sm">Open</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="thread-state"
                    onChange={() => setShowUnresolved(false)}
                    checked={!showUnresolved}
                    className="accent-orange-500"
                  />
                  <span className="text-sm">Resolved</span>
                </label>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ThreadsList provider={provider} threads={filteredThreads} />
            </div>
          </aside>
        </div>
      </div>
    </ThreadsProvider>
  )
}