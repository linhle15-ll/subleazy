'use client';

import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/commons/tabs';
import PostEditorSidebarCardsList from '@/components/ui/post-editor/sidebar/sidebar-cards-list';

export default function PostEditorSidebar() {
  const [activeTab, setActiveTab] = useState<'where' | 'when'>('where');

  return (
    <Tabs
      className="flex flex-col"
      value={activeTab}
      onValueChange={(tab: 'where' | 'when') => setActiveTab(tab)}
    >
      <div className="flex justify-center">
        <TabsList className="bg-slate-200 p-2 mb-4">
          <TabsTrigger
            value="where"
            className={`transition-color ${activeTab === 'where' ? 'bg-darkerOrange text-white p-3' : 'bg-inherit'}`}
          >
            Where
          </TabsTrigger>
          <TabsTrigger
            value="when"
            className={`transition-color ${activeTab === 'when' ? 'bg-darkerOrange text-white p-3' : 'bg-inherit'}`}
          >
            When & How
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="where">
        <PostEditorSidebarCardsList tab="where" />
      </TabsContent>
      <TabsContent value="when">
        <PostEditorSidebarCardsList tab="when" />
      </TabsContent>
    </Tabs>
  );
}
