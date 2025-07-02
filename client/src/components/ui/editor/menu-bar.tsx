'use client';

import { useCurrentEditor } from '@tiptap/react';
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
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListTree,
} from 'lucide-react';
import React from 'react';
import './styles.scss';

export const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

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
        {/* <button
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    className={editor.isActive('taskList') ? 'is-active' : ''}
                >
                    <ListTodo size={16}/>
                </button> */}

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

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Clear formatting */}
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Clear Marks"
        >
          <EraserIcon size={16} />
        </button>

        {/* <button 
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    title="Clear Nodes"
                >
                    <Eraser size={16} />
                </button> */}
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

      <div className="menu-divider"></div>

      <div className="menu-group">
        {/* Color options */}
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={
            editor.isActive('textStyle', { color: '#958DF1' })
              ? 'is-active'
              : ''
          }
          title="Purple Text"
        >
          <Palette size={16} style={{ color: '#958DF1' }} />
        </button>
      </div>
    </div>
  );
};
