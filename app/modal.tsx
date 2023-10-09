import { StatusBar } from 'expo-status-bar';
import { Modal, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Link, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import AddTab from '../components/addTab';
import { useOpenAi } from '../utils/hooks/useOpenAi';

export default function ModalScreen() {
  const [showAddModal, setShowModal] = useState<boolean>(false)
  const params = useLocalSearchParams();
  const { appKey } = params;
  const { openAiMessages } = useOpenAi(appKey as string);

  const currentAppData = Object.keys(openAiMessages[appKey as string]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appKey} Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.settingsTitle}>
        <Text style={styles.subtitle}>Tab items</Text>
        <TouchableOpacity style={styles.addButton} onPress={()=> setShowModal(true)}>
            <FontAwesome name='plus' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
      {
        currentAppData.map(routeName => <View style={styles.routeItemContainer}>
          {/* TODO ponerle tipo a fontAwesome icons */}
          <FontAwesome name={openAiMessages[appKey as string][routeName].icon as 'home'} size={30} /> 
          <Text style={styles.routeItemText}>{routeName}</Text>
        </View>)
      }

      <Modal style={{ height: 300, width: '100%', justifyContent: 'center', alignItems: 'center'}} visible={showAddModal}>
        <AddTab appKey={appKey as string} handleClose={() => { setShowModal(false) }} />
      </Modal>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    marginRight: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  routeItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20
  },
  routeItemText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 16
  },
  settingsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto'
  },
  addButton: {
    borderRadius: 200,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f06359'
  }
  
  
});
