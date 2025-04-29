export const speak = (text: string): void => {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return;
  }

  // Filter out the thinking part if present
  const cleanText = text.includes('</think>') 
    ? text.split('</think>').pop()?.trim() || text
    : text;

  // Stop any current speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'tr-TR'; // Turkish language
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};

export const startListening = (
  onResult: (text: string) => void,
  onEnd: () => void
): (() => void) => {
  if (!('webkitSpeechRecognition' in window)) {
    console.error('Speech recognition not supported');
    return () => {};
  }

  // @ts-ignore - webkitSpeechRecognition is not in the TypeScript types
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'tr-TR';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onend = () => {
    onEnd();
  };

  recognition.start();

  // Return function to stop listening
  return () => recognition.stop();
};