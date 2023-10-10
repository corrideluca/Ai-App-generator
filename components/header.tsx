import { Pressable, SafeAreaView, StyleSheet, useColorScheme } from "react-native"
import { Text, View } from "./Themed"
import Colors from "../constants/Colors";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
    appKey: string
}

const Header: React.FC<Props> = ({ appKey }) => {
    const colorScheme = useColorScheme()

    return <View style={styles.headerContainer}>
        <SafeAreaView style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
            <Link style={{ zIndex: 3, position: 'absolute', left: 5, bottom: 0 }} href={{pathname: "/", params: { appKey }}} asChild>
                <Pressable>
                    {({ pressed }) => (
                        <FontAwesome
                            name="chevron-left"
                            size={25}
                            color={'#fff'}
                            style={{marginLeft: 15,opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>
            </Link>   
            
            <Text style={styles.headerText}>{appKey}</Text>
            <Link style={{ zIndex: 3, position: 'absolute', right: 5, bottom: 0 }} href={{pathname: "/modal", params: { appKey }}} asChild>
                <Pressable>
                    {({ pressed }) => (
                        <FontAwesome
                            name="edit"
                            size={25}
                            color={'#fff'}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>
            </Link>   
        </SafeAreaView>
    </View>
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.green.background,
    height: 107,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  }
});

