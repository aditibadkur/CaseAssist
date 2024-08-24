"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HiX as XIcon } from 'react-icons/hi';
import { FiMessageCircle as MessageCircleIcon, FiCircle as CircleIcon, FiSettings as SettingsIcon } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { UserButton, useUser } from "@clerk/nextjs";
import SettingsPage from "@/components/settingsPage";
import NewChatPage from "@/components/newChatPage";
import parse from 'html-react-parser';

// Function to convert Markdown-like notations to HTML
const formatText = (text) => {
  if (!text) return '';

  // Replace **bold text** with <strong>bold text</strong>
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Replace *italic text* with <em>italic text</em>
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Replace newlines with <br> tags
  text = text.replace(/\n/g, '<br>');

  // Replace multiple spaces with a single space
  text = text.replace(/\s{2,}/g, ' ');

  return text;
};

export default function Chatbot() {
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showNewChatPage, setShowNewChatPage] = useState(false);

  // const handleNewChatClick = () => {
  //   setShowNewChatPage(true);
  // };

  const { user } = useUser();

  useEffect(() => {
    if (user && user.emailAddresses.length > 0) {
      const email = user.emailAddresses[0].emailAddress;
      setUserEmail(email);
    }
  }, [user]);

  useEffect(() => {
    if (userEmail) {
      fetchChatHistory();
    }
  }, [userEmail]);

  const fetchChatHistory = async () => {
    try {
      console.log('Fetching chat history with email:', userEmail);
      const res = await fetch('https://doj-backend.onrender.com/api/get-initial-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      setChatHistory(data); // Store all the data including questions
      if (data.length > 0) {
        setCurrentChat(data[0].chatId);
        fetchChatMessages(data[0].chatId);
      }
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  };

  const fetchChatMessages = async (chatId: any) => {
    try {
      const res = await fetch(`https://doj-backend.onrender.com/api/get-chat-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, chatId: currentChat }),
      });
      console.log(res);
      if (!res.ok) throw new Error('Failed to fetch chat messages');
      let data = await res.json();

      // Format the response text
      data = data.map((message: any) => ({
        ...message,
        formattedAnswer: formatText(`Q: ${message.question}\nA: ${message.answer}`),
      }));

      setChatMessages(data);
    } catch (err) {
      console.error('Error fetching chat messages:', err);
    }
  };

  const handleQuestionSubmit = async () => {
    try {
      const res = await fetch('https://doj-backend.onrender.com/api/savechat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userInput, email: userEmail, chatId: currentChat }),
      });
      console.log(res.json);
      if (!res.ok) throw new Error('Failed to save chat');
      const data = await res.json();
      console.log(data.response);
      setUserInput("");
      fetchChatMessages(currentChat);
    } catch (err) {
      console.error('Error saving question:', err);
    }
  };

  const handleChatSelect = (chatId) => {
    setCurrentChat(chatId);
    fetchChatMessages(chatId);
  };
  

  const handleNewChatClick = () => {
    setShowNewChatPage(true);
    setShowChatHistory(false); // Close chat history if needed
    setShowSettings(false); // Close settings if needed
  };
  
  const handleChatHistoryClick = () => {
    setShowChatHistory(!showChatHistory);
    setShowNewChatPage(false); // Close new chat page if needed
    setShowSettings(false); // Close settings if needed
  };
  
  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowNewChatPage(false); // Close new chat page if needed
    setShowChatHistory(false); // Close chat history if needed
  };
  
  return (
    <div className="flex flex-col h-[90vh] w-[1000px] mx-auto bg-[#FFFFFF] rounded-lg shadow-2xl">
      <header className="flex items-center justify-between w-full bg-[#FF9933] text-white py-4 px-6 rounded-t-lg">
        <h1 className="text-2xl font-bold">Department of Justice Chatbot</h1>
        <UserButton />
      </header>

      <div className="flex flex-1 overflow-hidden">
      <aside className="w-60 bg-gray-100 p-4 space-y-4 rounded-l-lg">
        <button
          onClick={handleNewChatClick}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#1E293B]/80 rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#D1D5DB]/70"
        >
          <FaPlus className="w-5 h-5" />
          New Chat
        </button>
        <button
          onClick={handleChatHistoryClick}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#1E293B]/80 rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#D1D5DB]/70"
        >
          <MessageCircleIcon className="w-5 h-5" />
          Chat History
          <span className={`transition-transform ${showChatHistory ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {showChatHistory && (
          <div className="space-y-2 mt-4">
            {chatHistory.map(chat => (
              <div
                key={chat.chatId}
                className="bg-gray-100 rounded-md p-3 mb-2 shadow-lg hover:bg-gray-200 cursor-pointer"
                onClick={() => handleChatSelect(chat.chatId)}
              >
                <CircleIcon className="w-3 h-3 inline-block mr-2" />
                {chat.question}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleSettingsClick}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#1E293B]/80 rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#D1D5DB]/70"
        >
          <SettingsIcon className="w-5 h-5" />
          Settings
        </button>
      </aside>


        <main className="flex-1 flex flex-col overflow-hidden rounded-r-lg">
          {showNewChatPage ? (
            <NewChatPage onStartNewChat={(message) => console.log('New chat started with message:', message)} />
          ) : showSettings ? (
            <SettingsPage />
          ) : (
            <div className="flex flex-col flex-1 overflow-y-auto p-6 space-y-6">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex items-start gap-4 bg-white p-4 rounded-lg shadow-lg ${message.from === 'bot' ? 'bg-gray-100' : ''}`}>
                  <div className="flex-1 space-y-2">
                    <p className="text-gray-800">{parse(message.formattedAnswer)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!showNewChatPage && !showSettings && (
            <footer className="flex p-4 bg-gray-100 rounded-b-lg">
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-white rounded-l-lg border border-gray-300 p-2"
                placeholder="Ask me anything..."
              />
              <Button
                onClick={handleQuestionSubmit}
                className="bg-[#FF9933] text-white rounded-r-lg p-2"
              >
                Send
              </Button>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}
