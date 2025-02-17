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


export default function Navbar() {
  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl">Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <div
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <img src="https://github.com/philipdsijerkovic/Term-Project/blob/main/logo.png?raw=true" alt="StudyBuddy Logo" className="h-30 w-22" />
                      <div className="mb-2 mt-4 text-lg font-medium text-center">
                       StudyBuddy
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground text-center">
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
                        Here is a brief tutorial on how to use StudyBuddy's features. 
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
            <NavigationMenuTrigger className="text-xl">Features</NavigationMenuTrigger>
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
                        Markdown Editor
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        We are utilizing the Milkdown markdown editor for a simple user experience.
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
                        Media Upload
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Users are able to upload their own media files to further personalize their notes.
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
                        Encryption
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        All notes are encrypted to ensure user privacy and security.
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
                        Summarization
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        We leverage the most recent AI models to summarize notes for users.
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
                        Tagging
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Using an AI tagging system, we can automatically tag notes for users.
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
                        Note Linking
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Users can link notes together to create a more cohesive study experience.
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}