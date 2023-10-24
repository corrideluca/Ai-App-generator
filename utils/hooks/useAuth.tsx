import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
    GoogleSignin
    // User,
    // statusCodes,
} from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential, Auth } from 'firebase/auth';
import * as Keychain from 'react-native-keychain';
import { Platform } from 'react-native';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const FIREBASE_CONFIG = {
    apiKey:
        Platform.OS == 'ios' ? process.env.EXPO_PUBLIC_FIREBASE_IOS_KEY : process.env.EXPO_PUBLIC_FIREBASE_ANDROID_KEY,
    authDomain: 'com.deluca.AiApp',
    databaseURL: 'https://aiapp-b6950-default-rtdb.firebaseio.com/',
    projectId: 'aiapp-b6950-default-rtdb',
    appId:
        Platform.OS == 'ios'
            ? process.env.EXPO_PUBLIC_FIREBASE_IOS_APP_ID
            : process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID
};
const GOOGLE_CONFIG = {
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '230989196110-7t863r47cospaiqahqcc0srkronia7k2.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '230989196110-95fasa0fi9tb92st25m5u7q2dpnnfttt.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120 // [iOS] The desired height (and width) of the profile image. Defaults to 120px
};

initializeApp(FIREBASE_CONFIG);
GoogleSignin.configure(GOOGLE_CONFIG);

type AuthStoreStateVars = {
    userInfo?: Auth;
    isLoadingAuth: boolean;
    isLoadingConfig: boolean;
};
type AuthStoreState = {
    setUserInfo: (user: Auth) => void;
    setIsLoadingAuth: (isLoading: boolean) => void;
    setIsLoadingConfig: (isLoading: boolean) => void;
} & AuthStoreStateVars;

const initialState: AuthStoreStateVars = {
    userInfo: undefined,
    isLoadingAuth: false,
    isLoadingConfig: false
};

export const useAuthStore = create<AuthStoreState>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,
                setIsLoadingAuth: (isLoadingAuth) => set({ isLoadingAuth }),
                setIsLoadingConfig: (isLoadingConfig) => set({ isLoadingConfig }),
                setUserInfo: (userInfo) => set({ userInfo })
            }),
            { name: 'auth-sidebar-storage' }
        )
    )
);

export const useAuthActions = () => {
    const { setIsLoadingAuth, setUserInfo, isLoadingAuth, userInfo } = useAuthStore();

    useEffect(() => {}, []);

    const signIn = async () => {
        setIsLoadingAuth(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo.idToken) {
                const auth = getAuth();
                signInWithCredential(auth, GoogleAuthProvider.credential(userInfo.idToken)); // registers on firebase
                setUserInfo(auth);

                await Keychain.setGenericPassword(userInfo.user.email, userInfo.idToken, {
                    service: 'com.deluca.AiApp'
                });
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoadingAuth(false);
    };

    return { isLoadingAuth, signIn, userInfo };
};
