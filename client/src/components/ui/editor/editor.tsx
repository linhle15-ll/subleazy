'use client';

import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import TaskItem from '@tiptap/extension-task-item';
import { MenuBar } from './menu-bar';
import { content } from './content';
import './styles.scss';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),

  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TaskItem.configure({
    nested: true,
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export default function TiptapEditor() {
  return (
    <div className="editor-container">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        immediatelyRender={false}
      />
    </div>
  );
}
