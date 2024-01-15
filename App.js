import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Home from './src/screens/Home/Home';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#FFFFFF'} />
      <GestureHandlerRootView>
        <Home />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
