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
import { useState, useRef } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TypeAnimation } from 'react-type-animation';
import useAxios from "@/hooks/useAxios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Dashboard() {
  const user = usePage().props.auth.user; // Get the user object from the page props
  const http = useAxios();
  const { notes, activeNote } = useAppState(); // Get notes and activeNote from the app state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for the summary dialog
  const [isLoading, setIsLoading] = useState(false); // Loading state for the summary generation
  const [summary, setSummary] = useState(""); // State to hold the summary text
  const [progress, setProgress] = useState(0); // Progress state for loading animation
  const [summaryLength, setSummaryLength] = useState("one"); // "one" or "two"

  // Tag dialog state
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [tagMode, setTagMode] = useState("auto"); // Use "auto" or "manual"
  const [manualTags, setManualTags] = useState("");
  const manualTagInputRef = useRef(null);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    setSummary("");
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    setProgress(0);

    try {
      if (!notes[activeNote]?.content) {
        throw new Error('No content available to summarize.');
      }

      const response = await http.post('/api/summary/send', {
        noteContent: notes[activeNote]?.content,
        forceGeneration: false,
        summaryLength: summaryLength,
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

  const handleTagDialogOpen = () => {
    setIsTagDialogOpen(true);
    setTagMode("auto");
    setManualTags("");
  };

  const handleGenerateTags = async () => {
    if (tagMode === "auto") {
      // Call your API to auto-generate tags
      // await http.post('/api/tags/generate', { noteContent: notes[activeNote]?.content });
      alert("Auto-generate tags (implement API call here)");
    } else {
      // Save manual tags
      // await http.post('/api/tags/manual', { tags: manualTags, noteId: activeNote });
      alert(`Manual tags: ${manualTags}`);
    }
    setIsTagDialogOpen(false);
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "350px" }}>
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
          <div className="fixed bottom-4 right-4 flex gap-2">
            {/* Tag Button & Dialog */}
            <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white" onClick={handleTagDialogOpen}>
                  Tags
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogTitle>Tag Options</DialogTitle>
                <DialogDescription className="text-gray-500">
                  Choose how to add tags:
                </DialogDescription>
                <RadioGroup
                  value={tagMode}
                  onValueChange={setTagMode}
                  className="flex flex-col gap-2 my-2"
                >
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="auto" /> Auto-generate tags
                  </label>
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="manual" /> Manually add tags
                  </label>
                </RadioGroup>
                {tagMode === "manual" && (
                  <input
                    ref={manualTagInputRef}
                    type="text"
                    className="w-full border rounded px-2 py-1 mt-2"
                    placeholder="Enter tags, separated by commas"
                    value={manualTags}
                    onChange={e => setManualTags(e.target.value)}
                  />
                )}
                <Button
                  className="mt-2 bg-black text-white"
                  onClick={handleGenerateTags}
                >
                  Save Tags
                </Button>
              </DialogContent>
            </Dialog>
            {/* Summarize Button & Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white" onClick={handleDialogOpen}>Summarize</Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogTitle>Summarize Note</DialogTitle>
                <DialogDescription className="text-gray-500">
                  Choose summary length:
                </DialogDescription>
                <RadioGroup
                  value={summaryLength}
                  onValueChange={setSummaryLength}
                  className="flex flex-col gap-2 my-2"
                >
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="one" /> One paragraph
                  </label>
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="two" /> Two paragraphs
                  </label>
                </RadioGroup>
                <Button
                  className="mt-2 bg-black text-white"
                  onClick={handleSummarize}
                  disabled={isLoading}
                >
                  Summarize
                </Button>
                {isLoading ? (
                  <div className="flex items-center justify-center mt-4">
                    <Progress value={progress} className="mx-auto" />
                    <p className="ml-2 text-black">Processing your request</p>
                  </div>
                ) : summary && (
                  <div className="mt-4">
                    <DialogTitle>Summary</DialogTitle>
                    <DialogDescription className="text-gray-500">
                      Here is a summary of the text you requested
                    </DialogDescription>
                    <div className="flex min-h-[80px] w-full rounded-md border border-input bg-gray-200 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <TypeAnimation
                        sequence={[ summary ]}
                        wrapper="div"
                        cursor={true}
                        speed={85}
                        repeat={0}
                      />
                    </div>
                    <Button className="mt-2 bg-black text-white">Copy text</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}