import React, { createContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GoogleAuthProvider, getAuth, signInWithCredential} from 'firebase/auth'
import * as Keychain from 'react-native-keychain';
import { Platform } from "react-native";



const firebaseConfig = {
  apiKey: Platform.OS == 'ios' ? process.env.EXPO_PUBLIC_FIREBASE_IOS_KEY : process.env.EXPO_PUBLIC_FIREBASE_ANDROID_KEY ,
  authDomain: 'com.deluca.AiApp',
  databaseURL: 'https://aiapp-b6950-default-rtdb.firebaseio.com/',
  projectId: 'aiapp-b6950-default-rtdb',
  appId: Platform.OS == 'ios' ? process.env.EXPO_PUBLIC_FIREBASE_IOS_APP_ID : process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID,
};

const AuthContext = createContext<{
    userInfo?: {} | null,
    signIn?: () => Promise<void> | void;
    setUserInfo?: React.Dispatch<React.SetStateAction<{}>>;
    isLoading?: boolean;
    loadingConfig?: boolean
}>({
    signIn: () => {},
    setUserInfo: ()=>{}
});


const { Provider } = AuthContext;

interface Props {
    children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {  
  const [userInfo, setUserInfo] = useState<null | {}>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingConfig, setLoadingConfig] = useState(true)

  useEffect(() => {
      const app = initializeApp(firebaseConfig);
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '230989196110-7t863r47cospaiqahqcc0srkronia7k2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '230989196110-95fasa0fi9tb92st25m5u7q2dpnnfttt.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
      });
    
    loadUserSession(); // Checks if the user has prevously logged in
    setLoadingConfig(false);
  }, [])

  const loadUserSession = async () => {
    try {
      await Keychain.getGenericPassword({
        service: "com.deluca.AiApp",
      })
      .then((result) => {
        setIsLoading(true);
        if (typeof result !== "boolean") {
          googleSignIn(result.password);
          return;
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error, 'ERROR LOGIN IN');
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error)
    }
    
    if (!getAuth().currentUser) {
      await Keychain.resetGenericPassword();
      getAuth().signOut();
    }
  }


  const googleSignIn = (idToken: string) => {
    const auth = getAuth();
    signInWithCredential(auth, GoogleAuthProvider.credential(idToken)) // registers on firebase 
    setUserInfo(auth);
  }

  const signIn = async () => {
        setIsLoading(true)
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        
        if (userInfo.idToken) {
          googleSignIn(userInfo.idToken);
          await Keychain.setGenericPassword(userInfo.user.email, userInfo.idToken, {
            service: 'com.deluca.AiApp'
          });
        }

    } catch (error) {
        console.error(error)
        // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //     user cancelled the login flow
        // } else if (error.code === statusCodes.IN_PROGRESS) {
        //     operation (e.g. sign in) is in progress already
        // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //     play services not available or outdated
        // } else {
        //     some other error happened
        // }
    }
    setIsLoading(false)
  }  

  return (
    <Provider value={{setUserInfo, userInfo, signIn, isLoading, loadingConfig}}>
        {children}
    </Provider>
  );
};

export { AuthProvider, AuthContext };
