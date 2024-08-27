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
import { AiOutlineLoading3Quarters as LoadingIcon } from "react-icons/ai";

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
  const [loading, setLoading] = useState(true); // Start with loading true

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

  useEffect(() => {
    // Run this useEffect when the component first mounts to make a "useless" API call
    const keepServerActive = async () => {
      try {
        await fetch('https://doj-backend.onrender.com/api/keep-alive', {
          method: 'GET',
        });
        // Simulate a 60-second loading period
        setTimeout(() => {
          setLoading(false);
        }, 60000); // 60 seconds
      } catch (err) {
        console.error('Error keeping server active:', err);
        setLoading(false); // Stop loading in case of error
      }
    };

    keepServerActive();
  }, []);

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
      setLoading(true); // Start loading

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
      fetchChatMessages(currentChat!);setLoading(false); // Stop loading once the answer is received
    } catch (err) {
      console.error("Error saving question:", err);
      setLoading(false); // Stop loading in case of error
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
    <div className="flex flex-col h-[90vh] w-[1000px] mx-auto bg-[#f0f0f0] rounded-lg shadow-lg p-4 overflow-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingIcon className="animate-spin text-blue-500" size={48} />
          <span className="ml-2 text-blue-500 font-semibold">Loading...</span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Chatbot</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex-1 overflow-auto mt-4">
            {currentChat && chatMessages.length > 0 ? (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                {chatMessages.map((message, index) => (
                  <div key={index} className="mb-4">
                    <div className="text-blue-600 font-semibold">You:</div>
                    <div>{message.question}</div>
                    <div className="text-blue-600 font-semibold mt-2">Bot:</div>
                    <div>{parse(message.formattedAnswer)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 text-center">
                {pendingQuestion ? "Awaiting response..." : "No messages yet."}
              </div>
            )}
          </div>
          <div className="flex items-center mt-4">
            <input
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              type="text"
              placeholder="Ask a question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              onClick={handleQuestionSubmit}
            >
              Submit
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
              onClick={handleChatHistoryClick}
            >
              <MessageCircleIcon className="inline-block mr-2" /> Chat History
            </button>
            <button
              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
              onClick={handleSettingsClick}
            >
              <SettingsIcon className="inline-block mr-2" /> Settings
            </button>
            <button
              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
              onClick={handleNewChatClick}
            >
              <FaPlus className="inline-block mr-2" /> New Chat
            </button>
          </div>
          {showChatHistory && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Chat History</h2>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setShowChatHistory(false)}
                >
                  <XIcon size={20} />
                </button>
              </div>
              <ul className="mt-4">
                {chatHistory.map((chat) => (
                  <li
                    key={chat.chatId}
                    className="mb-2 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleChatSelect(chat.chatId)}
                  >
                    {chat.preview}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showSettings && <SettingsPage />}
          {showNewChatPage && <NewChatPage onStartNewChat={handleNewChatClick} />}
        </>
      )}
    </div>
  );
}
