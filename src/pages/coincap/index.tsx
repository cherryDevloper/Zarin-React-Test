import React, { useEffect, useState } from 'react';
import WebSocketService from '../../services/WebsocketService';

const CoinCap: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;

    const wsService = WebSocketService.getInstance(websocketUrl);

    wsService.onOpen(() => {
      console.log('websocket connected :>> ');
      setIsConnected(true);
    });

    wsService.onMessage((message) => {
      console.log('message :>> ', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    wsService.onError((error) => {
      console.error('websocket error:', error.message);
    });

    wsService.onClose(() => {
      console.log('websocket closed');

      setIsConnected(false);
    });

    return () => {
      wsService.close();
    };
  }, []);

  return (
    <div>
      {!isConnected && 'loadig..'}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoinCap;
