import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface DocumentData {
  content: string;
  filename: string;
  originalSize: number;
  uploadedAt: Date;
  contentType: 'docx' | 'template' | 'manual' | 'string';
}

interface EditorStore {
  // Document data
  documentData: DocumentData | null;
  setDocumentData: (data: DocumentData) => void;
  clearDocumentData: () => void;
  hasDocument: boolean;

  // Editor state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Error handling
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Editor content operations
  updateContent: (content: string) => void;
  getContent: () => string | null;
}

export const useEditorStore = create<EditorStore>()(
  devtools(
    subscribeWithSelector(
      (set, get) => ({
        // Document data
        documentData: null,
        setDocumentData: (data: DocumentData) => {
          console.log('Setting document data in store:', {
            filename: data.filename,
            contentLength: data.content.length,
            contentType: data.contentType,
            uploadedAt: data.uploadedAt
          });
          set({ 
            documentData: data,
            error: null // Clear any previous errors
          });
        },
        clearDocumentData: () => {
          console.log('Clearing document data from store');
          set({ documentData: null });
        },
        get hasDocument() {
          return get().documentData !== null;
        },

        // Editor state
        isLoading: false,
        setIsLoading: (loading: boolean) => set({ isLoading: loading }),

        // Error handling
        error: null,
        setError: (error: string | null) => set({ error }),
        clearError: () => set({ error: null }),

        // Editor content operations
        updateContent: (content: string) => {
          const currentData = get().documentData;
          if (currentData) {
            set({
              documentData: {
                ...currentData,
                content,
                uploadedAt: new Date() // Update timestamp when content changes
              }
            });
          }
        },
        getContent: () => {
          const data = get().documentData;
          return data ? data.content : null;
        },
      })
    ),
    {
      name: 'editor-store'
    }
  )
);

// Selector hooks for better performance
export const useDocumentData = () => useEditorStore((state) => state.documentData);
export const useHasDocument = () => useEditorStore((state) => state.hasDocument);
export const useEditorLoading = () => useEditorStore((state) => state.isLoading);
export const useEditorError = () => useEditorStore((state) => state.error);