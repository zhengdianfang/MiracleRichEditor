import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import RichEditor from './RichEditor';
import Toolbar from './Toolbar';

class Home extends React.Component<{}>{
  getEditor = () => this.richEidtor; 
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 32 }}>
        <Toolbar getEditor={this.getEditor} />
        <RichEditor ref={ref => this.richEidtor = ref} />
      </View>
    );
  }
} 

export default Home;
