import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Welcome } from "../screens/Welcome";
import { TabRoutes } from "./tabRoutes";
import { FilesUpload } from "../screens/FilesUpload";

const Stack = createNativeStackNavigator<StackParams>();

export default function Routes() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="Welcome"
                component={Welcome}
            />
            <Stack.Screen 
                name="TabRoutes"
                component={TabRoutes}
            />
            <Stack.Screen 
                name="FilesUpload"
                component={FilesUpload}
            />
        </Stack.Navigator>
    );

}

