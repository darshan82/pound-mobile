import React, {useEffect, useRef} from 'react';
import {Platform, AppState} from 'react-native';
import {NativeBaseProvider, StatusBar, extendTheme} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider} from './src/app/context/AppProvider';
import {configureNativeAppEventEmitter} from './src/modules/wearables/helpers/appleSamples';
import {Navigation} from './src/newDesigns/routes/Navigation';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalDataProvider} from './src/context';

const theme = extendTheme({
  fontConfig: {
    AbsoluteZero: {
      400: {
        normal: 'Montserrat-Regular',
      },
    },
    Grotesk: {
      400: {
        normal: 'Montserrat-Regular',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Grotesk',
    body: 'Grotesk',
    mono: 'Grotesk',
  },
});

const App = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        configureNativeAppEventEmitter();
      }

      if (appState.current === 'unknown' || appState.current === null) {
        configureNativeAppEventEmitter();
      }

      appState.current = nextState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider style={{}}>
      <LinearGradient colors={['#1F1F1F', '#0B0B0B']} style={{flex: 1}}>
        <StatusBar backgroundColor={'#1F1F1F'} barStyle="light-content" />
        <AppProvider>
          <GlobalDataProvider>
            <NativeBaseProvider theme={theme}>
              <Navigation />
            </NativeBaseProvider>
          </GlobalDataProvider>
        </AppProvider>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default App;
