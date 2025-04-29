export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  thinking?: string;
  module?: 'db' | 'pdf';
}

export interface ApiRequest {
  query: string;
  module: 'db' | 'pdf';
}

export interface ApiResponse {
  module: 'db' | 'pdf';
  query: string;
  response: string;
}