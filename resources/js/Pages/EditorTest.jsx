import { MarkdownEditor } from '@/Components/markdown-editor/MarkdownEditor';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EditorTest({ auth }) {
  return (
    <AuthenticatedLayout>
      <div className=''>
        <MarkdownEditor editorId={"testEditor"} />
      </div>
    </AuthenticatedLayout>
  );
}
