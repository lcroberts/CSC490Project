import * as React from "react";
import { ArchiveX, Command, File, Inbox, Save, Send, Trash2, X } from "lucide-react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import useAppState from "@/hooks/useAppState";
import useAxios from "@/hooks/useAxios";
import { decryptString, encryptString, getEncryptionKey } from "@/lib/utils";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const avatar = "https://www.thesprucecrafts.com/thmb/NqC78zeciImIpiuZKQoByetgpBA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/thegraphicsfairy-5dfa84d312cd407194d8198f6bfd2008.jpg";

export function AppSidebar({ children, ...props }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { setOpen } = useSidebar();
  const user = {
    ...usePage().props.auth.user,
    avatar: avatar,
  }

  const { notes, setNotes, activeNote, setActiveNote, activeNoteInfo } = useAppState();
  const http = useAxios();
  const [modalInput, setModalInput] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const filteredNotes = notes.filter(note =>
    note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const refreshNotes = async () => {
    try {
      const response = await http.get('/api/notes');
      let notesRefresh = response.data;
      const key = await getEncryptionKey();
      for (let i = 0; i < notesRefresh.length; i++) {
        if (notesRefresh[i].content && notesRefresh[i].content.trim() !== "") {
          notesRefresh[i].content = await decryptString(notesRefresh[i].content, key);
        }
      }
      setNotes(notesRefresh);
    } catch (err) {
      console.error("Failed to refresh notes; ", err);
    }
  }

  // Remove tag handler
  const handleRemoveTag = async (noteId, tagId) => {
    try {
      await http.delete(`/api/tags/${tagId}/delete`);
      refreshNotes();
    } catch (err) {
      console.error("Failed to remove tag", err);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden h-full [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* Icon sidebar */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="flex flex-col text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Study Buddy</span>
                    <span className="truncate text-xs">Incorporated</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{
                      children: "New Note",
                      hidden: false,
                    }}
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    className="px-2.5 md:px-2"
                  >
                    <File />
                    <span>New Note</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{
                      children: "Save Note",
                      hidden: false,
                    }}
                    onClick={async () => {
                      const key = await getEncryptionKey();
                      const data = await encryptString(activeNoteInfo.content, key);
                      http.put('/api/notes/save', {
                        id: activeNoteInfo.id,
                        body: data,
                      }).then((res) => { })
                    }}
                    className="px-2.5 md:px-2"
                  >
                    <Save />
                    <span>Save Note</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{
                      children: "Delete",
                      hidden: false,
                    }}
                    onClick={() => {
                      const id = activeNoteInfo.id;
                      http.delete(`/api/notes/${id}/delete`).then((res) => {
                        setNotes(notes.filter(note => note.id !== id));
                        setActiveNote(null);
                      })
                    }}
                    className="px-2.5 md:px-2"
                  >
                    <Trash2 />
                    <span>Delete</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>
      {/* Main sidebar */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              Notes
            </div>
          </div>
          <SidebarInput
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SidebarHeader>
        <SidebarContent className="scrollbar">
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredNotes.map((note, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 transition-colors duration-500 ease-in-out ${activeNote === idx ? 'bg-gray-200' : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
                  onClick={() => {
                    setActiveNote(idx);
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{user?.name}</span>{" "}
                    <span className="ml-auto text-xs">{(new Date(note.created_at + " UTC")).toLocaleString()}</span>
                  </div>
                  <span className="font-medium">{note.name}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {typeof note.content === "string" ? note.content : ""}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(note.tags || []).map(tag => (
                      <span
                        key={tag.id}
                        className="flex items-center bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow hover:scale-105 transition-transform"
                      >
                        <span className="mr-2">{tag.content}</span>
                        <button
                          className="ml-1 p-0.5 hover:bg-white/20 rounded-full transition-colors"
                          onClick={e => {
                            e.stopPropagation();
                            handleRemoveTag(note.id, tag.id);
                          }}
                          aria-label={`Remove tag ${tag.content}`}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <h1 className="font-bold text-4xl text-center mb-3">New Note</h1>
        <div className="flex mx-3 mb-3 gap-2">
          <Input placeholder="Title" value={modalInput} onChange={e => setModalInput(e.target.value)}></Input>
          <Button disabled={modalInput.trim() === ""} onClick={() => {
            http.post('/api/notes/create', {
              name: modalInput,
            }).then(res => {
              const id = res.data.id;
              http.get(`/api/notes/${id}`).then((res) => {
                let newNotes = structuredClone(notes);
                newNotes.unshift(res.data);
                setNotes(newNotes);
              });
            }).catch(err => {
              console.log(err)
            });
            setModalOpen(false);
            setModalInput("");
          }}>Create Note</Button>
        </div>
      </Modal>
    </Sidebar>
  );
}
