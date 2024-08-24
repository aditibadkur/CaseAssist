    "use client"
    import { useState } from "react";
    import { Button } from "@/components/ui/button";

    export default function NewChatPage({ onStartNewChat }) {
    const [newChatMessage, setNewChatMessage] = useState("");

    const handleStartNewChat = () => {
        if (newChatMessage.trim()) {
        onStartNewChat(newChatMessage); // Notify the parent component to handle the new chat
        setNewChatMessage(""); // Reset the input field
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-6">
        <h2 className="text-2xl font-bold mb-4">Start a New Chat</h2>
        <input
            value={newChatMessage}
            onChange={(e) => setNewChatMessage(e.target.value)}
            className="w-full max-w-md p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter your initial message..."
        />
        <Button onClick={handleStartNewChat} className="bg-[#FF9933] text-white p-2 rounded-lg">
            Start Chat
        </Button>
        </div>
    );
    }
