import React, { Component } from 'react';
import {
  View,
  WebView,
  Platform,
} from 'react-native';

type Props = {
  title: ?string,
  teaser: ?string,
  content: ?string,
  dealerName: ?string,
  dealerPosition: ?string,
}
export default class RichEditor extends Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.dealerName !== nextProps.dealerName ||
      this.props.dealerPosition !== nextProps.dealerPosition ||
      this.props.title !== nextProps.title ||
      this.props.teaser !== nextProps.teaser ||
      this.props.content !== nextProps.content) {
      this.init(nextProps);
    }
  }
  async getEditorInfos() {
    return this.promiseCreator('getEditorInfos');
  }
  init(props: Props) {
    this.sendAction({ action: 'init',
      payload: {
        title: props.title || '',
        teaser: props.teaser || '',
        content: props.content || '',
        dealerName: props.dealerName || '',
        dealerPosition: props.dealerPosition || '',
      } });
  }
  setBold() {
    this.sendAction({ action: 'setBold' });
  }
  setItalic() {
    this.sendAction({ action: 'setItalic' });
  }
  setOrderedList() {
    this.sendAction({ action: 'setOrderedList' });
  }
  setUnOrderedList() {
    this.sendAction({ action: 'setUnorderedList' });
  }
  setUnderline() {
    this.sendAction({ action: 'setUnderline' });
  } 
  insertImage(src: string) {
    this.sendAction({ action: 'insertImage', payload: src });
  }
  hideSoftware() {
    this.sendAction({ action: 'hideSoftware' });
  }
  sendAction(action: any) {
    this.webview.postMessage(JSON.stringify(action));
  }
  handleMessage = (event: any) => {
    this.parseActions(event.nativeEvent.data);
  }
  parseActions = (message: string) => {
    const { action, payload } = JSON.parse(message);
    if (action === 'getEditorInfos') {
      this.promiseGetField(payload);
    }
  }

  promiseCreator = (action: string) => new Promise((resolve, reject) => {
    this.infoResolve = resolve;
    this.infoInject = reject;
    this.pendingInfoTimer = setTimeout(() => {
      if (this.infoInject) {
        this.infoInject = null;
      }
    }, 5000);
    this.sendAction({ action });
  })
  promiseGetField = (payload: any) => {
    this.infoInject = undefined;
    if (this.pendingTitleTimer) {
      clearTimeout(this.pendingTitleTimer);
      this.pendingInfoTimer = null;
    }
    if (this.infoResolve) {
      this.infoResolve(payload);
    }
    this.infoResolve = undefined;
  }
  infoResolve: ?any;
  infoInject: ?any;
  pendingInfoTimer: ?any;
  webview: WebView;
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={(ref) => { this.webview = ref; }}
          source={Platform.OS === 'ios' ? require('./editor.html') : { uri: 'file:///android_asset/editor.html' }}
          javaScriptEnabled
          scalesPageToFit={Platform.OS === 'android'}
          automaticallyAdjustContentInsets
          onLoad={() => this.init(this.props)}
          onMessage={this.handleMessage}
        />
      </View>
    );
  }
}
