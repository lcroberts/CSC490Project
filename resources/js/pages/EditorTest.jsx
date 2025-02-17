import { MarkdownEditor } from '@/components/markdown-editor/MarkdownEditor';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { AppSidebar } from '@/components/app-sidebar';
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
