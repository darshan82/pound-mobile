// import {ProfileTab} from '../components/ProfileTab';
import { Dimensions, Platform } from 'react-native';
import {TrackingTab} from '../components/TrackingTab';
const WIDTH = Dimensions.get("window").width;
export const tabs = [
  // {
  //   title: 'Profile',
  //   key: 'profile',
  //   Component: ProfileTab,
  // },
  {
    title: 'My Progress',
    key: 'tracking',
    Component: TrackingTab,
  },
];

export const getWidth = (value : number = 1) =>{
  return (WIDTH*value)/100
};

export const fontRegular = (value : number = 3.5, color:string = 'white') =>{
  return {
    fontSize: getWidth(value),
    // fontFamily: Platform.OS === 'ios' ? 'AbsoluteZero-Italic' : 'AbsoluteZeroItalic',
    color: color
  }
};

export const fontBold = (value : number = 3.5, color:string = 'white') =>{
  return {
    fontSize: getWidth(value),
    fontWeight:'bold',
    // fontFamily: Platform.OS === 'ios' ? 'AbsoluteZero-Italic' : 'AbsoluteZeroItalic',
    color: color
  }
};
