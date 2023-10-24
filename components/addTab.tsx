import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useOpenAi } from '../utils/hooks/useOpenAi';
import Colors from '../constants/Colors';

type Props = {
    appKey: string;
    handleClose: () => unknown;
};

const AddTab: React.FC<Props> = ({ appKey, handleClose }) => {
    const { handleAddTabItem } = useOpenAi(appKey);
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string>('');

    return (
        <View style={styles.modal}>
            <View onTouchStart={() => {}} style={styles.container}>
                <TextInput style={styles.input} placeholder="Name" autoCapitalize={'none'} onChangeText={setName} />

                <TextInput style={styles.input} placeholder="Icon" autoCapitalize={'none'} onChangeText={setIcon} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleAddTabItem(appKey as string, name, icon);
                        handleClose();
                    }}
                >
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddTab;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0, .5)',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 20,
        width: 345,
        height: 310,
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.dark.background,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    appContainer: {
        padding: 20,
        flexDirection: 'row'
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
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
        fontSize: 16
    }
});
