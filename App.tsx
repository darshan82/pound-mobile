import React, { useEffect, useRef } from 'react';
import { Platform, AppState } from 'react-native';
import { NativeBaseProvider, StatusBar, extendTheme } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/app/context/AppProvider';
import { configureNativeAppEventEmitter } from './src/modules/wearables/helpers/appleSamples';
import { MainNavigation } from './src/newDesigns/routes/Navigation';

const theme = extendTheme({
  fontConfig: {
    AbsoluteZero: {
      400: {
        normal: 'AbsoluteZero',
        italic:
          Platform.OS === 'ios' ? 'AbsoluteZero-Italic' : 'AbsoluteZeroItalic',
      },
    },
    Grotesk: {
      400: {
        normal: 'FamiljenGroteskGF-Regular',
        italic:
          Platform.OS === 'ios' ? 'FamiljenGroteskGF-Regular' : 'GroteskItalic',
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
    <SafeAreaProvider
    style={{backgroundColor:"black"}}
    >
      <StatusBar backgroundColor={'black'} barStyle="light-content"/>
      <AppProvider>
        <NativeBaseProvider theme={theme}>
          <MainNavigation />
        </NativeBaseProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
