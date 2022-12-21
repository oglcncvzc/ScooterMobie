import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import * as Updates from 'expo-updates';
import {Animated, Button, Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import SelectButton from '../../components/SelectButton';
import SBase from '../../resources/images/scolor.png';
import EBase from '../../resources/images/ecolor.png';
import NBase from '../../resources/images/ncolor.png';
import Battery from '../../components/Battery';
import icon from '../../resources/images/icon.png';
import io from 'socket.io-client';

const MainView = () => {
  const [selected, setSelected] = useState(1);
  const [lightOpen, setLightOpen] = useState(false);
  const selectedRef = useRef(1);
  const lightRef = useRef(0);
  const [speed, setSpeed] = useState(0);
  const onReloadPress = useCallback(() => {
    if (Platform.OS === 'web') {
      location.reload();
    } else {
      Updates.reloadAsync();
    }
  }, []);
  useEffect(() => {
    selectedRef.current = selected;
    lightRef.current = lightOpen;
  }, [selected, lightOpen]);

  useEffect(() => {
    const socket = io.connect('https://socket.alpkun.com/', {
      reconnection: true,
      path: '/websocket',
      query: {token: 'general'},
    });
    socket.on('connect', () => {
      console.log('connected');
      //setConnected(true);
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      //setConnected(true);
    });
    socket.on('message', (item) => {
      console.log('message', item);
      if (item?.startsWith('e')) {
        console.error('error', item);
      } else if (item?.startsWith('i')) {
        console.info('info', item);
      } else if (parseInt(item) >= 0) {
        setSpeed(parseInt(item));
      }
    });
    setInterval(() => {
      socket.emit('message', [5, 5, 5, lightRef.current ? 1 : 0, selectedRef.current]);
    }, 100);
    console.log('asd');
  }, []);

  return (
    <LinearGradient
      colors={['#02031C', '#17194D', '#02031C']}
      style={{
        flex: 1,
        // background: "linear-gradient(180deg, #02031C 0%, #17194D 46.67%, #02031C 100%)",
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <SelectButton textColor="#9902CD" title="S" style={[{marginRight: 2}]} selected={selected === 1} onClick={() => setSelected(1)} />
        <SelectButton textColor="#E88B00" title="N" style={[{marginRight: 2}]} selected={selected === 2} onClick={() => setSelected(2)} />
        <SelectButton textColor="#089F05" title="E" selected={selected === 3} onClick={() => setSelected(3)} />
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <SelectButton icon="car-light-dimmed" style={[{marginRight: 2}]} selected={!lightOpen} onClick={() => setLightOpen(false)} />
        <SelectButton icon="car-light-high" style={[{marginRight: 2}]} selected={lightOpen} onClick={() => setLightOpen(true)} />
      </View>
      <View style={{alignItems: 'center'}}>
        <Image source={selected === 1 ? SBase : selected === 2 ? NBase : EBase} />
        <Text style={{fontSize: 140, fontWeight: '800', color: '#919194', marginTop: -150}}>{speed}</Text>
      </View>
      <Battery />

      <Button title="Run Again" onPress={onReloadPress} />
      <Image source={icon} style={{margin: 10, width: 46, height: 45, position: 'absolute', left: '4.53%', right: '83.16%', top: '90.24%'}} />
    </LinearGradient>
  );
};

export default MainView;
