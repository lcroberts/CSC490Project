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
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TypeAnimation } from 'react-type-animation';
import useAxios from "@/hooks/useAxios";

export default function Dashboard() {
  const user = usePage().props.auth.user; // Get the user from the page props
  const http = useAxios();
  const { notes, activeNote } = useAppState(); // Get the notes and active note from the app state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for the dialog
  const [isLoading, setIsLoading] = useState(false); // State for loading state
  const [summary, setSummary] = useState("");
  const [progress, setProgress] = useState(0);  // State for progress

  const handleDialogOpen = async () => {
    setIsLoading(true);
    setIsDialogOpen(true);
    setProgress(0);

    try {
      if (!notes[activeNote]?.content) {
        throw new Error('No content available to summarize.');
      }

      const response = await http.post('/api/summary/send', {
        noteContent: notes[activeNote]?.content,
        forceGeneration: false,
      });

      setSummary(response.data.summary || 'No summary available.');
    } catch (error) {
      console.error('Error fetching summary:', error);
      if (error.response && error.response.status === 422) {
        setSummary('Invalid content. Please provide valid text to summarize.');
      } else {
        setSummary('Failed to fetch summary. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }

  };

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
        <div className='flex-1 relative'>
          {activeNote !== null ?
            <MarkdownEditor key={activeNote} defaultContent={notes[activeNote].content} />
            :
            <div className='h-full flex'>
              <h1 className='mx-auto my-auto text-3xl'>
                Select a note to get started
              </h1>
            </div>
          }
          <div className="fixed bottom-4 right-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white" onClick={handleDialogOpen}>Summarize</Button>
              </DialogTrigger>
              {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
                  <div className="text-center">
                    <Progress value={progress} className=" mx-auto" />
                    <p className="mt-4 text-black">Processing your request</p>
                  </div>
                </div>
              ) : (
                <DialogContent className="bg-white text-black">
                  <DialogTitle>Summary</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    Here is a summary of the text you requested
                  </DialogDescription>
                  <div className="flex min-h-[80px] w-full rounded-md border border-input bg-gray-200 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    <TypeAnimation
                      sequence={[ summary, ]}
                      wrapper="div"
                      cursor={true}
                      speed={85}
                      repeat={0}
                    />
                  </div>
                  <Button className="mt-2 bg-black text-white">Copy text</Button>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}