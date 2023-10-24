import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuthActions } from '../utils/hooks/useAuth';
import { OpenAiContext } from '../utils/contexts/OpenAiContext';

const Login: React.FC = () => {
    const { signIn, isLoadingAuth } = useAuthActions();
    const { loadUserApps } = useContext(OpenAiContext);

    const handleSignIn = async () => {
        signIn().then(() => {
            loadUserApps();
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleSignIn}
                disabled={isLoadingAuth}
            />
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});
