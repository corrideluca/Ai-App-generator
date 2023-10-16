import { StatusBar } from 'expo-status-bar';
import { Modal, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { OpenAiContext } from '../utils/contexts/OpenAiContext';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useOpenAi } from '../utils/hooks/useOpenAi';
import { getAuth } from 'firebase/auth';

export default function LobyScreen() {
  const { openAiMessages, handleAddApp } = useOpenAi();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [newAppName, setNewAppName] = useState<string>('');

  const addNewApp = () => {
    setIsModalOpen(false);
    handleAddApp(newAppName);
    setNewAppName('');
  }

  return (
    <SafeAreaView style={styles.container}>

      {Object.keys(openAiMessages).map(appName => <TouchableOpacity style={styles.appContainer} onPress={()=>router.push({
          pathname: "/appTabbar",
          params: { appKey: appName },
      })}>
            <Text style={styles.appName}>{appName}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={()=> {setIsModalOpen(true)}} style={styles.appContainer}>
        <Text style={styles.createAppText}>Create new App</Text>
        <View style={styles.addApp}>
          <FontAwesome name='plus' size={20} color={'#fff'} />  
        </View>
      </TouchableOpacity>
      

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <Modal transparent visible={isModalOpen}>
        <View style={styles.modal}>
          <View onTouchStart={()=> {}} style={styles.modalContainer}>
            <TextInput
              value={newAppName}
              style={styles.input}
              placeholder='App Name'
              autoCapitalize={'none'}
              onChangeText={setNewAppName} />    
            
            <TouchableOpacity style={styles.button} onPress={addNewApp}>
              <Text style={styles.buttonText}>Add new app</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
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
  },
  addApp: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: Colors.green.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAppText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10
  },
    modal: {
    backgroundColor: 'rgba(0,0,0, .5)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
    width: 345,
    height: 250,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green.background,
    paddingVertical: 16,
    flexDirection: 'row',
    borderRadius: 50,
    marginTop: 'auto'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  input: {
    width: '100%',
    backgroundColor: '#ededed',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 50,
    borderWidth: .5,
    borderColor: '#DDDDDD',
    fontSize: 16,
    borderRadius: 10,
  }
});
