import {Asset} from 'expo-asset';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Animated, Button, Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import icon from './src/resources/images/icon.png';
import text from './src/resources/images/text.png';
import {LinearGradient} from 'expo-linear-gradient';
import SelectButton from './src/components/SelectButton';
import MainView from './src/views/MainView/index.js';
// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});


export default function App() {
  return (
    <AnimatedAppLoader image={icon} image2={text}>
      <MainView />
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({children, image, image2}) {
  const [isSplashReady, setSplashReady] = useState(false);

  return (
    <AnimatedSplashScreen image={image} image2={image2}>
      {children}
    </AnimatedSplashScreen>
  );
}

function AnimatedSplashScreen({children, image, image2}) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    onImageLoaded();
  }, []);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
      Animated.timing(animation, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    } catch (e) {
      // handle errors
    } finally {
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      {isSplashAnimationComplete && children}
      {!isSplashAnimationComplete && (
        <LinearGradient
          colors={['#02031C', '#17194D', '#02031C']}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={icon} style={{margin: 10, width: 114, height: 114}} />
          <Image source={text} />
        </LinearGradient>
      )}
    </View>
  );
}

