import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IAEditableScreen from "./IaEditableView";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { View } from "./Themed";
import { useOpenAi } from "../utils/hooks/useOpenAi";
import Header from "./header";

const Tab = createBottomTabNavigator();

interface Props {
    appKey: string
}

const TabbarNavigator : React.FC<Props> = ({appKey}) => {
  const colorScheme = useColorScheme();
  const {openAiMessages} = useOpenAi(appKey);
    
  if (!appKey) {
      return <View />
  }  
    
  return (
    <NavigationContainer independent>
          <Tab.Navigator screenOptions={({ route }) => ({
              header: () => <Header appKey={appKey} />,
              tabBarIcon: ({ focused, color, size }) => {
              const selectedRoute = route.name

              let tabBarIcon;
              if (openAiMessages && route) {
                tabBarIcon = openAiMessages[appKey][selectedRoute].icon
              }

              // You can return any component that you like here!
            return <FontAwesome name={tabBarIcon as 'home'} color={color} size={30} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          })}>
              {Object.keys(openAiMessages[appKey]).map(routeNames =>  <Tab.Screen
                  name={routeNames}
                  component={() => <IAEditableScreen appKey={appKey} routeName={routeNames} />}
              />)}

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabbarNavigator