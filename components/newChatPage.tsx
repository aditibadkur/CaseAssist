// components/newChatPage.tsx

import React from 'react';

type NewChatPageProps = {
  onStartNewChat: () => void; // This is the expected type for the `onStartNewChat` prop
};

const NewChatPage: React.FC<NewChatPageProps> = ({ onStartNewChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-2xl font-bold mb-4">Start a New Chat</h2> 
    </div>
  );
};

export default NewChatPage;



// <div className="flex flex-col items-center justify-center h-full p-6">
// <h2 className="text-2xl font-bold mb-4">Start a New Chat</h2> 