import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import RichEditor from './RichEditor';

 const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#cccccc',
      justifyContent: 'space-between',
      padding: 8,
    }, 
    image: {
      width: 16,
      height: 16,
    }
 });

 type Props = {
   getEditor: () => RichEditor,
 }
const Toolbar = (props: Props) => (
  <View style={styles.container}>
    <TouchableOpacity >
      <Image style={styles.image} source={require('./images/image.png')}/>
    </TouchableOpacity> 
    <TouchableOpacity onPress={() => props.getEditor().setBold()}>
      <Image style={styles.image} source={require('./images/bold.png')}/>
    </TouchableOpacity> 
    <TouchableOpacity onPress={() => props.getEditor().setItalic()}>
      <Image style={styles.image} source={require('./images/italic.png')}/>
    </TouchableOpacity> 
    <TouchableOpacity onPress={() => props.getEditor().setOrderedList()}>
      <Image style={styles.image} source={require('./images/ordered-list.png')}/>
    </TouchableOpacity> 
    <TouchableOpacity onPress={() => props.getEditor().setUnOrderedList()}>
      <Image style={styles.image} source={require('./images/unordered-list.png')}/>
    </TouchableOpacity> 
    <TouchableOpacity onPress={() => props.getEditor().setUnderline()}>
      <Image style={styles.image} source={require('./images/underline.png')}/>
    </TouchableOpacity> 
  </View>

);

export default Toolbar;