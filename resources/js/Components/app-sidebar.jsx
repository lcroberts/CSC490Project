import * as React from "react";
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

// This is sample data
const data = {
  user: {
    name: "Philip Sijerkovic",
    email: "psijerkovic.ps@gmail.com",
    avatar: "https://www.shutterstock.com/search/fish-avatar",
  },
  navMain: [
    {
      title: "Notes",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "New Note",
      url: "#",
      icon: File,
      isActive: false,
    },
    {
      title: "Summarize",
      url: "#",
      icon: Send,
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: "Delete",
      url: "#",
      icon: Trash2,
      isActive: false,
    },
  ],
  mails: [
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
    {
      name: "Philip Sijerkovic",
      email: "pdsijerkovi@uncg.edu",
      subject: "Philip Sijerkovic",
      date: "10:30",
      teaser:
        "I'm still working on adding database functionality to this part...",
    },
  ],
};

export function AppSidebar({ children, ...props }) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [mails, setMails] = React.useState(data.mails);
  const { setOpen } = useSidebar();

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
                    <span className="truncate text-xs">Incorportated</span>
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
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        const mail = data.mails.sort(() => Math.random() - 0.5);
                        setMails(
                          mail.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1)
                          )
                        );
                        setOpen(true);
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Dark Mode</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {mails.map((mail) => (
                <a
                  href="#"
                  key={mail.email}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>{" "}
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {mail.teaser}
                  </span>
                </a>
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