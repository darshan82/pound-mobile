import React from 'react';
import {Flex, Spinner} from 'native-base';
import {StyleSheet} from 'react-native';

export const LoadingSpinner = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={styles.container}
      h="100%">
      <Spinner size="lg" color={"#AEFF03"}/>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.8)',
  },
});
