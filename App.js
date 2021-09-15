//imports
import React from "react";
//Navigation for different screens
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//for Styled Components
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
//Screens
import Dashboard from "./screens/Dashboard";
import Content from "./screens/Content";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#4C4C6D",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Content" component={Content} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
