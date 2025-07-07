'use client';

import React from 'react';

// Tiptap and Tiptap extensions
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { TextAlign } from '@tiptap/extension-text-align';
import { ExportDocx } from '@tiptap-pro/extension-export-docx';
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import { Collaboration } from '@tiptap/extension-collaboration';
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor';
import Placeholder from '@tiptap/extension-placeholder';
import { CommentsKit } from '@tiptap-pro/extension-comments';
import { v4 as uuid } from 'uuid';
import * as Y from 'yjs';

// Hooks
import { useUser } from '@/hooks/use-user';
import { useThreads } from '@/hooks/use-threads';

// Components and Styling
import EditorMenuBar from './menu-bar';
import { content } from './content';
import { ThreadsList } from './comment-thread/thread-list';
import Loading from '@/components/ui/commons/loading';
import ToggleButton from '@/components/ui/button/toogle-btn';
import './styles.scss';
import { ThreadsProvider } from './context';

// Editor store
import { useEditorStore } from '@/stores/editor.store';

const DOCUMENT_ID = 'contract-editor-v1';
const doc = new Y.Doc();

const isDev = process.env.NODE_ENV=== 'development';
const id = isDev ? 'dev' : uuid();

export default function Editor({ initialContent }: { initialContent?: string | null }) {
  const user = useUser();
  const [showUnresolved, setShowUnresolved] = React.useState<boolean>(true);
  const [selectedThread, setSelectedThread] = React.useState(null);
   const [hasInitialized, setHasInitialized] = React.useState(false);
  const { isLoading, setIsLoading, updateContent } = useEditorStore()

  type Thread = { id: string; resolvedAt?: Date | null; [key: string]: any };
  const threadsRef = React.useRef<Thread[]>([]);
  const providerRef = React.useRef<TiptapCollabProvider | null>(null);

  // Create provider ONCE
  if (!providerRef.current) {
    providerRef.current = new TiptapCollabProvider({
      name: DOCUMENT_ID,
      appId: process.env.NEXT_PUBLIC_TIPTAP_PRO_APPID!,
      token: process.env.NEXT_PUBLIC_TIPTAP_PRO_TOKEN!,
      document: doc,
      onOpen() {
        console.log('WebSocket connection opened.')
      },
      onConnect() {
        console.log('Connected to the server.')
      },
    });
  }

  const provider = providerRef.current;

  // Determine which content to use
  const editorContent = initialContent || content;

  const editor = useEditor({
    extensions: [
      Underline,
      Highlight.configure({ multicolor: true }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image,
      StarterKit.configure({
        history: false, // IMPORTANT: Disable history for collaboration
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),

      ExportDocx.configure({
        onCompleteExport: (result: any | Buffer<ArrayBufferLike> | Blob) => {
          setIsLoading(false);
          const blob = new Blob([result], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')

          a.href = url
          a.download = 'export.docx'
          a.click()
          URL.revokeObjectURL(url)
        },
      }),
      Link,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      // Collaboration and CommentsKit extensions
      Collaboration.configure({
        document: doc 
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
        onClickThread: (threadId: any) => {
          try {
            const isResolved = threadsRef.current.find(
              (t) => t.id === threadId
            )?.resolvedAt;

            if (!threadId || isResolved || !editor || !editor.isEditable) {
              setSelectedThread(null);
              if (editor) {
                editor.chain().unselectThread().run();
              }
              return;
            }
            setSelectedThread(threadId);
            editor
              .chain()
              .selectThread({ id: threadId, updateSelection: false })
              .run();
          } catch (error) {
            console.warn('Failed to handle thread click:', error);
            setSelectedThread(null);
          }
        },
      }),
      Placeholder.configure({
        placeholder: initialContent 
          ? 'Edit your imported document...' 
          : 'Start writing your own contract here ...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    onCreate: ({ editor }) => {
      setHasInitialized(true)
    },

    onUpdate: ({ editor }) => {
      updateContent(editor.getHTML())
    },
  });


  // Meoww, fixed bug editor content got duplicated every reload
  React.useEffect(() => {
    if (!editor || !hasInitialized) return;

    // Wait for provider to sync first
    const handleSynced = () => {
      const yText = doc.getText('sync text');
      const currentLength = yText.length;
      
      // Only set initial content if: have initial content to set // The collaborative document is empty
      if (initialContent && currentLength === 0) {
        yText.insert(0, initialContent); 
      } else if (!initialContent && currentLength === 0) {
        yText.insert(0, content);
      } else {
        console.log('Document already has content, skipping initial content setting');
      }
    };

    // Check if already synced
    if (provider.isSynced) {
      handleSynced();
    } else {
      // Wait for sync
      provider.on('synced', handleSynced);
    }

    // Cleanup
    return () => {
      provider.off('synced', handleSynced);
    };
  }, [editor, hasInitialized, initialContent, provider]);

  const {
    threads,
    createThread,
    selectThreadInEditor,
    deleteThread,
    resolveThread,
    unresolveThread,
    onHoverThread,
    onLeaveThread,
    updateComment,
  } = useThreads(provider, editor, user);
  
  if (!editor) {
    return (
      <div className="editor-container">
        <Loading />
      </div>
    );
  }

  threadsRef.current = threads || [];

  const filteredThreads = threads.filter((t: any) =>
    showUnresolved ? !t.resolvedAt : !!t.resolvedAt
  );

  const finishContract = () => {
    console.log('Meo Meo')
    
  }

  return (
    <ThreadsProvider
      onClickThread={selectThreadInEditor}
      onDeleteThread={deleteThread}
      onHoverThread={onHoverThread}
      onLeaveThread={onLeaveThread}
      onResolveThread={resolveThread}
      onUpdateComment={updateComment}
      onUnresolveThread={unresolveThread}
      selectedThreads={editor.storage.comments?.focusedThreads || []}
      selectedThread={selectedThread}
      setSelectedThread={setSelectedThread}
      threads={threads}
    >
      <div
        className="col-group flex flex-row gap-5"
        data-viewmode={showUnresolved ? 'open' : 'resolved'}
      >
        <div className="main">
          {/* Editor with MenuBar */}
          <div className="editor-container">
            <EditorMenuBar
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              editor={editor}
              createThread={createThread}
              finishContract={finishContract}
            />
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar for comments */}
        <div className="lg:w-[40%] flex-shrink border border-lightGray rounded-md p-3">
          <div className="sidebar-options">
            <div className="option-group">
              <div className="text-lg font-medium mb-2">Comments</div>
              <ToggleButton
                option={showUnresolved}
                setOption={setShowUnresolved}
              />
            </div>
            <ThreadsList provider={provider} threads={filteredThreads} />
          </div>
        </div>
      </div>
    </ThreadsProvider>
  );
}
