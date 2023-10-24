import { StatusBar } from 'expo-status-bar';
import { Modal, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Link, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import AddTab from '../components/addTab';
import { useOpenAi } from '../utils/hooks/useOpenAi';
import Colors from '../constants/Colors';

export default function ModalScreen() {
  const [showAddModal, setShowModal] = useState<boolean>(false)
  const params = useLocalSearchParams();
  const { appKey } = params;
  const { openAiMessages } = useOpenAi(appKey as string);

  const currentAppData = openAiMessages.find(app => app.firebaseId == appKey);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={[styles.settingsTitle, {marginTop: 0}]}>
        <Text style={styles.subtitle}>Tab items</Text>
      </View>
      {
        currentAppData?.routes.map(routeName => <View style={styles.routeItemContainer}>
          {/* TODO ponerle tipo a fontAwesome icons */}
          <FontAwesome name={routeName.icon as 'home'} size={30} /> 
          <Text style={styles.routeItemText}>{routeName.name}</Text>
        </View>)
      }
      
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <View style={styles.addIcon}>
          <FontAwesome name='plus' color={Colors.green.background} size={25} />
        </View>
          <Text style={styles.buttonText}>Add new tab</Text>
      </TouchableOpacity>

      <View style={styles.settingsTitle}>
        <Text style={styles.subtitle}>Splash-Animation</Text>
      </View>

      <View style={styles.settingsTitle}>
        <Text style={styles.subtitle}>Releases</Text>
      </View>

      <Modal transparent visible={showAddModal}>
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
    fontWeight: '600',
    verticalAlign: 'middle',
    color: '#ffff'
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
    marginLeft: 16,
    color: Colors.gray.text
  },
  settingsTitle: {
    backgroundColor: Colors.green.background,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    paddingVertical: 5,
    marginTop: 20
  },
  addButton: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green.background,
    paddingVertical: 16,
    flexDirection: 'row',
    borderRadius: 50,

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  addIcon: {
    backgroundColor: '#fff',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    borderRadius: 30,
  },
});
