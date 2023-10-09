import { useLocalSearchParams } from "expo-router";
import TabbarNavigator from "../components/TabbarNavigator"

const AppIANavigator = () => {
  const params = useLocalSearchParams();
  const { appKey } = params;

  return <TabbarNavigator appKey={appKey as string} />
}

export default AppIANavigator