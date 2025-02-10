import { MarkdownEditor } from '@/Components/markdown-editor/MarkdownEditor';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AppSidebar } from '@/Components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function EditorTest({ }) {
  return (
    <AuthenticatedLayout>
          <div className='flex-1'>
            <MarkdownEditor editorId={"testEditor"} />
          </div>
    </AuthenticatedLayout>
  );
}