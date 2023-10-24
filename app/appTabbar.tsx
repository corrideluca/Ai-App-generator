import { useLocalSearchParams } from "expo-router";
import TabbarNavigator from "../components/TabbarNavigator"

const AppIANavigator = () => {
  const params = useLocalSearchParams();
  const { appId } = params;

  return <TabbarNavigator appId={appId as string} />
}

export default AppIANavigator