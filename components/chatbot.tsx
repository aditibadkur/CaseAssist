"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HiX as XIcon } from 'react-icons/hi';
import { FiMessageCircle as MessageCircleIcon, FiCircle as CircleIcon, FiSettings as SettingsIcon } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { UserButton, useUser } from "@clerk/nextjs";
import SettingsPage from "@/components/settingsPage";
import NewChatPage from "@/components/newChatPage";
import parse from 'html-react-parser';

interface Chat {
  chatId: number;
  question: string;
  preview: string; 
}


interface ChatMessage {
  question: string;
  answer: string;
  formattedAnswer: string;
}

interface NewChatPageProps {
  onStartNewChat: () => void;
}


// Function to convert Markdown-like notations to HTML
const formatText = (text: string): string => {
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
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentChat, setCurrentChat] = useState<number | null>(null);
  const [userInput, setUserInput] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showNewChatPage, setShowNewChatPage] = useState(false);
  const [lastChatId, setLastChatId] = useState<number | null>(null); // Track the last chat ID
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null); 

  const { user } = useUser();

  // Generate a random 6-digit chat ID
  const generateRandomChatId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
  };

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

  const startNewChat = async (chatId: number) => {
    try {
      await fetch('https://doj-backend.onrender.com/api/start-new-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, chatId }),
      });
    } catch (err) {
      console.error('Error starting new chat:', err);
    }
  };
  

  const fetchChatHistory = async () => {
    try {
      const res = await fetch('https://doj-backend.onrender.com/api/get-initial-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
  
      const formattedData = data.map((item: any) => ({
        ...item,
        chatId: parseInt(item.chatId, 10),
        preview: item.question.length > 30 ? `${item.question.slice(0, 30)}...` : item.question, // Create a preview
      }));
  
      setChatHistory(formattedData);
  
      if (formattedData.length > 0) {
        const lastChat = formattedData[formattedData.length - 1];
        setLastChatId(lastChat.chatId); // Update the last chat ID
        setCurrentChat(lastChat.chatId);
        fetchChatMessages(lastChat.chatId);
      } else {
        setLastChatId(1); // Initialize with 1 if no chats exist
        const initialChatId = 1; // Start from 1 or the next available ID
        setCurrentChat(initialChatId);
        await startNewChat(initialChatId);
      }
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  };
  
  const fetchChatMessages = async (chatId: number) => {
    try {
      const res = await fetch(`https://doj-backend.onrender.com/api/get-chat-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, chatId: chatId }),
      });
      if (!res.ok) throw new Error('Failed to fetch chat messages');
      let data = await res.json();
      console.log(data);
      data = data.map((message: any) => ({
        ...message,
        formattedAnswer: formatText(`${message.answer}`),
      }));

      setChatMessages(data);
    } catch (err) {
      console.error('Error fetching chat messages:', err);
    }
  };

  const handleQuestionSubmit = async () => {
    try {
      const newQuestion = userInput;
      setPendingQuestion(newQuestion);
      setUserInput("");

      if (showNewChatPage) {
        setShowNewChatPage(false); // Hide the NewChatPage after the first question
      }

      // Save the question to the backend
      const res = await fetch("https://doj-backend.onrender.com/api/savechat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: newQuestion, email: userEmail, chatId: currentChat }),
      });
      if (!res.ok) throw new Error("Failed to save chat");
      const data = await res.json();
      console.log(data);
      fetchChatMessages(currentChat!);
    } catch (err) {
      console.error("Error saving question:", err);
    }
  };

  const handleNewChatClick = async () => {
    try {
      setShowNewChatPage(true);
      setShowChatHistory(false);
      setShowSettings(false);
  
      const newChatId = (lastChatId ?? 0) + 1; // Increment from the last chat ID
      setLastChatId(newChatId); // Update the last chat ID

      await fetch('https://doj-backend.onrender.com/api/start-new-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, chatId: newChatId }),
      });

      setChatHistory(prevHistory => [
        ...prevHistory,
        { chatId: newChatId, question: 'New Chat Started', preview: 'New Chat Started' }, // Ensure preview is provided
      ]);
  
      setChatMessages([]);
      setCurrentChat(newChatId);
    } catch (err) {
      console.error('Error starting new chat:', err);
    }
  };
  


  const handleChatHistoryClick = () => {
    setShowChatHistory(!showChatHistory);
    setShowNewChatPage(false);
    setShowSettings(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowNewChatPage(false);
    setShowChatHistory(false);
  };

  const handleChatSelect = (chatId: number) => {
    setCurrentChat(chatId);
    fetchChatMessages(chatId);
  };

  return (
    <div className="flex flex-col h-[90vh] w-[1000px] mx-auto bg-[#FFFFFF] rounded-2xl shadow-2xl">
      <header className="flex items-center justify-between w-full bg-[#FF9933] text-white py-4 px-6 rounded-t-lg">
        <h1 className="text-2xl font-bold">Department of Justice Chatbot</h1>
        <UserButton />
      </header>

      <div className="flex flex-1 overflow-hidden">
      <aside className="w-[30%] bg-gray-100 p-4 space-y-4 rounded-l-lg overflow-y-auto">
        <button
          onClick={handleNewChatClick}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#1E293B]/80 rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#D1D5DB]/70 hover:w-full"
        >
          <FaPlus className="w-5 h-5" />
          New Chat
        </button>
        <button
          onClick={handleChatHistoryClick}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#1E293B]/80 rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#D1D5DB]/70 hover:w-full"
        >
          <MessageCircleIcon className="w-5 h-5" />
          Chat History
          <span className={`transition-transform ${showChatHistory ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {showChatHistory && (
          <div className="mt-4">
            {chatHistory.map(chat => (
              <button
                key={chat.chatId}
                onClick={() => handleChatSelect(chat.chatId)}
                className="w-[300px] flex items-center gap-2 px-3 py-2 text-[#1E293B] hover:bg-[#D1D5DB]/70 rounded-md"
              >
                <CircleIcon className="w-5 h-5" />
                {`${chat.preview}`}
              </button>
            ))}

          </div>
        )}

        <button
          onClick={handleSettingsClick}
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#1E293B]/80 rounded-md px-3 py-2 transition-colors bg-[#F1F5F9]/50 hover:bg-[#D1D5DB]/70 hover:w-full"
        >
          <SettingsIcon className="w-5 h-5" />
          Settings
        </button>
      </aside>

        <main className="flex-1 p-6 overflow-y-auto">
        {showNewChatPage && <NewChatPage onStartNewChat={() => setShowNewChatPage(false)} />}
          {showSettings && <SettingsPage />}
          {!showSettings && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      <div className="bg-blue-100 p-3 rounded-md shadow-lg">
                        {message.question}
                      </div>
                      {message.answer && (
                        <div className="bg-gray-100 p-3 rounded-md shadow-lg">
                          {parse(message.formattedAnswer)}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* {pendingQuestion && (
                    <div className="bg-blue-100 p-3 rounded-md shadow-lg">
                      {pendingQuestion}
                    </div>
                  )} */}
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-100">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Ask a question..."
                />
                <Button
                  onClick={handleQuestionSubmit}
                  className="ml-4"
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}