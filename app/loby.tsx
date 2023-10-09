import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { OpenAiContext } from '../utils/contexts/OpenAiContext';

export default function LobyScreen() {
  const { openAiMessages } = useContext(OpenAiContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select one of your apps </Text>
      {Object.keys(openAiMessages).map(appName => <View style={styles.appContainer}>
        <Link href={{
          pathname: "/appTabbar",
          params: { appKey: appName },
        }}>
          <Text>{appName}</Text>
        </Link>
      </View>)}


      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  appContainer: {
    padding: 20,
    flexDirection: 'row'
  }
});
