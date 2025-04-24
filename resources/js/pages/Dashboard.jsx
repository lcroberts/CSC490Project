import EditorStateProvider from '@/components/EditorStateProvider';
import Dashboard from '@/components/Dashboard';
import { Toaster } from '@/components/ui/toaster';

export default function SidebarTest() {
  return (
    <EditorStateProvider>
      <Dashboard></Dashboard>
      <Toaster />
    </EditorStateProvider>
  )
  }
