// import {ProfileTab} from '../components/ProfileTab';
import { Dimensions, Platform, StyleSheet } from 'react-native';
const WIDTH = Dimensions.get("window").width;


export const getWidth = (value : number = 1) =>{
  return (WIDTH*value)/100
};

export const fontRegular = StyleSheet.create((value : number = 3.5, color:string = 'white') => {
  return {
    fontSize: getWidth(value),
    // fontFamily: Platform.OS === 'ios' ? 'AbsoluteZero-Italic' : 'AbsoluteZeroItalic',
    color: color
  }
});

export const fontBold = StyleSheet.create((value : number = 3.5, color:string = 'white') =>{
  return {
    fontSize: getWidth(value),
    fontWeight:'bold',
    // fontFamily: Platform.OS === 'ios' ? 'AbsoluteZero-Italic' : 'AbsoluteZeroItalic',
    color: color
  }
});
