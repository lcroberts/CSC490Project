import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
        <Button variant="primary">
          <a href="/login?register=true">
            Signup
          </a>
        </Button>
        <Button variant="outline" className="bg-orange-400 text-white">
          <a href="/login?register=false">
            Login
          </a>
        </Button>
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
        <Button className="bg-orange-400 text-white hover:bg-red-400 hover:shadow-lg hover:shadow-red-400/50 text-lg hover-animate-glow" size="lg">
        <a href="/login?register=true">
          Get Started
          </a></Button>
      </div>

      <motion.div 
        id="markdown-editor" 
        className="flex flex-col items-start text-7xl font-bold mt-20 pt-10 ml-[250px]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
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

        <div className="flex justify-center text-5xl font-bold mb-4">
          <img src="./Photo.png" alt="Description of image" className="rounded-lg shadow-xl w-[1200px]" />
        </div>
      </motion.div>
      
      <motion.div 
        id="encryption" 
        className="flex flex-col items-start text-7xl font-bold mt-20 pt-10 ml-[250px]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
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
        
        <div className="relative flex items-start">
          <div className="mt-4 w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-orange-400 text-white px-6 py-2">
              <h3 className="text-2xl font-bold">Register / Login</h3>
            </div>
            <div className="p-4 flex flex-col h-[296px]">
              <div className="space-y-1">
                <Label htmlFor="demo-username" className="text-lg font-medium">Username</Label>
                <div className="relative">
                  <Input
                    id="demo-username"
                    type="text"
                    className="input-glow w-full"
                    value=""
                    readOnly
                  />
                  <div className="absolute inset-0 overflow-hidden">
                    <TypeAnimation
                      sequence={[
                        '',
                        500,
                        'Philip Sijerkovic',
                        1000,
                      ]}
                      cursor={false}
                      repeat={0}
                      speed={10}
                      className="px-3 py-1.5 w-full h-full block text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1 mt-3">
                <Label htmlFor="demo-password" className="text-lg font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="demo-password"
                    type="password"
                    className="input-glow w-full"
                    value=""
                    readOnly
                  />
                  <div className="absolute inset-0 overflow-hidden">
                    <TypeAnimation
                      sequence={[
                        '',
                        4000,
                        '••••••••••••',
                        1000,
                      ]}
                      cursor={false}
                      repeat={0}
                      speed={10}
                      className="px-3 py-1.5 w-full h-full block text-base bg-transparent"
                    />
                  </div>  
                </div>
              </div>
              
              <div className="mt-auto pt-4">
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col items-center mx-10">
            <div className="bg-white p-4 rounded-xl mt-20">
              <img 
                src="arrow-right-svgrepo-com.svg" 
                className="w-60 h-auto rounded-lg"
                alt="Right arrow"
              />
            </div>
          </div>
          
          <div className="mt-4 w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden h-[340px]">
            <div className="bg-orange-400 text-white px-6 py-2">
              <h3 className="text-2xl font-bold">Generated Key:</h3>
            </div>
            <div className="p-4 flex flex-col justify-center h-[296px]">
              <div className="relative mb-4">
                <div className="text-center mb-4 text-lg font-medium">
                  <span className="text-gray-600">Your Encryption Key</span>
                </div>
                <Input
                  id="generated-key"
                  type="text"
                  className="input-glow w-full bg-gray-100"
                  value=""
                  readOnly
                />
                <div className="absolute inset-0 overflow-hidden">
                  <TypeAnimation
                    sequence={[
                      '',
                      6000,
                      '603deb1015ca71be2b73aef0857d778\n ',
                      1000,
                      '603deb1015ca71be2b73aef0857d778\n 1f352c073b6108d72d9810a30914dff4',
                      1000,
                    ]}
                    cursor={false}
                    repeat={0}
                    speed={10}
                    className="px-3 py-1.5 w-full h-full block text-base bg-gray-100 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col items-center mx-10">
            <div className="bg-white p-4 rounded-xl mt-20">
              <img 
                src="arrow-right-svgrepo-com.svg" 
                className="w-60 h-auto rounded-lg"
                alt="Right arrow"
              />
            </div>
          </div>
          
          <div className="mt-4 w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden h-[340px]">
            <div className="bg-orange-400 text-white px-6 py-2">
              <h3 className="text-2xl font-bold">Server Access</h3>
            </div>
            <div className="p-4 flex flex-col items-center justify-center h-[296px]">
              <div className="relative h-44 bg-gray-700 rounded-lg p-2 font-mono text-xs text-orange-400 overflow-hidden w-full">
                <div className="absolute inset-0 p-2">
                  <TypeAnimation
                    sequence={[
                      '',
                      14000,
                      '> Connecting to server...\n',
                      1000,
                      '> Connecting to server...\n> Authenticating...\n',
                      1000,
                      '> Connecting to server...\n> Authenticating...\n> Key accepted\n',
                      1000,
                      '> Connecting to server...\n> Authenticating...\n> Key accepted\n> Decrypting data...\n',
                      1000,
                      '> Connecting to server...\n> Authenticating...\n> Key accepted\n> Decrypting data...\n> Access granted\n',
                      500,
                      '> Connecting to server...\n> Authenticating...\n> Key accepted\n> Decrypting data...\n> Access granted\n> Welcome, Philip!',
                      1000,
                    ]}
                    cursor={true}
                    repeat={0}
                    speed={40}
                    className="whitespace-pre"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        id="summarization" 
        className="flex flex-col items-start text-7xl font-bold mt-20 pt-10 ml-[250px]"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
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
        <div className="w-full flex space-x-8 mt-8">
          <div className="w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-orange-400 text-white px-6 py-2">
              <h3 className="text-2xl font-bold">Original Notes</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="relative min-h-[300px]">
                <textarea 
                  className="w-full min-h-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 no-scrollbar"
                  readOnly
                  defaultValue="Calculus is a branch of mathematics that focuses on change and motion, and it is divided into two main areas: differential and integral calculus. Differential calculus deals with the concept of the derivative, which measures how a quantity changes with respect to another—often time or space—making it essential for understanding rates of change and slopes of curves. Integral calculus, on the other hand, involves the accumulation of quantities and the area under curves, which is useful in calculating things like total distance traveled or the volume under a surface. Together, these concepts form the foundation for much of modern science and engineering, allowing us to model and solve problems in physics, economics, biology, and beyond."
                ></textarea>
                <div className="absolute bottom-4 right-4">
                  <Button 
                    className="bg-orange-400 text-white hover:bg-orange-500"
                    id="summarize-button"
                    onClick={() => { // Handle the onclick behavior for the summarize button and disable the button afterward
                      document.getElementById('summary-animation').classList.remove('hidden');
                      document.getElementById('summarize-button').classList.add('opacity-50', 'cursor-not-allowed');
                      document.getElementById('summarize-button').setAttribute('disabled', 'true');
                    }}
                  >
                    Summarize
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/3 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-orange-400 text-white px-6 py-2">
              <h3 className="text-2xl font-bold">AI Summary</h3>
            </div>
            <div className="p-4">
              <div className="relative min-h-[300px]">
                <textarea 
                  className="w-full min-h-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 no-scrollbar"
                  readOnly
                  defaultValue=""
                ></textarea>
                <div id="summary-animation" className="absolute inset-0 p-3 overflow-hidden hidden">
                  <TypeAnimation
                    sequence={[
                      'Generating summary...',
                      1000,
                      'Calculus is a branch of math focused on change and motion, consisting of differential calculus (rates of change) and integral calculus (accumulation and areas). It is essential in fields like science and engineering for modeling and solving real-world problems.',
                      5000,
                    ]}
                    cursor={false}
                    repeat={0}
                    speed={100}
                    style={{ whiteSpace: 'pre-wrap' }}
                    className="block text-base"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
            <Button variant="outline" className="w-full">Markdown Editor</Button>
          </a>
          <a href="#encryption">
            <Button variant="outline" className="w-full">Encryption</Button>
          </a>
          <a href="#summarization">
            <Button variant="outline" className="w-full">Summarization</Button>
          </a>
          <a href="#tagging">
            <Button variant="outline" className="w-full">Tagging</Button>
          </a>
        </div>
      </div>
    </div>
  );
}