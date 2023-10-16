import React, { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AuthContext } from "../utils/contexts/AuthContext";


const Login: React.FC = () => {
    const {signIn, isLoading} = useContext(AuthContext); 


    return <SafeAreaView style={styles.container}>
        <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isLoading}
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