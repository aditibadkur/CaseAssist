// components/newChatPage.tsx

import React from 'react';

type NewChatPageProps = {
  onStartNewChat: () => void;
};

const NewChatPage: React.FC<NewChatPageProps> = ({ onStartNewChat }) => {
  return (
    <div className="fixed flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold">Start a New Chat</h2> 
    </div>
  );
};

export default NewChatPage;
