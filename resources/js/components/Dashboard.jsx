import { MarkdownEditor } from '@/components/markdown-editor/MarkdownEditor';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePage } from '@inertiajs/react';
import useAppState from '@/hooks/useAppState';

export default function Dashboard() {
  const user = usePage().props.auth.user;
  const { notes, activeNote } = useAppState()
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px",
      }}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Notes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{user?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className='flex-1'>
          {activeNote !== null ?
            <MarkdownEditor key={activeNote} defaultContent={notes[activeNote].content} />
            :
            <div className='h-full flex'>
              <h1 className='mx-auto my-auto text-3xl'>
                Select a note to get started
              </h1>
            </div>
          }
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
  }
