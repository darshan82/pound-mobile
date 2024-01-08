/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {ZStack} from 'native-base';
import {StyleSheet, View} from 'react-native';

const positions = Array(10).fill(0);

type ProgressBarProps = {
  progress: number;
  setFullWith?: boolean;
};

export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  setFullWith = false,
}) => {
  return (
    <ZStack
      justifyContent="center"
      height={8}
      marginX={'3%'}
      rounded="lg"
      width={setFullWith ? '100%' : undefined}>
      <View style={styles.verticalStack}>
      <View
          style={{
            height: 13,
            width: `100%`,
            borderRadius: 5,
            backgroundColor: "#2F3030",
            // AA00FFC2
          }}
        />
        <View
          style={{
            height: 13,
            width: `${progress}%`,
            borderRadius: 5,
            backgroundColor: '#8AC019',
            position:'absolute'
            // AA00FFC2
          }}
        />
      </View>

      {/* <View style={styles.horizontalStack}>
        {positions.map((_, index) => {
          return <View key={index} style={styles.separator} />;
        })}
      </View> */}
    </ZStack>
  );
};

const styles = StyleSheet.create({
  verticalStack: {
    width: '100%',
    height: 10,
    paddingVertical: 15,
    paddingHorizontal: 1,
    justifyContent: 'center',
  },
  horizontalStack: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  separator: {
    height: 29,
    width: '10%',
    backgroundColor: '#2B2B2B00',
    borderLeftColor: 'rgba(0,0,0,0.4)',
    borderLeftWidth: 1,
  },
});
