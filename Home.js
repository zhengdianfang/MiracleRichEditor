import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import App from './App';

class Home extends React.Component<{}>{
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 32 }}>
        <TouchableOpacity onPress={() => {
this.app.getEditorInfos().then(title => console.log(title))}
        }>
          <Text>getTitle</Text>
        </TouchableOpacity>
        <App ref={ref => this.app = ref} />
      </View>
    );
  }
} 

export default Home;
