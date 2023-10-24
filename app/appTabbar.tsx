import { useLocalSearchParams } from 'expo-router';
import TabbarNavigator from '../components/TabbarNavigator';

// Se usa esto?
// noinspection JSUnusedGlobalSymbols
export default function AppIANavigator() {
    const params = useLocalSearchParams();
    const { appId } = params;

    return <TabbarNavigator appId={appId as string} />;
}
