'use client';
import {
  BoldIcon,
  CodeIcon,
  EraserIcon,
  ItalicIcon,
  StrikethroughIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  FileCode,
  Quote,
  Minus,
  CornerDownLeft,
  Undo,
  Redo,
  Baseline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListTree,
  Import,
  LayoutTemplate,
  Underline,
  Highlighter,
  Upload,
  MessageCircle,
  ListTodo,
  FileCheck2,
} from 'lucide-react';
import React from 'react';
import './styles.scss';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/commons/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/commons/select';

import { content } from './content';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ConfigBar = ({
  isLoading,
  setIsLoading,
  editor,
  createThread,
  finishContract,
  contractName,
  setContractName,
  groupId,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  editor: any;
  createThread: any;
  finishContract: any;
  contractName: string;
  setContractName: (name: string) => void;
  groupId: string;
}) => {
  const importRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [saving, setSaving] = React.useState(false);

  if (!editor) return null;

  const createExport = React.useCallback(() => {
    setIsLoading(true);
    editor.chain().exportDocx().run();
  }, [editor]);

  const handleTemplateImport = React.useCallback(async () => {
    try {
      editor.chain().focus().setContent(content).run();
    } catch (error) {
      setError(new Error('Failed to load template'));
    }
  }, [editor]);

  const handleImportClick = React.useCallback(() => {
    importRef?.current?.click();
  }, []);

  const handleImportFilePick = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (importRef.current) {
        importRef.current.value = '';
      }
      if (!file) {
        return;
      }

      if (!file.name.match(/\.(docx|doc)$/i)) {
        setError(new Error('Please select a valid DOCX or DOC file'));
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml(
          { arrayBuffer },
          {
            styleMap: [
              "p[style-name='Aside Heading'] => div.aside > h2:fresh",
              "p[style-name='Aside Text'] => div.aside > p:fresh",
              "p[style-name='Section Title'] => h1:fresh",
              "p[style-name='Subsection Title'] => h2:fresh",
            ],
            includeDefaultStyleMap: false,
            convertImage: mammoth.images.imgElement(function (image) {
              return image.read('base64').then(function (imageBuffer) {
                return {
                  src: 'data:' + image.contentType + ';base64,' + imageBuffer,
                };
              });
            }),
          }
        );

        editor.chain().focus().setContent(result.value).run();

        if (result.messages && result.messages.length > 0) {
          console.log('Conversion messages:', result.messages);
        }
      } catch (error: any) {
        console.error('Error importing DOCX:', error);
        setError(new Error(`Failed to import document: ${error.message}`));
      } finally {
        setIsLoading(false);
      }
    },
    [editor, setIsLoading, setError]
  );

  return (
    <div className="menu-bar">
      <input
        onChange={handleImportFilePick}
        type="file"
        ref={importRef}
        accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
        style={{ display: 'none' }}
      />
      <div className="menu-group flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            disabled={editor.isEmpty}
            onClick={createExport}
            className="btn-secondary"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Upload size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Export DOCX file</p>
              </TooltipContent>
            </Tooltip>
          </button>

          <button onClick={handleImportClick} className="btn-secondary">
            <Tooltip>
              <TooltipTrigger asChild>
                <Import size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Import DOCX file</p>
              </TooltipContent>
            </Tooltip>
          </button>

          <button onClick={handleTemplateImport} className="btn-secondary">
            <Tooltip>
              <TooltipTrigger asChild>
                <LayoutTemplate size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Import template contract</p>
              </TooltipContent>
            </Tooltip>
          </button>

          <button
            onClick={createThread}
            disabled={!editor || !editor.isEditable}
            className="flex gap-1 btn-secondary"
          >
            <MessageCircle size={16} /> Add comment
          </button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/dashboard/{userIdFromParams}/groups/{groupIdFromParams}/contract/finish-contract`}
              >
                <button
                  className="flex gap-1 btn-primary"
                  onClick={finishContract}
                >
                  <FileCheck2 size={20} /> Finish contract
                </button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-red-500 text-md">
                Please make sure your contract content.
                <br /> This contract is ineditable after finished.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="menu-group flex-row gap-2">
        <p>Contract Name:</p>
        <input
          id="contract-name"
          type="text"
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
          className="text-field w-80"
          placeholder="Enter contract name"
        />
        <button
          className="btn btn-primary"
          disabled={saving || !contractName.trim()}
          onClick={async () => {
            setSaving(true);
            try {
              const result = await (
                await import('@/services/contract.service')
              ).default.updateContractByGroupId(groupId, {
                title: contractName,
              });
              console.log('Save contract name result:', result);
              if (!result.success) {
                alert('Failed to save contract name: ' + result.error);
              } else {
                alert('Contract name saved!');
              }
            } catch (err: any) {
              console.error('Error saving contract name:', err);
              alert('Error saving contract name: ' + err.message);
            } finally {
              setSaving(false);
            }
          }}
        >
          Save
        </button>
      </div>

      {error && <div className="hint error">{error.message}</div>}
    </div>
  );
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const handleTableAction = (value: string) => {
    switch (value) {
      case 'create-table':
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run();
        break;
      case 'add-column-before':
        editor.chain().focus().addColumnBefore().run();
        break;
      case 'add-column-after':
        editor.chain().focus().addColumnAfter().run();
        break;
      case 'delete-column':
        editor.chain().focus().deleteColumn().run();
        break;
      case 'add-row-before':
        editor.chain().focus().addRowBefore().run();
        break;
      case 'add-row-after':
        editor.chain().focus().addRowAfter().run();
        break;
      case 'delete-row':
        editor.chain().focus().deleteRow().run();
        break;
      case 'delete-table':
        editor.chain().focus().deleteTable().run();
        break;
      case 'merge-cells':
        editor.chain().focus().mergeCells().run();
        break;
      case 'split-cell':
        editor.chain().focus().splitCell().run();
        break;
      case 'toggle-header-column':
        editor.chain().focus().toggleHeaderColumn().run();
        break;
      case 'toggle-header-row':
        editor.chain().focus().toggleHeaderRow().run();
        break;
      case 'toggle-header-cell':
        editor.chain().focus().toggleHeaderCell().run();
        break;
      case 'merge-or-split':
        editor.chain().focus().mergeOrSplit().run();
        break;
      case 'fix-tables':
        editor.chain().focus().fixTables().run();
        break;
      default:
        break;
    }
  };

  return (
    <div className="menu-bar">
      <div className="menu-group">
        {/* Font styling: bold, italic, underline, strike */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold"
        >
          <BoldIcon size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic"
        >
          <ItalicIcon size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic"
        >
          <Underline size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="Strikethrough"
        >
          <StrikethroughIcon size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
          title="Inline Code"
        >
          <CodeIcon size={16} />
        </button>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Headings and paragraph */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
          title="Paragraph"
        >
          P
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
          }
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <AlignRight size={16} />
        </button>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Task list */}
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'is-active' : ''}
        >
          <ListTodo size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().sinkListItem('taskItem').run()}
          disabled={!editor.can().sinkListItem('taskItem')}
        >
          <ListTree size={16} />
        </button>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Code block and blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          title="Code Block"
        >
          <FileCode size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Utility buttons */}
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          title="Line Break"
        >
          <CornerDownLeft size={16} />
        </button>
      </div>

      <div className="menu-group">
        <Select onValueChange={(value) => handleTableAction(value)}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Table Actions" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="create-table">Create table</SelectItem>
            <SelectItem value="add-column-before">Add column before</SelectItem>
            <SelectItem value="add-column-after">Add column after</SelectItem>
            <SelectItem value="delete-column">Delete column</SelectItem>
            <SelectItem value="add-row-before">Add row before</SelectItem>
            <SelectItem value="add-row-after">Add row after</SelectItem>
            <SelectItem value="delete-row">Delete row</SelectItem>
            <SelectItem value="delete-table">Delete table</SelectItem>
            <SelectItem value="merge-cells">Merge cells</SelectItem>
            <SelectItem value="split-cell">Split cell</SelectItem>
            <SelectItem value="toggle-header-column">
              Toggle header column
            </SelectItem>
            <SelectItem value="toggle-header-row">Toggle header row</SelectItem>
            <SelectItem value="toggle-header-cell">
              Toggle header cell
            </SelectItem>
            <SelectItem value="merge-or-split">Merge or split</SelectItem>
            <SelectItem value="fix-tables">Fix tables</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Clear formatting */}
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Clear Marks"
        >
          <EraserIcon size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'is-active' : ''}
        >
          <Highlighter size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().setColor('#df2c14').run()}
          className={
            editor.isActive('textStyle', { color: '#df2c14' })
              ? 'is-active'
              : ''
          }
          title="Red Text"
        >
          <Baseline size={16} style={{ color: '#df2c14' }} />
        </button>
      </div>

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo"
        >
          <Undo size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>
    </div>
  );
};

export default function EditorMenuBar({
  isLoading,
  setIsLoading,
  editor,
  createThread,
  finishContract,
  contractName,
  setContractName,
  groupId,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  editor: any;
  createThread: any;
  finishContract: any;
  contractName: string;
  setContractName: (name: string) => void;
  groupId: string;
}) {
  const params = useParams();
  const groupIdFromParams = params?.groupId as string;
  const userIdFromParams = params?.userId as string;

  return (
    <div>
      <ConfigBar
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        editor={editor}
        createThread={createThread}
        finishContract={finishContract}
        contractName={contractName}
        setContractName={setContractName}
        groupId={groupIdFromParams}
      />
      <MenuBar editor={editor} />
    </div>
  );
}
