import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  buttonSelected: {
    backgroundColor: 'gray',
    boxShadow: '10px 10px 0 rgba(0,0,0,.5)',
    display: 'inline-block',
    paddingBottom: 0.5,

    textDecoration: 'none',
    border: 'solid',
    borderColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'transparent',
    boxShadow: '10px 10px 0 rgba(0,0,0,.5)',
    display: 'inline-block',
    paddingBottom: 0.5,

    textDecoration: 'none',
    border: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSelected: {
    fontWeight:"800",
    fontSize: 40,
    color: 'white',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});
const SelectButton = ({icon, title, selected, onClick, textColor, style = []}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={[
          selected ? styles.buttonSelected : styles.button,
          {
            transform: [{skewX: '20deg'}],
          },
          ...style,
        ]}
      >
        <LinearGradient
          style={styles.container}
          colors={selected ? ['#8C8C95', '#919194', '#CECED9', '#919194', '#8C8C95'] : ['transparent']}
          locations={selected ? [0, 0.12, 0.46, 0.78, 1] : [1]}
        >
          <MaterialCommunityIcons name={icon} size={24} color={!selected ? 'white' : 'black'} />
          <Text
            style={[
              selected ? styles.textSelected : styles.text,
              {
                color: (selected && textColor) || 'white',
                transform: [{skewX: '-20deg'}],
              },
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default SelectButton;
