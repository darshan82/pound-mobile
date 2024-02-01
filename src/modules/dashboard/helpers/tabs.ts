// import {ProfileTab} from '../components/ProfileTab';
import { Dimensions, Platform, StyleSheet } from 'react-native';
const WIDTH = Dimensions.get("window").width;


export const getWidth = (value : number = 1) =>{
  return (WIDTH*value)/100
};

export const fontRegular = (value : number = 3.5, color:string = 'white') => {
  return {
    fontSize: getWidth(value),
    fontFamily: 'Montserrat-Regular',
    color: color
  }
};

export const fontBold =(value : number = 3.5, color:string = 'white') =>{
  return {
    fontSize: getWidth(value),
    fontFamily: 'Montserrat-Bold',
    color: color
  }
};



export const fontSemiBold =(value : number = 3.5, color:string = 'white') =>{
  return {
    fontSize: getWidth(value),
    fontFamily: 'Montserrat-SemiBold',
    color: color
  }
};

export const fontExtraBold =(value : number = 3.5, color:string = 'white') =>{
  return {
    fontSize: getWidth(value),
    fontFamily: 'Montserrat-ExtraBold',
    color: color
  }
};


export const fontBlackaBold =(value : number = 3.5, color:string = 'white') =>{
  return {
    fontSize: getWidth(value),
    fontFamily: 'Montserrat-Black',
    color: color
  }
};


