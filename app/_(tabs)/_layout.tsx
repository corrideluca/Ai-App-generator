import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { useOpenAi } from '../../utils/hooks/useOpenAi';
import { useState } from 'react';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

type tabBarItem = {
    title: string;
    iconCode: React.ComponentProps<typeof FontAwesome>;
};

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const [tabBarItems, setTabBarItems] = useState<tabBarItem[]>();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Edit Mode',
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="edit"
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    )
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Tab Two',
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
                }}
            />
        </Tabs>
    );
}
