import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { OPEN_SANS_REGULAR } from "./utils/const";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./components/navigation/app.navigation";
import Toast from "react-native-toast-message";
import { Provider as PaperProvider } from "react-native-paper";
import {SafeAreaView } from "react-native-safe-area-context";
//hello
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    [OPEN_SANS_REGULAR]: require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
 
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <PaperProvider>
          <NavigationContainer>
            <AppNavigation />
            <Toast />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaView>
  
  );
}
