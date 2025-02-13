import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function TestWelcome() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <img src="\logo.png" alt="StudyBuddy Logo" className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      StudyBuddy
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Effortlessly capture ideas, organize thoughts, and access notes anytime, anywhere. 
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Introduction
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Installation
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      How to install dependencies and structure your app.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Typography
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Styles for headings, paragraphs, lists...etc
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Alert Dialog
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A modal dialog that interrupts the user with important content
                      and expects a response.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Hover Card
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      For sighted users to preview content available behind a link.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Progress
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Displays an indicator showing the completion progress of a task,
                      typically displayed as a progress bar.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Scroll-area
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Visually or semantically separates content.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Tabs
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A set of layered sections of content—known as tab panels—that
                      are displayed one at a time.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Tooltip
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A popup that displays information related to an element when the
                      element receives keyboard focus or the mouse hovers over it.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}