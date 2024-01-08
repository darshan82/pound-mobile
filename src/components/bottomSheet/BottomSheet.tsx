/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect, useRef, ReactNode} from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  PanResponderInstance,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../../theme/colors';

type BottomSheetProps = {
  children: ReactNode;
  closeOnPressScrim?: boolean;
  closeOnSwipeDown?: boolean;
  duration?: number;
  height?: number;
  modalContainerStyle?: any;
  modalWrapperStyle?: any;
  open: boolean;
  rounded?: boolean;
  statusBarColor?: string;
  onClose: () => void;
};

export const BottomSheet: FC<BottomSheetProps> = ({
  children,
  closeOnPressScrim = true,
  closeOnSwipeDown = true,
  duration = 300,
  height = 112,
  modalWrapperStyle = {},
  modalContainerStyle = {},
  open,
  rounded = false,
  statusBarColor = 'rgba(0, 0, 0, 0.52)',
  onClose,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [animatedHeight] = useState(new Animated.Value(0));
  const [pan] = useState(new Animated.ValueXY());

  const panResponder = useRef<PanResponderInstance | null>(null);

  const panStyle = useRef({
    transform: pan.getTranslateTransform(),
  });

  useEffect(() => {
    if (!panResponder.current) {
      createPanResponder();
    }
  }, []);

  useEffect(() => {
    changeModalVisibility(open);
  }, [open]);

  const createPanResponder = () => {
    let newHeight = height;

    newHeight = rounded ? height + 8 : height;

    panResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnSwipeDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy < 0) {
          return null;
        }
        return Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(
          e,
          gestureState,
        );
      },
      onPanResponderRelease: (e, gestureState) => {
        if (newHeight / 4 - gestureState.dy < 0) {
          setModalVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    });
  };

  const changeModalVisibility = (visible: boolean): void => {
    let newHeight = height;

    newHeight = rounded ? height + 8 : height;

    if (visible) {
      setModalVisible(visible);
      Animated.timing(animatedHeight, {
        toValue: newHeight,
        duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start(() => {
        setModalVisible(visible);
        pan.setValue({x: 0, y: 0});
        if (typeof onClose === 'function') {
          onClose();
        }
      });
    }
  };

  return (
    <Modal
      transparent
      animationType="none"
      visible={modalVisible}
      supportedOrientations={['portrait']}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={[styles.modalWrapper, modalWrapperStyle]}>
        <StatusBar backgroundColor={statusBarColor} />

        <TouchableOpacity
          style={styles.scrim}
          activeOpacity={1}
          onPress={() =>
            closeOnPressScrim ? changeModalVisibility(false) : {}
          }
        />

        <Animated.View
          {...panResponder?.current?.panHandlers}
          style={[
            panStyle,
            styles.modalContainer,
            rounded && styles.roundedTop,
            modalContainerStyle,
            {height: animatedHeight},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <View
              style={{
                width: 120,
                height: 13,
                backgroundColor: Colors.onSurface,
                borderRadius: 20,
              }}
            />
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
  },
  scrim: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  roundedTop: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 8,
  },
});
