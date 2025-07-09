import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface DocumentData {
  content: string;
  filename: string;
  originalSize: number;
  uploadedAt: Date;
  contentType: 'docx' | 'template' | 'manual';
}

interface EditorStore {
  // Document data
  documentData: DocumentData | null;
  setDocumentData: (data: DocumentData) => void;
  clearDocumentData: () => void;
  hasDocument: boolean;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;

  updateContent: (content: string) => void;
  getContent: () => string | null;
}

export const useEditorStore = create<EditorStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      documentData: null,
      setDocumentData: (data: DocumentData) => {
        console.log('Setting document data in store:', {
          filename: data.filename,
          contentLength: data.content.length,
          contentType: data.contentType,
          uploadedAt: data.uploadedAt,
        });
        set({
          documentData: data,
          error: null,
        });
      },
      clearDocumentData: () => {
        console.log('Clearing document data from store');
        set({ documentData: null });
      },
      get hasDocument() {
        return get().documentData !== null;
      },

      isLoading: false,
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),

      error: null,
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),

      updateContent: (content: string) => {
        const currentData = get().documentData;
        if (currentData) {
          set({
            documentData: {
              ...currentData,
              content,
              uploadedAt: new Date(),
            },
          });
        }
      },
      getContent: () => {
        const data = get().documentData;
        return data ? data.content : null;
      },
    })),
    {
      name: 'editor-store',
    }
  )
);

export const useDocumentData = () =>
  useEditorStore((state) => state.documentData);
export const useHasDocument = () =>
  useEditorStore((state) => state.hasDocument);
export const useEditorLoading = () =>
  useEditorStore((state) => state.isLoading);
export const useEditorError = () => useEditorStore((state) => state.error);
