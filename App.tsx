import { StatusBar } from 'react-native';
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_900Black,
  useFonts 
} from '@expo-google-fonts/montserrat';
import { Loading } from './src/components/Loading';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {

  const [ fontsLoaded ] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_900Black,
  });

  if (!fontsLoaded) {

    return <Loading />
  }

  return (

    <NavigationContainer>
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6f2df3"
      />
    </NavigationContainer>
  );
}

/* 
  colors:

  #6b2bf4, #6f2df3
  #06dca0, #0e4e8b
*/
