/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    ScrollView,
    TouchableOpacity
} from 'react-native';

type Props = {
  dealerShip: ?string,
  dealerPosition: ?string,
  title: ?string,
  abstract: ?string,
  content: ?string,
}
export default class App extends Component<Props> {
   init() {
    this.sendAction({ action: 'init', payload: {
      title: this.props.title || '',
      abstract: this.props.abstract || '',
      content: this.props.content || '',
      dealerShip: this.props.dealerShip || '',
      dealerPosition: this.props.dealerPosition || '',
    } });
  }

  async getEditorInfos () {
    return this.promiseCreator('getEditorInfos') 
  }

  sendAction(action: any) {
    this.webview.postMessage(JSON.stringify(action))
  }
  handleMessage = (event: any) => {
    this.parseActions(event.nativeEvent.data);
  }
  parseActions = (message: string) => {
    const {action , payload} = JSON.parse(message);
    if (action === 'getEditorInfos') {
      this.promiseGetField(payload);
    } 
  }

  promiseCreator = (action: string) => {
    return new Promise((resolve, reject) => {
      this.infoResolve = resolve;
      this.infoInject = reject;
      this.pendingInfoTimer = setTimeout(() => {
        if (this.infoInject) {
          this.infoInject('');
          this.infoInject = null;
        }
      }, 5000);
      this.sendAction({ action });
    });
  }
  promiseGetField = (payload: any) => {
    if (this.infoResolve) {
        this.infoResolve(payload);        
    }
    this.infoResolve = undefined;
    this.infoInject = undefined
    if (this.pendingTitleTimer) {
      clearTimeout(this.pendingTitleTimer);
      this.pendingInfoTimer = null;
    }
  }
  infoResolve: ?any;
  infoInject: ?any;
  pendingInfoTimer: ?any;
  webview: WebView;
  render() {
    return (
      <View style={{ paddingTop:32, flex: 1 }}>
        <WebView
          ref={ref => this.webview = ref}
          source={require('./edit.html')}
          javaScriptEnabled
          scalesPageToFit={false}
          automaticallyAdjustContentInsets
          onLoad={() => this.init()}
          onMessage={this.handleMessage}
        />
      </View>
    );
  }
}
