import AsyncStorage from '@react-native-async-storage/async-storage';

export const addAlpha = (color, opacity) => {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  const a = color + _opacity.toString(16).toUpperCase();
  return a;
};

export const validateEmail = email => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const getRanHex = size => {
  let result = [];
  let hexRef = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
};

export const getDataAsync = async data => {
  const res = await AsyncStorage.getItem('userData');
  if (res !== null) {
    return JSON.parse(res);
  } else {
    return [];
  }
};

export const setDataAsync = async data => {
  await AsyncStorage.setItem('userData', JSON.stringify(data));
};
