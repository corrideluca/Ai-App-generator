import { ActivityIndicator, Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useContext, useState } from 'react';
import { OpenAiContext } from '../../utils/contexts/OpenAiContext';
import { useOpenAi } from '../../utils/hooks/useOpenAi';
import { AxiosResponse } from 'axios';
import WebView from 'react-native-webview';

export default function TabOneScreen() {
  const {handleRequestHtml, isLoading} = useOpenAi()
  const [userInput, setUserInput] = useState<string>('')
  const [html, setHtml] = useState('');

  const handleChangeHtml = (response: AxiosResponse) => {
    setHtml(response.data.choices[0].message.content)
  }

  if (html) {
    return <View style={{height: '100%', width: '100%'}}>
      <WebView scalesPageToFit source={{ html: html }} />
      
      <View style={styles.inputContainer}>
        {isLoading ? <ActivityIndicator /> : <>
            <TextInput style={styles.input} placeholder='Write GPT here' onChangeText={setUserInput} />
            <Button
              title='Enviar'
              onPress={() => { handleRequestHtml(userInput, handleChangeHtml) }} />
          </>
        }
          
        </View>
    </View>
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edita esta seccion utilizando el input</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {isLoading ? <ActivityIndicator /> :
        <View>
          <TextInput placeholder='Write GPT here' onChangeText={setUserInput} />
          <Button title='Enviar' onPress={() => { handleRequestHtml(userInput, handleChangeHtml) }} />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    padding: 20
  },
  button: {
    right: 0
  },
  input: {
    width: '80%'
  }
});
