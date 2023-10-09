import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import OpenAI from "openai";
import axios, { AxiosInstance } from 'axios';
import IAEditableScreen from "../../components/IaEditableView";

type routeType = {
    name: string;
    component: any; // TODO ver como aca ponerle componente sin que pinche por todos lados
    icon: string;
}

type AppBarType = {
    name: string;
    routes: routeType[]
}

const TabContext = createContext<{
    appBarSettings: AppBarType[];
    setAppBarSettings: React.Dispatch<React.SetStateAction<AppBarType[]>>;
}>({
    appBarSettings: [],
    setAppBarSettings: () => { }
});


const { Provider } = TabContext;

interface Props {
    children: React.ReactNode;
}

export const defaultApp = {
    name: 'defaultApp',
    routes: [
        {
            name: 'home',
            icon: 'home',
            component: IAEditableScreen,
        }
    ]
} 

const DynamicTabCreatorProvider: React.FC<Props> = ({ children }) => {   
    const [appBarSettings, setAppBarSettings] = useState<AppBarType[]>([
        defaultApp
    ]);


    return (<Provider value={{
        appBarSettings,
        setAppBarSettings
    }}>
        {children}
     </Provider>
    );
};

export {
    DynamicTabCreatorProvider, 
    TabContext
};
