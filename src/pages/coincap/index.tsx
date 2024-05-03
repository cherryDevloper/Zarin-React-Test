import React, { useEffect, useState } from 'react';
import WebSocketService from '../../services/WebsocketService';
import Loading from '../../components/Loading';
import { Table } from 'antd';
import Layout from '../../components/Layout';

interface CoinData {
  name: string;
  price: number | undefined; // Since prices can be undefined
}
const initialCoinData: CoinData[] = [
  { name: 'bitcoin', price: undefined },
  { name: 'ethereum', price: undefined },
];
const CoinCap: React.FC = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleMessage = (message: string) => {
    try {
      const parsedData = JSON.parse(message);
      if (!parsedData) {
        return;
      }

      setCoinData((prevData) => {
        if (prevData.length === 0) {
          return initialCoinData;
        }

        return prevData.map((coin) => {
          if (
            coin.name === 'bitcoin' &&
            typeof parsedData.bitcoin !== 'undefined'
          ) {
            return { ...coin, price: parsedData.bitcoin };
          }

          if (
            coin.name === 'ethereum' &&
            typeof parsedData.ethereum !== 'undefined'
          ) {
            return { ...coin, price: parsedData.ethereum };
          }

          return coin;
        });
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;

    const wsService = WebSocketService.getInstance(websocketUrl);

    wsService.onOpen(() => {
      console.log('websocket connected :>> ');
      setIsConnected(true);
    });

    wsService.onMessage(handleMessage);

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
    <Layout>
      <div className="w-full flex justify-center items-center">
        {!isConnected && <Loading />}
      </div>
      <div>
        <Table
          loading={!isConnected}
          columns={columns}
          dataSource={coinData}
          rowKey="name" //Unique rowKey based on name
          pagination={false}
        />{' '}
      </div>{' '}
    </Layout>
  );
};

export default CoinCap;

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'price',
  },
];
