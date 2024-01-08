/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useState, useEffect} from 'react';
import {HStack, Box, Text} from 'native-base';
import {
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {InfoModal} from '../../../components';
import Colors from '../../../theme/colors';

type WearablesProps = {
  available: boolean;
  reload: number;
  serviceName: string;
  style?: StyleProp<ViewStyle>;
  linked: () => Promise<boolean>;
  onPress: () => Promise<void>;
};

export const Wearables: FC<WearablesProps> = ({
  available,
  reload,
  serviceName,
  style,
  linked,
  onPress,
}) => {
  const [open, setOpen] = useState(false);
  const [dotColor, setDotColor] = useState<ColorType>('orange.400');

  useEffect(() => {
    getDotColor();
  }, [reload]);

  const getDotColor = async (): Promise<void> => {
    const result = await linked();

    if (!available) {
      setDotColor('gray.600');
    }

    setDotColor(result ? 'green.400' : 'gray.400');
  };

  const determineAction = (): void => {
    if (dotColor === 'gray.400') {
      onPress().then(() => getDotColor());
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <InfoModal
        onRequestClose={() => setOpen(false)}
        iconName={'alert-circle-outline'}
        iconColor={Colors.error}
        title={
          dotColor === 'green.400'
            ? 'Already connected'
            : 'We are checking the status of the service'
        }
        buttonTitle={''}
        onButtonPress={() => setOpen(false)}
        visible={open}
      />

      <TouchableWithoutFeedback disabled={!available} onPress={determineAction}>
        <HStack
          alignItems="center"
          justifyItems="space-between"
          style={style}
          borderBottomColor="gray.900"
          borderBottomWidth={1}
          paddingBottom={4}
          paddingLeft={3}>
          <Box size={4} bg={dotColor} rounded="full" marginRight={4} />
          <Text
            color={available ? 'white' : 'gray.600'}
            textAlign="center"
            textTransform="uppercase"
            fontSize="md"
            marginRight={3}>
            {serviceName}
          </Text>
          {!available && (
            <Text
              color="gray.600"
              textAlign="center"
              textTransform="uppercase"
              style={styles.xxs}>
              (Coming soon)
            </Text>
          )}
        </HStack>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  xxs: {
    fontSize: 8,
  },
});
