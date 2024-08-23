"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiX as XIcon } from 'react-icons/hi';
import { FiMessageCircle as MessageCircleIcon, FiCircle as CircleIcon, FiSettings as SettingsIcon } from 'react-icons/fi';
import { UserButton } from "@clerk/nextjs";
import SettingsPage from "@/components/settingsPage"; // Import the SettingsPage component
import Link from "next/link";

export default function Chatbot() {
  // State to manage the visibility of chat history and settings
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Toggle chat history visibility
  const handleChatHistoryToggle = () => {
    setShowChatHistory(!showChatHistory);
  };

  // Toggle settings visibility
  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="flex flex-col h-[90vh] w-[1000px] mx-auto bg-white rounded-lg shadow-2xl">
      {/* Header */}
      <header className="flex items-center justify-between w-full bg-[#1E293B] text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Department of Justice Chatbot</h1>
        <UserButton />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-100 p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleChatHistoryToggle}
              className="flex items-center gap-2 text-[#1E293B] hover:text-[#1E293B]/80 rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
            >
              <MessageCircleIcon className="w-5 h-5" />
              Chat History
              <span className={`transition-transform ${showChatHistory ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {showChatHistory && (
              <div className="space-y-2 mt-4">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-[#1E293B]/70 hover:text-[#1E293B] rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
                  prefetch={false}
                >
                  <CircleIcon className="w-3 h-3" />
                  Previous Chat 1
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-[#1E293B]/70 hover:text-[#1E293B] rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
                  prefetch={false}
                >
                  <CircleIcon className="w-3 h-3" />
                  Previous Chat 2
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-[#1E293B]/70 hover:text-[#1E293B] rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
                  prefetch={false}
                >
                  <CircleIcon className="w-3 h-3" />
                  Previous Chat 3
                </Link>
              </div>
            )}
            <button
              onClick={handleSettingsToggle}
              className="flex items-center gap-2 text-[#1E293B] hover:text-[#1E293B]/80 rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#F1F5F9]/70"
            >
              <SettingsIcon className="w-5 h-5" />
              Settings
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {showSettings ? (
            <SettingsPage />
          ) : (
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="rounded-full w-10 h-10 bg-[#475569] flex items-center justify-center text-2xl text-white">
                  
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-lg font-medium text-[#1E293B]">
                    Hello! I'm the Department of Justice chatbot. How can I assist you today?
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20 text-[#1E293B] bg-white/50 hover:bg-white/70"
                    >
                      Judge Appointments
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20 text-[#1E293B] bg-white/50 hover:bg-white/70"
                    >
                      Case Status
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20 text-[#1E293B] bg-white/50 hover:bg-white/70"
                    >
                      Livestreams
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-[#1E293B]/20 focus-visible:bg-[#1E293B]/20 text-[#1E293B] bg-white/50 hover:bg-white/70"
                    >
                      eCourts
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="rounded-full w-10 h-10 bg-[#475569] text-white flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-lg font-medium text-[#1E293B]">
                    Hi, I'm interested in learning more about the Department of Justice's judge appointment process.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="rounded-full w-10 h-10 bg-[#475569] flex items-center justify-center text-2xl text-white">
                  
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-lg font-medium text-[#1E293B]">
                    Great, let me provide some information about the judge appointment process at the Department of Justice.
                    The Department is responsible for nominating and appointing federal judges. The process involves several
                    steps, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-[#1E293B]">
                    <li>The President nominates a candidate for a federal judgeship.</li>
                    <li>
                      The Senate Judiciary Committee holds a hearing to review the nominee's qualifications and background.
                    </li>
                    <li>The full Senate then votes to confirm or reject the nomination.</li>
                    <li>If confirmed, the nominee is appointed to the federal judiciary.</li>
                  </ul>
                  <p className="text-[#1E293B]">
                    You can find more detailed information about the judge appointment process on the Department of Justice
                    website. Let me know if you have any other questions!
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
