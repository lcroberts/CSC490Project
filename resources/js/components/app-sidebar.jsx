import * as React from "react";
import { useState } from "react";
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import { usePage } from "@inertiajs/react";
import useAppState from "@/hooks/useAppState";
import useAxios from "@/hooks/useAxios";

// This is sample data until we use the database
const data = {
  navMain: [
    {
      title: "Notes",
      onclick: () => { },
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Summarize",
      onclick: (event, http) => { },
      icon: Send,
      isActive: false,
    },
    {
      title: "Delete",
      onclick: (http, event) => { },
      icon: Trash2,
      isActive: false,
    },
  ],
};

const avatar = "https://www.thesprucecrafts.com/thmb/NqC78zeciImIpiuZKQoByetgpBA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/thegraphicsfairy-5dfa84d312cd407194d8198f6bfd2008.jpg";
export function AppSidebar({ children, ...props }) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeNoteIndex, setActiveNoteIndex] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { setOpen } = useSidebar();
  const user = {
    ...usePage().props.auth.user,
    avatar: avatar,
  }
  const { notes, setActiveNote } = useAppState();
  const http = useAxios();

  const filteredNotes = notes.filter(note =>
    note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden h-full [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
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
                {/* TODO: Inline things */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={{
                      children: "New Note",
                      hidden: false,
                    }}
                    onClick={() => {
                      http.post('/api/notes/create', {
                        name: "New Note",
                      }).then(res => {
                        console.log(res.data);
                        // TODO: Fetch note and add it to list
                      }).catch(err => {
                        console.log(err)
                      });
                    }}
                    className="px-2.5 md:px-2"
                  >
                    <File />
                    <span>New Note</span>
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
      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
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
                  className={`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 transition-colors duration-500 ease-in-out ${activeNoteIndex === idx ? 'bg-gray-200' : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
                  onClick={() => {
                    setActiveNoteIndex(idx);
                    setActiveNote(idx);
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{user?.name}</span>{" "}
                    <span className="ml-auto text-xs">{(new Date(note.created_at + " UTC")).toLocaleString()}</span>
                  </div>
                  <span className="font-medium">{note.name}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {note.content}
                  </span>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-orange-300 text-white text-xs px-2 py-1 rounded">Fishing</span>
                    <span className="bg-orange-300 text-white text-xs px-2 py-1 rounded">Cooking</span>
                    <span className="bg-orange-300 text-white text-xs px-2 py-1 rounded">Music</span>
                    <span className="bg-orange-300 text-white text-xs px-2 py-1 rounded">Music</span>
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
    </Sidebar>
  );
}
