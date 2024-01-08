// import dependencies
import React, {FC} from 'react';
import {Button} from 'native-base';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

// import components
import Icon from './Icon';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// InfoModal Config

// InfoModal Styles
const styles = StyleSheet.create({
  modalWrapper: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: Layout.SCREEN_WIDTH - 3 * Layout.MEDIUM_MARGIN,
    borderRadius: 4,
    backgroundColor: Colors.black,
  },
  title: {
    paddingVertical: 8,
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'AbsoluteZero',
    marginBottom: 16,
    marginTop: 8,
  },
  message: {
    marginBottom: 16,
    padding: 8,
    fontWeight: '400',
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 12,
    width: '100%',
  },
  textButton: {
    color: 'white',
    fontFamily: 'AbsoluteZero',
    fontSize: 11,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

// InfoModal Props
type Props = {
  onRequestClose: () => void;
  iconName: string;
  iconColor: string;
  statusBarColor?: string;
  title: string;
  buttonTitle: string;
  onButtonPress: () => void;
  visible: boolean;
};

// InfoModal
const InfoModal: FC<Props> = ({
  onRequestClose,
  iconName,
  iconColor,
  statusBarColor = 'rgba(0, 0, 0, 0.52)',
  title,
  buttonTitle,
  onButtonPress,
  visible = false,
}) => (
  <Modal
    animationType="none"
    transparent
    visible={visible}
    onRequestClose={onRequestClose}>
    <StatusBar backgroundColor={statusBarColor} />
    <View style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={styles.closeButton}>
            <Icon name="close" size={30} color="#fff" />
          </View>
        </TouchableWithoutFeedback>
        <Icon name={iconName} size={52} color={iconColor} />
        <Text style={styles.title}>{title}</Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={onButtonPress}
            colorScheme="dark"
            backgroundColor="black">
            <Text style={styles.textButton}>{buttonTitle}</Text>
          </Button>
        </View>
      </View>
    </View>
  </Modal>
);

export default InfoModal;
