import React, { createContext, useEffect, useId, useState } from "react";
import OpenAI from "openai";
import axios, { AxiosInstance } from 'axios';
import {equalTo, get, getDatabase, orderByChild, push, query, ref, set} from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthActions } from "../hooks/useAuth";

export type MessagesAiType = {
    role: 'system' | 'assistant' | 'user',
    content: string
}[]


export type MessagesAiByApp = {
  [appKey: string]: {
    [routeName: string]: {
      messages: MessagesAiType;
      icon: string;
    },
  }
};

export type RouteType = {
  messages: MessagesAiType,
  icon: string,
  name: string,
  firebaseId: string
};

export type App = {
  name: string
  firebaseId: string,
  routes: RouteType[]
};

export type Apps = App[];


const OpenAiContext = createContext<{
  openai?: OpenAI;
  openAiAuthAxios: AxiosInstance;
  setOpenAiMessages: React.Dispatch<React.SetStateAction<Apps>>;
  openAiMessages: Apps;
  loadUserApps: () => void;
}>({
    openAiAuthAxios: axios.create(),
    openAiMessages: [],
    setOpenAiMessages: () => { },
    loadUserApps: () => {},

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
    
    const [openAiMessages, setOpenAiMessages] = useState<Apps>([])
    const {userInfo, isLoadingAuth} = useAuthActions();

  
    const loadData = async () => {
      await loadUserApps();
    }
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          loadUserApps()
        }
      });
      return () => unsubscribe();
    }, [isLoadingAuth])
  
  
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
    // TODO aca hay que agregar un loader
    const auth = getAuth();
    const db = getDatabase();
    const appsRef = ref(db, 'apps');
    const userId = auth.currentUser?.uid;

    if (userId) {
      const userAppsQuery = query(appsRef, orderByChild('user'), equalTo(userId));
      get(userAppsQuery)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const apps: Apps = [];

            // Data exists, so set it to the state
            // Aca la data de la app es el 2do elemento [DATA DE APP, USUARIO];
            snapshot.forEach(childSnapshot => {
              const appData = childSnapshot.val() 
              const appName = Object.keys(childSnapshot.val())[0];      
              
              const appRoutes = appData[appName].routes;

              const cleanedRoutes = Object.keys(appRoutes).map(routeFbId => ({
                name: appRoutes[routeFbId].name,
                icon: appRoutes[routeFbId].icon,
                firebaseId: routeFbId,
                messages: appRoutes[routeFbId].messages,
              }))              


              apps.push({
                firebaseId: childSnapshot.key,
                name: appName,
                routes: cleanedRoutes
              })
              
            });
            console.error(apps)
            setOpenAiMessages(apps);
          } else {
            // Data does not exist for the given user
            console.error('No apps found for the user.');
          }
        })
        .catch((error) => {
          console.error('Error getting user apps:', error);
        });
      
      
    }


  }
  

  return (
    <Provider
      value={{
        openai,
        openAiAuthAxios,
        setOpenAiMessages,
        openAiMessages,
        loadUserApps,
      }}
      >
        {children}
    </Provider>
  );
};

export { OpenAiConfigProvider, OpenAiContext };
