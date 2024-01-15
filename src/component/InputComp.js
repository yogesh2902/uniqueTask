import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import fontFamily from '../styles/fontFamily';

const InputComp = ({
  placeholder = '',
  value = '',
  onChangeText = () => {},
  editable = true,
  secureTextEntry = false,
}) => {
  return (
    <View>
      <TextInput
        style={styles.inputView}
        placeholder={placeholder}
        placeholderTextColor={'#000000'}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default InputComp;

const styles = StyleSheet.create({
  inputView: {
    height: 56,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 10,
    fontFamily: fontFamily.primaryRegular,
    color: '#000000',
  },
});
