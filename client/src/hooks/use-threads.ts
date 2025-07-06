'use client'
import React from 'react'
import { subscribeToThreads } from "@tiptap-pro/extension-comments";
import { Editor } from '@tiptap/react';
import { hoverOffThread, hoverThread } from '@tiptap-pro/extension-comments'

export const useThreads = (provider: any, editor: Editor | null, user: any) => {
    const [threads, setThreads] = React.useState<any[]>([])
    
    React.useEffect(() => {
        if (!provider || !editor) return;
        
        const unsubscribe = subscribeToThreads({
            provider,
            callback: currentThreads => {
                setThreads(currentThreads || [])
            }
        })

        return () => unsubscribe()
    
    }, [provider, editor]) // Add editor to dependencies

    const createThread = React.useCallback(() => {
        if (!editor || !editor.isEditable) return

        console.log("Create Thread")

        const input = window.prompt('Comment content')
        if (!input) return

        try {
            // Check if editor has valid selection
            const { from, to } = editor.state.selection
            if (from < 0 || to > editor.state.doc.content.size) {
                console.warn('Invalid selection range')
                return
            }

            editor.chain().focus().setThread({ 
                content: input, 
                commentData: { userName: user?.name || 'Anonymous' } 
            }).run()
        } catch (error) {
            console.error('Failed to create thread:', error)
        }
    }, [editor, user])

    const selectThreadInEditor = React.useCallback((threadId: any) => {
        editor?.chain().selectThread({ id: threadId }).run
    }, [editor])

    const deleteThread = React.useCallback((threadId: any) => {
        if (!threadId || !provider) return
        
        try {
            provider.deleteThread(threadId)
            if (editor && editor.isEditable && !editor.isDestroyed) {
                // Validate document state before removing thread
                const doc = editor.state.doc
                if (doc && doc.content) {
                    editor.commands.removeThread({ id: threadId })
                }
            }
        } catch (error) {
            console.warn('Failed to delete thread:', error)
        }
    }, [editor, provider])
        
    const resolveThread = React.useCallback((threadId: any) => {
        if (!threadId || !editor || !editor.isEditable || editor.isDestroyed) return
        
        try {
            editor.commands.resolveThread({ id: threadId })
        } catch (error) {
            console.warn('Failed to resolve thread:', error)
        }
    }, [editor])

    const unresolveThread = React.useCallback((threadId: any) => {
        if (!threadId || !editor || !editor.isEditable || editor.isDestroyed) return
        
        try {
            editor.commands.unresolveThread({ id: threadId })
        } catch (error) {
            console.warn('Failed to unresolve thread:', error)
        }
    }, [editor])

    const onHoverThread = React.useCallback((threadId: any) => {
        if (!threadId || !editor || editor.isDestroyed) return
        
        try {
            hoverThread(editor, [threadId])
        } catch (error) {
            console.warn('Failed to hover thread:', error)
        }
    }, [editor])

    const onLeaveThread = React.useCallback(() => {
        if (!editor || editor.isDestroyed) return
        
        try {
            hoverOffThread(editor)
        } catch (error) {
            console.warn('Failed to leave thread:', error)
        }
    }, [editor])

    const updateComment = React.useCallback((threadId: any, commentId: any, content: any, metaData: any) => {
        if (!threadId || !commentId || !editor || !editor.isEditable || editor.isDestroyed) return
        
        try {
            editor.commands.updateComment({
                threadId, 
                id: commentId, 
                content, 
                data: metaData
            })
        } catch (error) {
            console.warn('Failed to update comment:', error)
        }
    }, [editor])
    
    return { 
        threads, 
        createThread, 
        selectThreadInEditor,
        deleteThread, 
        resolveThread, 
        unresolveThread, 
        onHoverThread, 
        onLeaveThread, 
        updateComment 
    }
}