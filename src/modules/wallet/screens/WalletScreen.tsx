import React, { Fragment, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Clipboard } from 'react-native';
import { useMachine } from '@xstate/react';

import { Background, Footer, InputButton, InputText } from '../../../components';
import { WalletController } from '../controllers/WalletController';
import { LoadingSpinner } from '../../../components/layout/Spinner';
import { Text, View, Button, Image, Box, VStack, HStack, Input } from 'native-base';

import "react-native-gesture-handler";
import { oracleClient } from '../../../app/config';
import { WalletResponse } from '../interfaces/WalletResponse';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const WalletScreen = () => {
  const [machine, send] = useMachine(WalletController);

  const [showWallet, setShowWallet] = useState(false);
  const [state, setState] = useState(0);
  let [phrase, setPhrase] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [activateLoading, setActivateLoading] = useState(false);
  const [offset] = useState(Math.floor(Math.random() * 4));
  const [test] = useState(new Array(4).fill(0).map((v, i) => i + offset));
  const [testValues, setTestValues] = useState(new Array(4).fill(""));

  const navigation = useNavigation();

  if (machine.matches('loading')) return (
    <LoadingSpinner />
  )

  if (!machine.context.data?.public) {
    if (state === 0) return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.toggleDrawer()}
        >
          <Image
            alt="avatar"
            style={styles.menuIcon}
            source={require("../../../assets/images/menu.png")}
          />
        </TouchableOpacity>

        <View
          style={styles.container}
        >
          <Box style={{
            alignItems: 'center',
            marginHorizontal: '5%',
          }}>
            <Image
              source={require('../../../assets/images/logo.png')}
              alt="Pound"
            />

            <Text style={{
              marginTop: 20,
              paddingTop: 30,
              fontWeight: "bold",
              fontSize: 30,
              color: "#fff"
            }}>Activate Wallet</Text>
            <Text style={{
              fontSize: 14,
              color: "#fff",
              opacity: 0.7
            }}>Create your own wallet</Text>
          </Box>

          <InputButton
            style={{
              position: "absolute",
              bottom: 20,//110,
              width: "90%",
              marginLeft: "5%",
              borderRadius: 3
            }}
            isLoading={activateLoading}
            onPress={() => {
              setActivateLoading(true);

              oracleClient.get(`/${machine.context.data?.id}/phrase`)
                .then(res => {
                  setPhrase(res.data.phrase.split(" "));
                  setState(1);
                  setActivateLoading(false);
                })
                .catch(console.log);
            }}>
            <Text style={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}>
              Activate Wallet
            </Text>
          </InputButton>

          {/* <InputButton
            style={{
              position: "absolute",
              bottom: 20,
              width: "90%",
              marginLeft: "5%",
              borderRadius: 3,
              borderWidth: 1,
              borderColor: "#ADFF00",
              backgroundColor: "#000",
              // @ts-ignore
              loading: "white"
            }}
            isLoading={phraseLoading}
            onPress={() => {
              setPhraseLoading(true);

            }}>

            <Text style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",

            }}>
              Sign in with seed phrase
            </Text>
          </InputButton> */}
          <Footer />
        </View>
      </SafeAreaView>
    ); else if (state === 1) return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.toggleDrawer()}
        >
          <Image
            alt="avatar"
            style={styles.menuIcon}
            source={require("../../../assets/images/menu.png")}
          />
        </TouchableOpacity>

        <View
          style={styles.container}
        >
          <Box style={{
            alignItems: 'center',
            marginHorizontal: '5%',
          }}>
            <Text style={{
              paddingTop: 30,
              fontWeight: "bold",
              fontSize: 30,
              color: "#fff"
            }}>Save the seed phrase</Text>
          </Box>

          <HStack>
            <VStack style={{
              marginLeft: "10%",
              width: "40%",
              marginTop: 30
            }}>
              {
                [...phrase].slice(0, 6)?.map((v, i) => <View >
                  <Text style={{
                    color: "#ADFF00",
                    fontSize: 18,
                    marginBottom: 15,
                  }}>{i + 1}.<Text style={{
                    color: "#fff"
                  }}>{" " + v}</Text></Text>
                </View>)
              }
            </VStack>
            <VStack style={{
              marginLeft: "10%",
              width: "40%",
              marginTop: 30
            }}>
              {
                [...phrase].slice(6)?.map((v, i) => <View >
                  <Text style={{
                    color: "#ADFF00",
                    fontSize: 18,
                    marginBottom: 15,
                  }}>{i + 1 + 6}.<Text style={{
                    color: "#fff"
                  }}>{" " + v}</Text></Text>
                </View>)
              }
            </VStack>
          </HStack>
          <InputButton
            style={{
              position: "absolute",
              bottom: 110,
              width: "90%",
              marginLeft: "5%",
              borderRadius: 3
            }}
            onPress={() => {
              setState(2)
            }}>
            <Text style={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}>
              Continue
            </Text>
          </InputButton>

          <InputButton
            style={{
              position: "absolute",
              bottom: 20,
              width: "90%",
              marginLeft: "5%",
              borderRadius: 3,
              borderColor: "#ADFF00",
              borderWidth: 1,
              backgroundColor: "#000",
              // @ts-ignore
              loading: "white"
            }}
            onPress={() => {
              console.log(Clipboard?.setString, phrase.join(" "))
              if (Clipboard?.setString) Clipboard.setString(phrase.join(" "))
            }}>

            <Text style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",

            }}>
              Copy To Clipboard
            </Text>
          </InputButton>
          <Footer />
        </View>
      </SafeAreaView>
    ); else if (state === 2) return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.toggleDrawer()}
        >
          <Image
            alt="avatar"
            style={styles.menuIcon}
            source={require("../../../assets/images/menu.png")}
          />
        </TouchableOpacity>

        <View
          style={styles.container}
        >
          <Box style={{
            alignItems: 'center',
            marginHorizontal: '5%',
          }}>
            <Text style={{
              paddingTop: 30,
              fontWeight: "bold",
              fontSize: 30,
              color: "#fff",
              marginBottom: 20
            }}>Confirm seed phrase</Text>
          </Box>

          {test.map(v => <HStack style={styles.mt}>
            <Text style={{
              color: "#ADFF00",
              fontSize: 20,
            }}>{v + 1}. </Text>
            <InputText
              value={testValues[v]}
              type="text"
              isInvalid={testValues[v] !== phrase[v]}
              errorMessage="Invalid phrase"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              placeholder={`Phrase ${v + 1}`}
              onChangeText={text => {
                console.log([...testValues.slice(0, v), text, ...testValues.slice(v + 1)])
                setTestValues([...testValues.slice(0, v), text, ...testValues.slice(v + 1)])
              }}
              style={{
              }}

            />
          </HStack>)}

          <InputButton
            style={{
              position: "absolute",
              bottom: 20,
              width: "90%",
              marginLeft: "5%",
              borderRadius: 3
            }}
            onPress={() => {
              if (!testValues.every((v, i) => !v || v === phrase[i])) return;

              oracleClient.get(`/user/${machine.context.data?.id}/createwallet?phrase=${phrase.join(" ")}`)
                .then((v) => {
                  machine.context.data = v.data;
                  setState(3)
                })
            }}>
            <Text style={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}>
              Continue
            </Text>
          </InputButton>
          <Footer />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.toggleDrawer()}
      >
        <Image
          alt="avatar"
          style={styles.menuIcon}
          source={require("../../../assets/images/menu.png")}
        />
      </TouchableOpacity>

      <View
        style={styles.container}
      >
        <View style={styles.card}>
          <Text>
            <Text style={styles.accountName}>{machine.context.data?.username?.slice(0, Math.floor((WIDTH * 0.8 - 65) / 10))}</Text>
            <TouchableOpacity onPress={() => setShowWallet(!showWallet)}>
              <Image alt="copy"
                style={styles.settingIcon}
                source={require("../../../assets/images/setting.png")}
              />
            </TouchableOpacity>
          </Text>
          <Text>
            <Text style={styles.smallText}>Address:  </Text>
            <Text style={{ ...styles.smallText, color: "#699902" }}>{!showWallet ? `${machine.context.data?.address?.slice(0, 4)}...${machine.context.data?.address.slice(machine.context.data?.address?.length - 4)}` : machine.context.data?.address}  </Text>
            <TouchableOpacity onPress={() => Clipboard?.setString(machine.context.data?.address || "No Address")}>
              <Image alt="copy"
                style={styles.copyIcon}
                source={require("../../../assets/images/copy.png")}
              />
            </TouchableOpacity>
          </Text>
          {showWallet && <Text>
            <Text style={styles.smallText}>Public Key:  </Text>
            <Text style={{ ...styles.smallText, color: "#699902" }}>{machine.context.data?.public}</Text>
          </Text>
          }
          <Text style={styles.balanceName}>{machine.context.data?.balance || 0} LB</Text>
        </View>
        <View>
          <HStack>
            <TouchableOpacity onPress={() => setSelectedOption(0)} style={{ ...styles.selectOption, ...(selectedOption === 0 ? styles.selectedOption : {}) }} >
              <Text style={{ ...styles.heading, ...styles.headingTwo }}>Assets</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedOption(1)} style={{ ...styles.selectOption, ...(selectedOption === 1 ? styles.selectedOption : {}) }}>
              <Text style={{ ...styles.heading, ...styles.headingTwo }}>Transactions</Text>
            </TouchableOpacity>
          </HStack>

          {selectedOption === 0 && (
            <View>
              <View style={{ ...styles.card, ...styles.cardTwo }}>
                <VStack>
                  <Text style={styles.logText}>{machine.context.data?.balance || 0}</Text>
                  <Text style={styles.logText}>LB</Text>
                </VStack>

              </View>

              <View style={{ ...styles.card, ...styles.cardTwo }}>
                <VStack>
                  <Text style={styles.logText}>{machine.context.data?.venom || 0}</Text>
                  <Text style={styles.logText}>VENOM</Text>
                </VStack>
              </View>
            </View>
          )}

          {selectedOption === 1 && (
            <View>
            </View>
          )}
        </View>
      </View >
      < Footer />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2.5%',
    marginTop: 60,
    flex: 1,
    minHeight: HEIGHT - (100)
  },
  mt: {
    marginTop: 25,
    width: WIDTH * 0.9
  },
  spacing: {
    marginHorizontal: '1%',
    marginTop: 45,
  },
  heading: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    paddingTop: 20,

  },
  normal: {
    fontSize: 18,
    color: "#fff"
  },
  mainContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  menuIcon: {
    width: 21,
    height: 12,
    marginHorizontal: 17,
    marginTop: 10
  },
  input: {
    padding: 0,
    fontSize: 20,
    width: "80%",
  },
  card: {
    width: WIDTH * 0.8,
    // minHeight: (WIDTH * 0.8) / 16,
    backgroundColor: "#121212",
    borderColor: "#333333",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: "10%",
    padding: 20,
    position: "relative"
  },
  cardTwo: {
    padding: 10,
    marginTop: 20
  },
  accountName: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    maxWidth: 10,
  },
  smallText: {
    color: "#333333",
    fontSize: 15,
    marginTop: 5
  },
  copyIcon: {
    width: 8.1 * 1.5,
    height: 9.8 * 1.5,
  },
  balanceName: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    paddingTop: 5
  },
  settingIcon: {
    width: 20,
    height: 20,
    marginLeft: 5
  },
  headingTwo: {
    fontSize: 20,
    textAlignVertical: "center", textAlign: "center"
  },
  selectBox: {
    textAlign: "center"
  },
  selectOption: {
    width: "50%",
    borderBottomColor: "#333333",
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  selectedOption: {
    borderBottomColor: "#699902",
    borderBottomWidth: 2
  },
  logText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  }
});
