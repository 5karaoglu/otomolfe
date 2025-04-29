import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';
import { startListening } from '../utils/speech';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    if (isListening) return;
    
    setIsListening(true);
    const stopListening = startListening(
      (text) => {
        setMessage(text);
      },
      () => {
        setIsListening(false);
      }
    );

    // Automatically stop after 10 seconds to prevent indefinite listening
    setTimeout(() => {
      stopListening();
    }, 10000);
  };

  return (
    <div className="border-t border-gray-700 p-4 bg-gray-900">
      <div className="flex items-center gap-2">
        <textarea
          className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Mesajınızı yazın..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full ${
            isListening 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-800 text-indigo-400 hover:bg-gray-700'
          }`}
          disabled={isLoading}
          title="Sesli mesaj gönder"
        >
          <Mic size={20} />
        </button>
        <button
          onClick={handleSend}
          className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim() || isLoading}
          title="Mesaj gönder"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;