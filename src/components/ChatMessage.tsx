import React from 'react';
import { Message } from '../types';
import { Volume as VolumeUp } from 'lucide-react';
import { speak } from '../utils/speech';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { content, sender, thinking } = message;
  const isAi = sender === 'ai';

  // Split AI response into thinking and response parts if thinking exists
  const hasThinkingContent = thinking || (isAi && content.includes('</think>'));
  
  let thinkingContent = '';
  let responseContent = content;
  
  if (isAi && content.includes('</think>')) {
    const parts = content.split('</think>');
    thinkingContent = parts[0].replace(/^\n+|\n+$/g, '');
    responseContent = parts[1].replace(/^\n+|\n+$/g, '');
  } else if (thinking) {
    thinkingContent = thinking;
  }

  const handleSpeak = () => {
    speak(responseContent);
  };

  return (
    <div className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
          isAi
            ? 'bg-gray-800 text-white'
            : 'bg-indigo-600 text-white ml-auto'
        }`}
      >
        {hasThinkingContent && (
          <div className="mb-2">
            <div className="text-xs text-indigo-300 font-medium mb-1">Düşünme Süreci</div>
            <div className="bg-gray-900 p-3 rounded text-gray-300 text-sm font-mono overflow-x-auto">
              {thinkingContent}
            </div>
          </div>
        )}
        
        <div className="text-sm md:text-base">
          {responseContent}
        </div>
        
        {isAi && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSpeak}
              className="text-indigo-300 hover:text-indigo-100 transition-colors"
              title="Sesli dinle"
            >
              <VolumeUp size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;