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
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { ExportDocx } from '@tiptap-pro/extension-export-docx';
import Image from '@tiptap/extension-image';
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
import * as Y from 'yjs';

// Hooks
import { useUser } from '@/hooks/use-user';
import { useThreads } from '@/hooks/use-threads';
import { useGroupMembers } from '@/hooks/use-groups';

/// Components and Styling
import EditorMenuBar from './menu-bar';
import { content } from './content';
import { ThreadsList } from './comment-thread/thread-list';
import Loading from '@/components/ui/commons/loading';
import ToggleButton from '@/components/ui/button/toogle-btn';
import './styles.scss';
import { ThreadsProvider } from './context';
import { SidebarRulesSection } from './AI-suggestion-extension/sidebar-rules-section';
import { LoadingState } from './AI-suggestion-extension/loading-state';
import { ErrorState } from './AI-suggestion-extension/error-state';
import { RulesModal } from './AI-suggestion-extension/rules-modal';
import { SuggestionTooltip } from './AI-suggestion-extension/suggestion-tooltip';
import { MessageSquareMore } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/commons/tooltip';
import { X } from 'lucide-react';

// Editor store
import { useEditorStore } from '@/stores/editor.store';
import { useUserStore } from '@/stores/user.store';

// Services
import contractService from '@/services/contract.service';
import { initialRules } from './AI-suggestion-extension/initial-rules';

import { Decoration } from '@tiptap/pm/view';
import AiSuggestion from '@tiptap-pro/extension-ai-suggestion';

export default function Editor({
  initialContent,
  groupId,
}: {
  initialContent?: string | null;
  groupId?: string;
}) {
  const DOCUMENT_ID = `contract-${groupId}`;
  const [doc] = React.useState(() => new Y.Doc());

  const storedUser = useUserStore((state) => state.user);
  const { data: userData } = useUser(storedUser?._id ?? '');
  const currentUser = userData?.data;

  const { color } = useUser(currentUser?._id ?? '');
  const { data: groupMembers } = useGroupMembers(groupId);
  const [showUnresolved, setShowUnresolved] = React.useState<boolean>(true);
  const [selectedThread, setSelectedThread] = React.useState(null);
  const [hasInitialized, setHasInitialized] = React.useState(false);
  const [contractData, setContractData] = React.useState<{
    _id: string;
    title: string;
    content: string;
    sublessor: string;
    sublessees: string[];
    group: string;
  } | null>(null);
  const [fetchingContract, setFetchingContract] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [rules, setRules] = React.useState(initialRules);
  const [tooltipElement, setTooltipElement] =
    React.useState<HTMLSpanElement | null>(null);
  const [isAISuggestion, setIsAISuggestion] = React.useState(false);
  const {
    isLoading,
    setIsLoading,
    updateContent,
    contractName,
    documentData,
    setContractName,
  } = useEditorStore();

  type Thread = {
    id: string;
    resolvedAt?: Date | null;
    [key: string]: unknown;
  };
  const threadsRef = React.useRef<Thread[]>([]);
  const [provider, setProvider] = React.useState<TiptapCollabProvider | null>(
    null
  );

  const [sublessorSignature, setSublessorSignature] = React.useState('');
  const [sublessorSigned, setSublessorSigned] = React.useState(false);
  const [sublesseesSignatures, setSublesseesSignatures] = React.useState<
    string[]
  >([]);
  const [sublesseesSigned, setSublesseesSigned] = React.useState<boolean[]>([]);
  const handleSublesseeSignatureChange = (idx: number, value: string) => {
    setSublesseesSignatures((sigs) => {
      const copy = [...sigs];
      copy[idx] = value;
      return copy;
    });
  };

  const handleSublesseeSign = async (idx: number) => {
    if (!groupId || !groupMembers) return;

    try {
      // Update local state first
      setSublesseesSigned((signed) => {
        const copy = [...signed];
        copy[idx] = true;
        return copy;
      });

      // Prepare updated signatures array
      const updatedSignatures = [...sublesseesSignatures];
      updatedSignatures[idx] = sublesseesSignatures[idx] || '';

      // Update contract with new signatures
      const result = await contractService.updateContractByGroupId(groupId, {
        sublesseesSignatures: updatedSignatures,
      });

      if (result.success) {
        console.log('Sublessee signature updated successfully');
        // Update local contract data
        setContractData(result.data);
      } else {
        console.error('Failed to update sublessee signature:', result.error);
        // Revert local state on failure
        setSublesseesSigned((signed) => {
          const copy = [...signed];
          copy[idx] = false;
          return copy;
        });
      }
    } catch (error) {
      console.error('Error updating sublessee signature:', error);
      // Revert local state on error
      setSublesseesSigned((signed) => {
        const copy = [...signed];
        copy[idx] = false;
        return copy;
      });
    }
  };

  const handleSublessorSign = async () => {
    if (!groupId) return;

    try {
      // Update local state first
      setSublessorSigned(true);

      // Update contract with sublessor signature
      const result = await contractService.updateContractByGroupId(groupId, {
        sublessorSignature: sublessorSignature || '',
      });

      if (result.success) {
        console.log('Sublessor signature updated successfully');
        // Update local contract data
        setContractData(result.data);
      } else {
        console.error('Failed to update sublessor signature:', result.error);
        // Revert local state on failure
        setSublessorSigned(false);
      }
    } catch (error) {
      console.error('Error updating sublessor signature:', error);
      // Revert local state on error
      setSublessorSigned(false);
    }
  };

  // Create provider ONCE
  React.useEffect(() => {
    if (!groupId) return;
    const newProvider = new TiptapCollabProvider({
      name: DOCUMENT_ID,
      appId: process.env.NEXT_PUBLIC_TIPTAP_PRO_APPID!,
      token: process.env.NEXT_PUBLIC_TIPTAP_PRO_TOKEN!,
      document: doc,
      onOpen() {
        console.log('WebSocket connection opened.');
      },
      onConnect() {
        console.log('Connected to the server.');
      },
    });
    setProvider(newProvider);

    return () => {
      console.log(`Cleaning up provider for ${DOCUMENT_ID}`);
      newProvider.destroy();
    };
  }, [groupId]);

  // Fetch contract data on component mount
  React.useEffect(() => {
    const fetchContractByGroup = async () => {
      setFetchingContract(true);
      console.log('Starting to fetch contract for groupId:', groupId);

      try {
        const result = await contractService.getContractByGroupId(
          groupId ?? ''
        );

        console.log('Contract fetch result:', result);

        if (result.success && result.data) {
          console.log('Contract fetched successfully:', result.data);
          setContractData(result.data);
          setContractName(result.data.title || '');

          // Initialize signature states based on existing signatures
          if (result.data.sublessorSignature) {
            console.log(
              'Setting sublessor signature:',
              result.data.sublessorSignature
            );
            setSublessorSignature(result.data.sublessorSignature);
            setSublessorSigned(true);
          }

          if (
            result.data.sublesseesSignatures &&
            result.data.sublesseesSignatures.length > 0
          ) {
            console.log(
              'Setting sublessee signatures:',
              result.data.sublesseesSignatures
            );
            setSublesseesSignatures(result.data.sublesseesSignatures);
            // Mark as signed if signature is not empty
            const signedStates = result.data.sublesseesSignatures.map(
              (sig) => sig && sig.trim() !== ''
            );
            console.log('Sublessee signed states:', signedStates);
            setSublesseesSigned(signedStates);
          }
        } else {
          console.log('No contract found for group or error:', result.error);
          setContractName('');
        }
      } catch (error) {
        console.error('Error fetching contract:', error);
      } finally {
        setFetchingContract(false);
      }
    };

    fetchContractByGroup();
  }, [groupId, setContractName]);

  const editor = useEditor(
    {
      extensions: [
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

        AiSuggestion.configure({
          appId: process.env.NEXT_PUBLIC_TIPTAP_PRO_APPID!,
          token: process.env.NEXT_PUBLIC_TIPTAP_PRO_TOKEN!,
          // baseUrl: process.env.NEXT_PUBLIC_AI_BASE_URL!,
          rules,
          getCustomSuggestionDecoration({
            suggestion,
            isSelected,
            getDefaultDecorations,
          }) {
            const decorations = getDefaultDecorations();

            if (isSelected && !suggestion.isRejected) {
              decorations.push(
                Decoration.widget(suggestion.deleteRange.to, () => {
                  const element = document.createElement('span');

                  setTooltipElement(element);
                  return element;
                })
              );
            }
            return decorations;
          },
        }),
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

        ExportDocx.configure({
          onCompleteExport: (result: any | Buffer<ArrayBufferLike> | Blob) => {
            setIsLoading(false);
            const blob = new Blob([result], {
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = 'export.docx';
            a.click();
            URL.revokeObjectURL(url);
          },
        }),
        Link,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        // Conditionally add collaboration extensions only when provider is ready
        ...(provider
          ? [
              Collaboration.configure({
                document: doc,
              }),
              CollaborationCursor.configure({
                provider,
                user: {
                  name: `${currentUser?.firstName ?? ''} ${currentUser?.lastName ?? ''}`.trim(),
                  color: color,
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

                    if (
                      !threadId ||
                      isResolved ||
                      !editor ||
                      !editor.isEditable
                    ) {
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
            ]
          : []),
        Placeholder.configure({
          placeholder: contractData?.content
            ? 'Edit your contract...'
            : initialContent
              ? 'Edit your imported document...'
              : 'Start writing your own contract here ...',
          emptyEditorClass: 'is-editor-empty',
        }),
      ],
      immediatelyRender: false,
      shouldRerenderOnTransaction: true,
      // content: editorContent,
      onCreate: ({}) => {
        setHasInitialized(true);
      },

      onUpdate: ({ editor }) => {
        updateContent(editor.getHTML());
      },

      editorProps: {
        attributes: {
          spellcheck: 'false',
        },
      },
    },
    [provider, currentUser, color]
  );

  // Initially set content, by order of priority: uploaded doc from scan > default template > null editor

  const editorContent =
    documentData?.content || contractData?.content || content;

  // React will re-create the component (and the editor) from scratch if its key changes
  const editorKey = React.useMemo(() => `editor-${groupId}`, [groupId]);

  // Meoww, fixed bug editor content got duplicated every reload
  React.useEffect(() => {
    if (!editor || !provider || !hasInitialized) return;

    // Wait for provider to sync first
    const handleSynced = () => {
      const yText = doc.getText('sync text');
      const currentLength = yText.length;

      // Only set initial content if the collaborative document is empty
      if (currentLength === 0) {
        if (contractData?.content) {
          yText.insert(0, contractData?.content ?? initialContent ?? content);
        }
      }
    };

    // Check if already synced
    if (provider.isSynced) {
      handleSynced();
    } else {
      provider.on('synced', handleSynced);
    }

    // Cleanup
    return () => {
      provider.off('synced', handleSynced);
    };
  }, [editor, hasInitialized, contractData, initialContent, provider]);

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
  } = useThreads(provider, editor, currentUser);

  if (!editor || fetchingContract) {
    return (
      <div className="editor-container">
        <Loading />
        {fetchingContract && (
          <div className="text-center text-gray-600 mt-2">
            Loading contract data...
          </div>
        )}
      </div>
    );
  }

  threadsRef.current = threads || [];

  const filteredThreads = threads.filter((t: Thread) =>
    showUnresolved ? !t.resolvedAt : !!t.resolvedAt
  );

  const finishContract = async () => {
    if (!editor) {
      console.error('Editor not available');
      return;
    }

    if (!contractData || !groupId) {
      console.error('No contract data or group ID available');
      return;
    }

    try {
      setIsLoading(true);

      // Get the current content from the editor
      const content = editor.getHTML();

      if (!content || content.trim() === '') {
        console.error('No content to save');
        return;
      }

      console.log(`Finishing contract`);

      // Prepare signatures data
      const signatures =
        groupMembers?.map((member, idx) => {
          if (idx === 0) {
            // Sublessor signature
            return sublessorSignature || '';
          } else {
            // Sublessee signature
            return sublesseesSignatures[idx - 1] || '';
          }
        }) || [];

      // Update the contract
      const updateData = {
        title: contractData.title,
        content,
        sublessorSignature: signatures[0],
        sublesseesSignatures: signatures.slice(1),
        status: 'completed',
      };

      // Ensure status is typed correctly for ContractUpdateData
      const result = await contractService.updateContractByGroupId(groupId, {
        ...updateData,
        status: 'completed' as const,
      });
      if (result.success) {
        console.log('Contract finished successfully:', result.data);
        // Update local contract data, ensuring result.data is defined
        if (result.data) {
          setContractData(result.data);
        } else {
          console.error('No contract data returned after finishing contract.');
        }
      } else {
        console.error('Failed to finish contract:', result.error);
      }
    } catch (error) {
      console.error('Error finishing contract:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-group flex flex-row gap-5">
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
                contractName={contractName}
                setContractName={setContractName}
              />

              <div className="flex-col gap-2">
                <EditorContent editor={editor} key={editorKey} />
                <SuggestionTooltip element={tooltipElement} editor={editor} />

                {/* Group Members Section */}
                {groupMembers && groupMembers.length > 0 && (
                  <div className="flex flex-col p-6 border rounded bg-blue-50">
                    <div className="text-lg font-semibold pb-4 text-gray-800">
                      Group Members
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {groupMembers.map((member) => (
                        <div
                          key={member._id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border"
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {member.profileImage ? (
                              <img
                                src={member.profileImage}
                                alt={`${member.firstName} ${member.lastName}`}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 font-medium">
                                {member.firstName.charAt(0)}
                                {member.lastName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900 truncate">
                                {member.firstName} {member.lastName}
                              </p>
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                                {groupMembers.indexOf(member) === 0
                                  ? 'Sublessor'
                                  : 'Sublessee'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Signature fields for sublessor and sublessees */}
                <div className="flex flex-col gap-4 mt-6 p-4 border rounded bg-gray-50">
                  {/* Sublessees & sublessor signatures */}
                  {groupMembers?.map((member, idx) => {
                    // Use local "signed" state, not the value itself
                    const isSigned =
                      idx === 0 ? sublessorSigned : sublesseesSigned[idx - 1];

                    return (
                      <div
                        key={member._id}
                        className="flex flex-row items-center gap-2"
                      >
                        <div className="flex flex-col gap-1 w-80">
                          <label className="font-medium">
                            {member.firstName} {member.lastName} Signature:
                          </label>
                          <span className="text-xs text-gray-500 font-medium">
                            {idx === 0 ? 'Sublessor' : 'Sublessee'}
                          </span>
                        </div>
                        <input
                          type="text"
                          className={`text-field w-full transition-opacity duration-300 ${
                            isSigned ? 'opacity-50' : 'opacity-100'
                          }`}
                          value={
                            idx === 0
                              ? sublessorSignature
                              : sublesseesSignatures[idx - 1] || ''
                          }
                          onChange={(e) => {
                            if (idx === 0) {
                              setSublessorSignature(e.target.value);
                            } else {
                              handleSublesseeSignatureChange(
                                idx - 1,
                                e.target.value
                              );
                            }
                          }}
                          disabled={currentUser?._id !== member._id || isSigned}
                          placeholder="Enter your signature"
                        />
                        <button
                          className="btn btn-primary"
                          disabled={currentUser?._id !== member._id || isSigned}
                          onClick={() => {
                            if (idx === 0) {
                              handleSublessorSign();
                            } else {
                              handleSublesseeSign(idx - 1);
                            }
                          }}
                        >
                          {isSigned ? 'Signed' : 'Confirm'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
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
              <ThreadsList
                provider={provider}
                threads={filteredThreads}
                user={currentUser}
              />
            </div>
          </div>
        </div>
      </ThreadsProvider>

      {!isAISuggestion && (
        <button
          className="text-primaryOrange mt-6 flex items-start"
          onClick={() => setIsAISuggestion(!isAISuggestion)}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <MessageSquareMore size={30} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Easier Contract process with AI!</p>
            </TooltipContent>
          </Tooltip>
        </button>
      )}

      {isAISuggestion && (
        <>
          <RulesModal
            rules={rules}
            onSae={(newRules: any) => {
              setRules(newRules);
              editor
                .chain()
                .setAiSuggestionRules(newRules)
                .loadAiSuggestions()
                .run();
              setIsModalOpen(false);
            }}
            onClose={() => {
              setIsModalOpen(false);
            }}
            isOpen={isModalOpen}
          />

          <div>
            <LoadingState
              show={editor.extensionStorage.aiSuggestion.isLoading}
            />
            <ErrorState
              show={
                !editor.extensionStorage.aiSuggestion.isLoading &&
                editor.extensionStorage.aiSuggestion.error
              }
              onReload={() => editor.commands.loadAiSuggestions()}
            />
          </div>
          <div className="sidebar">
            <div className="sidebar-header">
              <button onClick={() => setIsAISuggestion(false)}>
                <X size={20} />
              </button>
              <div className="text-lg font-medium mb-2">Suggestion rules</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn-secondary p-1 border border-gray-400 hover:border-gray-600"
                >
                  Manage rules
                </button>
                <button
                  type="button"
                  onClick={() => editor.commands.applyAllAiSuggestions()}
                  className="btn-secondary p-1 border border-gray-400 hover:border-gray-600"
                >
                  Apply all suggestions
                </button>
              </div>
            </div>
            <div className="sidebar-scroll">
              <SidebarRulesSection
                rules={rules}
                suggestions={editor.extensionStorage.aiSuggestion.getSuggestions()}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
