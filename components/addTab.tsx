
import { Button, StyleSheet, TextInput } from 'react-native';
import { View } from './Themed';
import { useState } from 'react';
import { useOpenAi } from '../utils/hooks/useOpenAi';

interface Props {
  appKey: string;
  handleClose: () => any;
}

const AddTab : React.FC<Props> = ({appKey, handleClose}) => {
  const { handleAddTabItem } = useOpenAi(appKey);
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string>('');

  return (
    <View style={styles.container}>
        <TextInput placeholder='Name' onChangeText={setName} />
        <TextInput  placeholder='Icon' onChangeText={setIcon}/>
      <Button onPress={() => {
        handleAddTabItem(appKey as string, name, icon);
        handleClose();
      }} title='Create' />
    </View>
  );
}

export default AddTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
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
