import { ActivityIndicator, Button, StyleSheet, TextInput } from 'react-native';

import { useContext, useState } from 'react';
import { AxiosResponse } from 'axios';
import WebView from 'react-native-webview';
import { useOpenAi } from '../utils/hooks/useOpenAi';
import { Text, View } from './Themed';

interface Props {
  appKey: string;
  routeName: string;
}

const IAEditableScreen: React.FC<Props> = ({appKey, routeName}) => {
  const {handleRequestHtml, isLoading, openAiMessages} = useOpenAi(appKey, routeName)
  const [userInput, setUserInput] = useState<string>('')
  const [html, setHtml] = useState<string>('');

  const handleChangeHtml = (response: AxiosResponse) => {
    const htmlContent = response.data.choices[0].message.content;
    console.log(htmlContent, 'this is the html content')

    setHtml(htmlContent)
    console.log('asdasdas')
  }

  const lastResponse = openAiMessages[appKey][routeName].messages.findLast(messageData => messageData.role == 'assistant')

  if (lastResponse?.content) {
    return <View style={{height: '100%', width: '100%'}}>
      <WebView scalesPageToFit source={{ html: lastResponse?.content }} />
      
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


export default IAEditableScreen;