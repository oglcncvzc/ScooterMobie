import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const Battery = ({percentage = 100, style = []}) => {
  const styles = StyleSheet.create({
    batteryCell: {
      width: 20,
      height: 40,
      backgroundColor: percentage > 50 ? '#1B8B1F' : percentage > 25 ? '#A55A16' : '#A52716',
      borderColor: '#CECED9',
      borderWidth: 1,
      borderRadius: 3,
    },
    batteryCellEmpty: {
      width: 20,
      height: 40,
      borderColor: '#CECED9',
      borderWidth: 1,
      borderRadius: 3,
    },
    batteryHead: {
      width: 10,
      height: 14,
      borderColor: '#CECED9',
      borderWidth: 1,
      marginLeft: -1,
    },
  });
  const renderCells = () => {
    const cells = [];
    for (let per = 0; per < 100; per += 25) {
      if (per < percentage) cells.push(<View key={per} style={[styles.batteryCell, ...style, {marginRight: cells.length < 3 ? 2 : 0}]}></View>);
      else cells.push(<View key={per} style={[styles.batteryCellEmpty, ...style, {marginRight: cells.length < 3 ? 2 : 0}]}></View>);
    }
    return cells;
  };
  return (
    <TouchableOpacity>
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            transform: [{skewX: '20deg'}],
            alignItems: 'center',
          },
          ...style,
        ]}
      >
        <View
          style={[
            {
              padding: 0.1,
              borderColor: '#CECED9',
              borderWidth: 1,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            },
            ...style,
          ]}
        >
          {renderCells()}
        </View>
        <View style={[styles.batteryHead, ...style]}></View>
      </View>
    </TouchableOpacity>
  );
};

export default Battery;
