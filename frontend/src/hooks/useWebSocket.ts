import { useEffect } from 'react';

const useWebSocket = (url: string, onMessage: (event: MessageEvent) => void) => {
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.addEventListener('message', onMessage);

    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket.close();
    };
  }, [url, onMessage]);
};

export default useWebSocket;
