import { ActivityIndicator, Button, StyleSheet, TextInput } from 'react-native';

import { useContext, useState } from 'react';
import { AxiosResponse } from 'axios';
import WebView from 'react-native-webview';
import { useOpenAi } from '../utils/hooks/useOpenAi';
import { Text, View } from './Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface Props {
  appKey: string;
  routeName: string;
}

const IAEditableScreen: React.FC<Props> = ({appKey, routeName}) => {
  const {handleRequestHtml, isLoading, openAiMessages} = useOpenAi(appKey, routeName)
  const [userInput, setUserInput] = useState<string>('')
  const [html, setHtml] = useState<string>('');

  const handleChangeHtml = (response: AxiosResponse) => {
    // TODO ver si esto sigue siendo necesesario, parece que no
    const htmlContent = response.data.choices[0].message.content;
    setHtml(htmlContent)
  }

  const lastResponse = openAiMessages[appKey][routeName].messages.findLast(messageData => messageData.role == 'assistant')

  if (lastResponse?.content) {
    return <View style={{height: '100%', width: '100%'}}>
      <WebView scalesPageToFit source={{ html: lastResponse?.content }} />
      
      <View style={styles.inputContainer}>
        {isLoading ? <ActivityIndicator /> : <>
            <TextInput style={styles.input} placeholder='Write GPT here' onChangeText={setUserInput} />
            <Button
              title='Send'
              onPress={() => { handleRequestHtml(userInput, handleChangeHtml) }} />
          </>
        }      
        </View>
    </View>
  }


  return (
    <View style={styles.container}>
      <Text style={styles.exampleText}>Write to the AI to start building your app. For example: ”I want a Neon looking tic-tac-toe with a reset button”</Text>

      {isLoading ? <ActivityIndicator /> :
        <View style={{ width: '100%', position: 'relative' }}>
            <TextInput placeholder='Write GPT here' multiline pointerEvents='box-only' style={styles.gptInput} onChangeText={setUserInput} />
            <TouchableOpacity style={styles.sendButton} onPress={() => { handleRequestHtml(userInput, handleChangeHtml) }}>
              <FontAwesome name='paper-plane' size={25} color={Colors.green.background} />
            </TouchableOpacity>
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
    padding: 20
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
  },
  exampleText: {
    textAlign: 'center',
    maxWidth: 300,
    color: '#848484',
    fontSize: 18
  },
  gptInput: {
    height: '50%',
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    fontSize: 18,
    marginTop: 'auto',
    padding: 20,
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    zIndex: 3
  }
});


export default IAEditableScreen;