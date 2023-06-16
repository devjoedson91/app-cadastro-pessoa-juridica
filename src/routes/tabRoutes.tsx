import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListDashes, MagnifyingGlass } from "phosphor-react-native";
import { Register } from "../screens/Register";
import { Search } from "../screens/Search";

const Tab = createBottomTabNavigator<TabParams>();

export function TabRoutes() {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                headerTintColor: '#fff',
                tabBarHideOnKeyboard: true, // a tab bar nao vai ficar por cima do teclado
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#121212',
                tabBarStyle: {
                    borderTopWidth: 1,
                    height: 80,
                },

            }}
        >
            <Tab.Screen 
                name="Register"
                component={Register}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <ListDashes size={32} color="#6b2bf4" />;
                            
                        }
                        return <ListDashes size={32} color="#C4C4CC" />;
                    }
                }}
            />
            <Tab.Screen 
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <MagnifyingGlass size={32} color="#6b2bf4" />;
                        }

                        return <MagnifyingGlass size={32} color="#C4C4CC" />;                       
                    }
                }}
            />
        </Tab.Navigator>
    );

}