import EditorStateProvider from '@/components/EditorStateProvider';
import Dashboard from '@/components/Dashboard';

export default function SidebarTest() {
  return (
    <EditorStateProvider>
      <Dashboard></Dashboard>
    </EditorStateProvider>
  )
  }
