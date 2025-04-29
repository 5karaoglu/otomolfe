import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import { Message } from '../types';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-950">
      <div className="max-w-3xl mx-auto">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && <LoadingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;