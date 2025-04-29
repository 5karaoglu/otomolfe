import { ApiRequest, ApiResponse } from '../types';

export const fetchResponse = async (request: ApiRequest): Promise<ApiResponse> => {
  try {
    const API_URL = '/api/query';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'omit',
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API error: ${response.status} - ${response.statusText}${
          errorText ? ` - ${errorText}` : ''
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching response:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while communicating with the server'
    );
  }
};