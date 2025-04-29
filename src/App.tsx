import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import { Message } from './types';
import { fetchResponse } from './utils/api';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModule, setActiveModule] = useState<'db' | 'pdf'>('db');

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      content: "Merhaba ben Maivo tarafından geliştirilen Yapay Zeka Asistanı Otomol Ai. Size nasıl yardımcı olabilirim?",
      sender: 'ai',
      timestamp: new Date(),
      module: 'db'
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
      module: activeModule
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to API
      const response = await fetchResponse({
        query: content,
        module: activeModule
      });

      // Add AI response to chat
      const aiMessage: Message = {
        id: uuidv4(),
        content: response.response,
        sender: 'ai',
        timestamp: new Date(),
        module: activeModule
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
        sender: 'ai',
        timestamp: new Date(),
        module: activeModule
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModuleChange = (module: 'db' | 'pdf') => {
    setActiveModule(module);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Header 
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
      />
      
      <ChatContainer 
        messages={messages}
        isLoading={isLoading}
      />
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;