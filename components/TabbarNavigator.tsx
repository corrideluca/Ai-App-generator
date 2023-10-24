import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IAEditableScreen from './IaEditableView';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { View } from './Themed';
import { useOpenAi } from '../utils/hooks/useOpenAi';
import Header from './header';
import { App } from '../utils/contexts/OpenAiContext';

const Tab = createBottomTabNavigator();

type Props = {
    appId: string;
};

const TabbarNavigator: React.FC<Props> = ({ appId }) => {
    // const colorScheme = useColorScheme();
    const { openAiMessages } = useOpenAi(appId);

    if (!appId) {
        return <View />;
    }

    const currentApp = openAiMessages.find((app) => app.firebaseId == appId) as App;

    return (
        <NavigationContainer independent>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    header: () => <Header app={currentApp} />,
                    tabBarIcon: ({ color }) => {
                        const selectedRouteFirebaseId = route.name;

                        const appRouteItem = currentApp.routes.find(
                            (routeItem) => routeItem.firebaseId == selectedRouteFirebaseId
                        );

                        let tabBarIcon;
                        if (openAiMessages && route && appRouteItem) {
                            tabBarIcon = appRouteItem.icon;
                        }

                        // You can return any component that you like here!
                        return <FontAwesome name={tabBarIcon as 'home'} color={color} size={30} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray'
                })}
            >
                {currentApp.routes.map((route) => (
                    <Tab.Screen
                        name={route.firebaseId}
                        key={route.firebaseId}
                        options={{
                            tabBarLabel: route.name
                        }}
                        component={() => <IAEditableScreen appId={currentApp.firebaseId} routeId={route.firebaseId} />}
                    />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default TabbarNavigator;
