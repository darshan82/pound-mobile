import React, {FC, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useHeaderHeight} from '@react-navigation/elements';

type BackgroundProps = {
  children: ReactNode;
};

export const Background: FC<BackgroundProps> = ({children}) => {
  //useHeaderHeight is a hook that gives you the height of the header
  const headerHeight = useHeaderHeight();

  return (
    <LinearGradient
      colors={['#000', '#000']}
      locations={[0,1.0]}
      style={[styles.container, {paddingTop: headerHeight}]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
