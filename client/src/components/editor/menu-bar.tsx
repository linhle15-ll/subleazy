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
} from "@/components/ui/commons/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/commons/select"

import { content } from './content';

const ConfigBar = ({ isLoading, setIsLoading, editor, createThread } : { isLoading: boolean, setIsLoading: any, editor: any, createThread: any}) => {
  const importRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<Error | null>(null);

  if (!editor) return null;

  const createExport = React.useCallback(() => {
    setIsLoading(true)
    editor.chain().exportDocx().run()
  }, [editor])

  const handleTemplateImport = React.useCallback(async() => {
    try {
      editor.chain().focus().setContent(content).run();
    } catch (error) {
      setError(new Error('Failed to load template'));
    }

  }, [editor])

  const handleImportClick = React.useCallback(() => {
    importRef?.current?.click()
  }, [])

  const handleImportFilePick = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (importRef.current) {
        importRef.current.value = ''
      }
      if (!file) {
        return
      }

      setIsLoading(true)
      setError(null)
      
      editor
        .chain()
        .importDocx({
          file,
          onImport(context: any) {
            if (context.error) {
              setError(context.error)
              setIsLoading(false)
              return
            }
            // Set the imported content to the editor
            console.log("CONTEXT CONTENT", context.content)
            context.setEditorContent(context.content)
            setError(null)
            setIsLoading(false)
          },
        })
        .run()
    },
    [editor],
  )

  return (
    <div className="menu-bar">
      <input 
        onChange={handleImportFilePick} 
        type="file" 
        ref={importRef} 
        style={{ display: 'none' }} 
      />
      <div className="menu-group">
        <button disabled={editor.isEmpty} onClick={createExport} className='btn-secondary'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Upload size={16} /> 
            </TooltipTrigger>
            <TooltipContent>
                <p>Export DOCX file</p>
            </TooltipContent>
          </Tooltip>
        </button>

        <button onClick={handleImportClick} className='btn-secondary'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Import size={16} /> 
            </TooltipTrigger>
            <TooltipContent>
                <p>Import DOCX file</p>
            </TooltipContent>
          </Tooltip>
        </button>

        <button onClick={handleTemplateImport} className='btn-secondary'>
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
          className='flex gap-1 btn-secondary'
        >
          <MessageCircle size={16} /> Add comment
        </button>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className='flex gap-1 btn-primary'>
              <FileCheck2 size={20} /> Finish contract
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className='text-red-600 text-md'>Please make sure your contract content.<br /> This contract is ineditable after finished.</p>
          </TooltipContent>
        </Tooltip>
      </div>
     
      {isLoading && <div className="hint purple-spinner">Processing...</div>}
      {error && <div className="hint error">{error.message}</div>}
    </div>
  )
}

const MenuBar = ({ editor } : {editor: any}) => {

  if (!editor) {
    return null;
  }

  const handleTableAction = (value: string) => {
  switch (value) {
    case 'create-table':
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      break;
    case "add-column-before":
      editor.chain().focus().addColumnBefore().run();
      break;
    case "add-column-after":
      editor.chain().focus().addColumnAfter().run()
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
          <ListTodo size={16}/>
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

      <div className='menu-group'>
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
            <SelectItem value="toggle-header-column">Toggle header column</SelectItem>
            <SelectItem value="toggle-header-row">Toggle header row</SelectItem>
            <SelectItem value="toggle-header-cell">Toggle header cell</SelectItem>
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

export default function EditorMenuBar ({ isLoading, setIsLoading, editor, createThread } : { isLoading: boolean, setIsLoading: any, editor: any, createThread: any}) {
  return (
    <div>
      <ConfigBar isLoading={isLoading} setIsLoading={setIsLoading} editor={editor} createThread={createThread} />
      <MenuBar editor={editor} />
    </div>
  )
}
