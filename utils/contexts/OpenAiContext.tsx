import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import OpenAI from "openai";
import axios, { AxiosInstance } from 'axios';

export type MessagesAiType = {
    role: 'system' | 'assistant' | 'user',
    content: string
}[]

const OpenAiContext = createContext<{
    openai?: OpenAI,
    openAiAuthAxios: AxiosInstance,
    setOpenAiMessages: React.Dispatch<React.SetStateAction<MessagesAiType>>
    openAiMessages: MessagesAiType
}>({
    openAiAuthAxios: axios.create(),
    openAiMessages: [],
    setOpenAiMessages: () => {}
});


const { Provider } = OpenAiContext;

interface Props {
    children: React.ReactNode;
}


const OpenAiConfigProvider: React.FC<Props> = ({ children }) => {
    
    // OpenAiMessages stores all user request, this allows to make iterations and to
    // reference previous messages.
    const [openAiMessages, setOpenAiMessages] = useState<MessagesAiType>([])


    const openai = new OpenAI({
        apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
        organization: process.env.EXPO_PUBLIC_OPENAI_ORG_KEY
    });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
    };

    
    const openAiAuthAxios = axios.create()

    openAiAuthAxios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`;
      
      
      return config;
    },
    (error) => {
      console.error('token error', error)
      return Promise.reject(error);
    })


  return (
    <Provider
      value={{
        openai,
        openAiAuthAxios,
        setOpenAiMessages,
        openAiMessages
      }}
      >
        {children}
    </Provider>
  );
};

export { OpenAiConfigProvider, OpenAiContext };
