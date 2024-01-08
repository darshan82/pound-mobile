import React, { FC, Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Text, Image } from 'native-base';
import { TouchableOpacity, Platform } from 'react-native';

export const Footer: FC<{}> = () => {
    const navigation = useNavigation();
    const state = navigation.getState();
    const name = state.routes[state.index]?.name;
    console.log(name)
    return (
        <Fragment>
            <VStack style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: Platform.OS === "ios" ? 15 : 0,
                backgroundColor: "#000000",
                borderRadius: 4,
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTopColor: "#ffffff",
                borderTopWidth: .2,
                paddingLeft: 10,
                paddingRight: 10,
                zIndex: 3,
                paddingTop: 3
            }}>
                <TouchableOpacity
                    onPress={() => {
                        name !== "Chat" && navigation.navigate("Chat" as never, {} as never)
                    }}

                    style={[
                        {
                            height: 55,
                            width: 80,
                            backgroundColor: "#000000",
                            borderRadius: 4,
                            flexBasis: '30%',
                            alignItems: "center",
                            margin: 5
                        }
                    ]}>

                    <Image
                        source={name === "Chat" ? require('../../assets/images/messages2.png') : require('../../assets/images/messages.png')}
                        height={5}
                        width={5}
                        alt={"leaderboard"}
                    />
                    <Text color={name === "Chat" ? "#AEFF03" : "white"} style={{
                        fontSize: name === "Chat" ? 16 : 14,
                        marginTop: 12,
                        fontWeight: name === "Chat" ? '900' : "400",
                    }}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        name !== "Home" && navigation.navigate("Home" as never, {} as never)
                    }}

                    style={[
                        {
                            height: 55,
                            width: 80,
                            backgroundColor: "#000000",
                            borderRadius: 4,
                            flexBasis: '30%',
                            alignItems: "center",
                            margin: 5
                        }
                    ]}>
                    <Image
                        source={name === "Home" ? require('../../assets/images/homeSelected.png') : require('../../assets/images/home.png')}
                        height={5}
                        width={5}
                        alt={"home"}
                    />
                    <Text color={name === "Home" ? "#AEFF03" : "white"} style={{
                        fontSize: name === "Home" ? 16 : 14,
                        marginTop: 12,
                        fontWeight: name === "Home" ? '900' : "400",
                    }}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        name !== "Wallet" && navigation.navigate("Wallet" as never, {} as never)
                    }}
                    style={[
                        {
                            height: 55,
                            width: 80,
                            backgroundColor: "#000000",
                            borderRadius: 4,
                            flexBasis: '30%',
                            alignItems: "center",
                            margin: 5
                        }
                    ]}>
                    <Image
                        source={name === "Wallet" ? require('../../assets/images/green-wallet.png') : require('../../assets/images/empty-wallet.png')}
                        height={5}
                        width={5}
                        alt={"coin"}
                    />
                    <Text color={name === "Wallet" ? "#AEFF03" : "white"} style={{
                        fontSize: name === "Wallet" ? 16 : 14,
                        marginTop: 12,
                        fontWeight: name === "Wallet" ? '900' : "400",
                    }}>Wallet</Text>
                </TouchableOpacity>
            </VStack>
            <VStack style={{
                height: 50
            }}>
            </VStack>
        </Fragment>
    );
};