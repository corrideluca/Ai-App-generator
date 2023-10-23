import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { OpenAiConfigProvider } from '../utils/contexts/OpenAiContext';
import Colors from '../constants/Colors';
import Login from '../components/Login';
import {useAuthStore} from "../utils/hooks/useAuth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
    const [loaded, error] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    });
    const {userInfo, isLoadingConfig} = useAuthStore()


  useEffect(() => {
      if (error) throw error;
    }, [error]);

    useEffect(() => {
      if (loaded && !isLoadingConfig) {
        SplashScreen.hideAsync();
      }
    }, [loaded, isLoadingConfig]);

    if (!loaded || isLoadingConfig) {
      return null;
    }


  if (!userInfo) {
    return <Login />
  }

  const Header = () => {
    return <View style={styles.headerContainer}>
      <SafeAreaView>
        <Text style={styles.headerText}>Apps</Text>
      </SafeAreaView>
    </View>
  }

  return (
    <OpenAiConfigProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name='index' options={{headerShown: true, header: Header}}/>
            <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name='appTabbar' options={{headerShown: false}}/>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          </Stack>
      </ThemeProvider>
    </OpenAiConfigProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.green.background,
    height: 107,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500'
  }
});

