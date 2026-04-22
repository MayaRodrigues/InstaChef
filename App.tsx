import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Preparation from "./components/Preparation";
import Receita from "./components/Receita";
import Start from "./components/Start";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Receita" component={Receita} />
        <Stack.Screen name="Preparation" component={Preparation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
