import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import {  GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {useAuthActions} from "../utils/hooks/useAuth";

const Login: React.FC = () => {
    const {signIn, isLoadingAuth} = useAuthActions();


    return <SafeAreaView style={styles.container}>
        <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isLoadingAuth}
        />
    </SafeAreaView>
}

export default Login;


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})
