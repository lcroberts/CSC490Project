import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypeAnimation } from 'react-type-animation';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";


export default function TestWelcome() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 flex items-center p-4">
        <img src="https://github.com/philipdsijerkovic/Term-Project/blob/main/logo.png?raw=true" alt="StudyBuddy Logo" className="h-12 w-12" />
        <span className="ml-2 text-xl font-medium">
          <span className="gradient-text">Study</span>Buddy
        </span>
      </div>
      <Separator orientation="vertical" className="absolute top-0 left-[200px] h-full" />
      <Separator orientation="vertical" className="absolute top-0 right-[180px] h-full" />
      
      <div className="absolute top-0 right-0 flex items-center p-5">
        <Button variant="primary">Signup</Button>
        <Button variant="outline" className="bg-orange-400 text-white">Login</Button>
      </div>
      <div className="flex flex-grow items-center justify-center p-5">
        <Navbar />
      </div>
      <Separator orientation="horizontal" className="w-full" />

      <div className="flex flex-col items-center justify-center pb-8 h-screen">
        <h1 className="text-9xl font-bold mb-4">
        Ideas made  
          <span className="gradient-text">{' '}
            <TypeAnimation
              sequence={[
                'easy', 
                2000, 
                'fun', 
                2000,
                'secure',
                2000,
                'clear',
                2000,
                'smart',
                2000,
                'fast',
                2000,
                'simple',
                2000,
                'bold',
                2000,
                'quick',
                2000,
                () => {
                  console.log('Sequence completed');
                },
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: 'inline-block' }}
            />
          </span>
        </h1>
        <p className="text-3xl mb-8">StudyBuddy is the ultimate tool for organizing and accessing your study notes.</p>
        <Button className="bg-orange-400 text-white hover:bg-red-400 hover:shadow-lg hover:shadow-red-400/50 text-lg hover-animate-glow" size="lg">Get Started</Button>
      </div>

      <div id="markdown-editor" className="flex flex-col items-center text-7xl font-bold mb-4">
        <h1>Markdown Editor</h1>
        <Separator orientation="horizontal" className="w-full" />
        <h2 className="text-3xl font-bold mb-4 pt-4">
          We utilize 
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="text-orange-400 cursor-pointer text-3xl">Milkdown</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-1">
                <p className="text-lg">
                  Milkdown is a plugin-driven WYSIWYG markdown editor framework.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
          to handle all markdown related tasks.
        </h2>
      </div>

      <div className="flex justify-center text-5xl font-bold mb-4">
        <img src="./Photo.png" alt="Description of image" className="rounded-lg shadow-xl w-[1200px]" />
      </div>

      <div id="encryption" className="flex flex-col items-start text-7xl font-bold mt-20 pt-10 ml-[250px]">
        <h1>Encryption</h1>
        <Separator orientation="horizontal" className="w-full mt-3" />
        <h2 className="text-3xl font-bold mb-4 pt-4">
          We provide 
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="text-orange-400 cursor-pointer text-3xl">Encryption</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-1">
                <p className="text-lg">
                  All of your notes are encrypted to ensure your privacy.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
          to handle all your media needs.
        </h2>
      </div>

      <div id="summarization" className="flex flex-col items-start text-7xl font-bold mt-20 pt-10 ml-[250px]">
        <h1>Summarization</h1>
        <Separator orientation="horizontal" className="w-full mt-3" />
        <h2 className="text-3xl font-bold mb-4 pt-4">
          StudyBuddy offers a 
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="text-orange-400 cursor-pointer text-3xl">Summarization</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-1">
                <p className="text-lg">
                  Utilizing the OpenAI API, we can summarize your notes for you.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
          feature that leverages AI to summarize your notes.
        </h2>
      </div>

      <div id="tagging" className="flex flex-col items-start text-7xl font-bold mt-20 pt-10 ml-[250px]">
        <h1>Tagging</h1>
        <Separator orientation="horizontal" className="w-full mt-3" />
        <h2 className="text-3xl font-bold mb-4 pt-4">
          Users have the option to use our  
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="text-orange-400 cursor-pointer text-3xl">Tagging</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-1">
                <p className="text-lg">
                  Utilizing the OpenAI API, we can summarize your notes for you.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
          feature that uses AI add tags to your notes.
        </h2>
      </div>

      <div className="fixed top-1/2 left-0 transform -translate-y-1/2 text-center w-1/8 p-4">
        <h2 className="text-xl font-bold mb-2">Table of Contents</h2>
        <Separator orientation="horizontal" className="w-full mb-2" />
        <div className="grid grid-cols-1 gap-1.5">
          <a href="#markdown-editor">
            <Button variant="outline">Markdown Editor</Button>
          </a>
          <a href="#encryption">
            <Button variant="outline">Encryption</Button>
          </a>
          <a href="#summarization">
          <Button variant="outline">Summarization</Button>
          </a>
          <a href="#tagging">
          <Button variant="outline">Tagging</Button>
          </a>
          <a href="#note-linking">
          <Button variant="outline">Note-Linking</Button>
          </a>
        </div>
      </div>
    </div>
  );
}