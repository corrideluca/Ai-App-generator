import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { OpenAiContext } from '../utils/contexts/OpenAiContext';
import { router } from 'expo-router';

export default function LobyScreen() {
  const { openAiMessages } = useContext(OpenAiContext);

  return (
    <SafeAreaView style={styles.container}>

      {Object.keys(openAiMessages).map(appName => <TouchableOpacity style={styles.appContainer} onPress={()=>router.push({
          pathname: "/appTabbar",
          params: { appKey: appName },
      })}>
            <Text style={styles.appName}>{appName}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.appContainer}>
          <Text>Create New App</Text>
      </View>
      

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 30,
    marginTop: 30,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  appContainer: {
    marginTop: 10,
    width: '48%',
    aspectRatio: 1/1,
    backgroundColor: '#FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
