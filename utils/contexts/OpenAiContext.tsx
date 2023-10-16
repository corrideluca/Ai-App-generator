import React, { createContext, useEffect, useId, useState } from "react";
import OpenAI from "openai";
import axios, { AxiosInstance } from 'axios';
import {equalTo, get, getDatabase, orderByChild, push, query, ref, set} from 'firebase/database';
import { getAuth } from "firebase/auth";

export type MessagesAiType = {
    role: 'system' | 'assistant' | 'user',
    content: string
}[]

export type MessagesAiByApp = {
  [appKey: string]: {
    [routeName: string]: {
      messages: MessagesAiType,
      icon: string
    }
  };
}

const OpenAiContext = createContext<{
    openai?: OpenAI;
    openAiAuthAxios: AxiosInstance;
    setOpenAiMessages: React.Dispatch<React.SetStateAction<MessagesAiByApp>>;
    openAiMessages: MessagesAiByApp;
}>({
    openAiAuthAxios: axios.create(),
    openAiMessages: {},
    setOpenAiMessages: () => {}
});


const { Provider } = OpenAiContext;

interface Props {
    children: React.ReactNode;
}
const defaultMessegeConfig = {
  defaultApp: {
    home: {
      messages: [],
      icon: 'home'
    }
  }
}


const OpenAiConfigProvider: React.FC<Props> = ({ children }) => {
    
    // OpenAiMessages stores all user request, this allows to make iterations and to
    // reference previous messages.
    
    const [openAiMessages, setOpenAiMessages] = useState<MessagesAiByApp>(defaultMessegeConfig)


    const openai = new OpenAI({
        apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
        organization: process.env.EXPO_PUBLIC_OPENAI_ORG_KEY
    });
    
    const openAiAuthAxios = axios.create()

    openAiAuthAxios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`;
      
      
      return config;
    },
    (error) => {
      console.error('token error', error)
      return Promise.reject(error);
    })
  
  
  const loadUserApps = async () => {
    const auth = getAuth();
    const db = getDatabase();
    const appsRef = ref(db, 'apps');
    const userId = auth.currentUser?.uid;

    if (userId) {
      const userAppsQuery = query(appsRef, orderByChild('user'), equalTo(userId));
      get(userAppsQuery)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Data exists, so set it to the state
            const apps = [];
            snapshot.forEach((childSnapshot) => {
              apps.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
              });
            });
            console.log(apps, 'apps');
          } else {
            // Data does not exist for the given user
            console.log('No apps found for the user.');
          }
        })
        .catch((error) => {
          console.error('Error getting user apps:', error);
        });
    }


  }
  
  
  useEffect(() => {
    loadUserApps();

  }, [])
  
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
