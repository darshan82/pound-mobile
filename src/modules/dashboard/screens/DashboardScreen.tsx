import React, { Fragment, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  TextInput
} from 'react-native';
import { useMachine } from '@xstate/react';
import { Footer } from '../../../components';
import {
  LeaderBoardRenderItem,
  SingleCalendar,
  RenderItemEarnings,
} from '../components';
import { DashboardController } from '../controllers/DashboardController';
import { LoadingSpinner } from '../../../components/layout/Spinner';
import { usePreventBack } from '../../../hooks/usePreventBack';
import { Text, View, FlatList, Image, Avatar, Button, HStack, VStack } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import CustomCarousel from '../components/CustomCarousel';
import { ChartTabController } from '../controllers/ChartTabController';
import { LineChart } from 'react-native-chart-kit';
import { BarGraph } from '../components/BarGraph';
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';

import "react-native-gesture-handler";
import { Message, MessageProps } from '../components/Message';
import { oracleClient } from '../../../app/config';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const DashboardScreen = () => {
  usePreventBack({ disableBack: true });

  const navigation = useNavigation();

  const [machine, send] = useMachine(DashboardController);
  const [machine2] = useMachine(ChartTabController);

  const [litavatar, setLitAvatar] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePress = (index: number) => {
    setSelectedIndex(index);
  };

  const data = [{ key: 'item1' }];
  const SAFE_HEIGHT = useSafeAreaFrame().height;
  const [selectedItem, setSelectedItem] = React.useState('0');
  const [text, onChangeText] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [ref, setRef] = useState<any>();

  const [messages, setMessages] = useState<MessageProps[]>([{
    trainer: true,
    content: "Hello there!\nI'm Oracle, your new virtual personal trainer. It's great to have you on board and I'm excited to help to reach an Avatar state!\nTogether, we'll create personalized workout plans, track your progress, and provide you with expert advice and feedback along the way. Let's get started and make every workout count!\nYour move."
  }]);
  const LevelsData = [
    {
      id: '1',
      image: require('../../../assets/images/streak.png'),
      title: 'Streak',
      subtitle: (machine.context.profileData?.streak || 0) + ' Days',
      width: 58,
      height: 80,
    },
    {
      id: '2',
      image: require('../../../assets/images/level.png'),
      title: 'Level',
      subtitle: machine.context.profileData?.rank,
      width: 66,
      height: 66,
    },
    {
      id: '3',
      image: require('../../../assets/images/coin.png'),
      title: 'LB Coin',
      subtitle: machine.context.profileData?.coins,
      width: 63,
      height: 63,
    }, {
      id: "4",
      image: require("../../../assets/images/steps.png"),
      title: "Steps",
      subtitle: `${machine.context.profileData?.steps || 0}`,
      width: 65,
      height: 98,
    },
    {
      id: "5",
      image: require("../../../assets/images/daily.png"),
      title: "Daily HRV",
      subtitle: `${0} bps`,
      width: 66,
      height: 66,
    },
  ];

  const renderItem = () => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContentContainer}>
          <View style={{ marginLeft: -16 }}>
            <Text style={styles.depressDoctorText}>
              {machine.context.profileData?.username}
            </Text>

            <Text style={styles.poundScoreText}>Pound Score</Text>

            <Text style={styles.score}>
              {machine.context.profileData?.score}
            </Text>

            <View style={styles.cardFooterIconContainer}>
              {true ? (
                <Image
                  alt="img"
                  style={{
                    width: 19,
                    height: 32,
                    marginRight: RFValue(4),
                  }}
                  source={require('../../../assets/images/badgepurple.png')}
                />
              ) : (
                <></>
              )}
              {true ? (
                <Image
                  alt="img"
                  style={{
                    width: 22,
                    height: 29.72,
                    marginRight: RFValue(3),
                  }}
                  source={require('../../../assets/images/page.png')}
                />
              ) : (
                <></>
              )}
              {/* <Image alt="img"
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require("../../../assets/images/check.png")}
              /> */}
            </View>
          </View>

          <View style={styles.itemrightContainer}>
            <Image
              alt=""
              style={{ width: Platform.OS === "ios" ? 102 : 95, height: Platform.OS === "ios" ? 102 : 95, borderRadius: (Platform.OS === "ios" ? 110 : 100) / 2, borderColor: "#ffffff", borderWidth: 0.3 }}
              src={machine.context.profileData?.avatarHalf! || machine.context.profileData?.avatar!}
            />
          </View>
        </View>
      </View>
    );
  };

  const today = new Date();

  return machine.matches('loading') || !machine.context.profileData ? (
    <LoadingSpinner />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
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
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[
              styles.segmentItem,
              selectedIndex === 0 ? styles.activeSegmentItem : null,
            ]}
            onPress={() => handlePress(0)}>
            <View style={[
              selectedIndex === 0 ? { ...styles.activeSegmentBorder, borderBottomColor: "#FA00FF" } : {},
            ]}>
              <Text
                style={[
                  styles.segmentText,
                  selectedIndex === 0 ? styles.activeSegmentText : null,
                ]}>
                Capsule
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentItem,
            ]}
            onPress={() => handlePress(1)}>
            <View style={[
              selectedIndex === 1 ? styles.activeSegmentBorder : {},
            ]}>
              <Text
                style={[
                  styles.segmentText,
                  selectedIndex === 1 ? styles.activeSegmentText : null,
                ]}>
                Progress
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentItem,
              selectedIndex === 2 ? styles.activeSegmentItem : null,
            ]}
            onPress={() => handlePress(2)}>
            <View style={[
              selectedIndex === 2 ? { ...styles.activeSegmentBorder, borderBottomColor: "#FA00FF" } : {},
            ]}>
              <Text
                style={[
                  styles.segmentText,
                  selectedIndex === 2 ? styles.activeSegmentText : null,
                ]}>
                Oracle
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        height: SAFE_HEIGHT - 230 + (Platform.OS === 'ios' ? 0 : 70),
      }}>
        {selectedIndex === 0 && (
          <View style={{ ...styles.profileContainer, borderBottomWidth: 0 }}>
            <Image
              style={styles.avatarImage}
              source={{
                uri:
                  (litavatar ? machine.context.profileData?.avatar2Lit! : machine.context.profileData?.avatar2!) ||
                  machine.context.profileData?.avatar!,
              }}
              alt=""
            />

            <TouchableOpacity
              style={{ ...styles.activateCapusleButton, display: "flex" }}
              onPress={() => {
                setLitAvatar(true);

                setTimeout(() => {
                  setLitAvatar(false);
                }, 2500)
              }}
              disabled={litavatar}
            >
              <Text style={styles.activateBtnText}>{!litavatar ? "ACTIVATE YOUR CAPSULE" : "CAPSULE ACTIVATEd"}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Progress COntainer */}

        {selectedIndex === 1 && (
          <>
            <View style={styles.profileContainer}>
              <Image alt="avatar" src={machine.context.profileData.avatar} />
              <View
                style={{
                  marginTop: RFValue(10),
                }}>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.key}
                  scrollEnabled={false}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  left: 0,
                  bottom: RFValue(-50),
                }}
              />
            </View>
            <ScrollView>
              <View style={{
                marginTop: 15,
                marginBottom: 5,
              }}>
                <CustomCarousel
                  selectedIndex={selectedItem}
                  setSelectedIndex={setSelectedItem}
                  LevelsData={LevelsData}
                />
              </View>

              <View>
                {selectedItem == "0" && (
                  <View>
                    <SingleCalendar dates={machine.context.profileData.dates} />
                  </View>
                )}

                {selectedItem == "1" && (
                  <View>
                    <Text style={styles.leaderBoardText}>Leaderboard</Text>
                    <View style={{ marginBottom: 20, marginTop: 20 }}>
                      {machine.context.leaderboard.map((item, id) => (
                        <LeaderBoardRenderItem item={item} key={id} />
                      ))}
                    </View>
                  </View>
                )}

                {selectedItem == "2" && (
                  <View>
                    <Text style={styles.leaderBoardText}>Earnings</Text>
                    <FlatList
                      nestedScrollEnabled
                      contentContainerStyle={{ marginBottom: 20, marginTop: 20 }}
                      data={machine.context.logs.map(v => {
                        return {
                          id: v.id || v._id,
                          type: v.type,
                          change: v.change,
                          date: v.date,
                        }
                      })}
                      renderItem={({ item }) => (
                        <RenderItemEarnings item={item} />
                      )}
                      keyExtractor={item => item.id}
                    />
                  </View>
                )}

                {selectedItem == "3" && (
                  <View>
                    <Text style={styles.leaderBoardText}>{today.getDate()} {months[today.getMonth()]} {today.getFullYear()}</Text>

                    <View>
                      <BarGraph height={HEIGHT} />

                      <View style={styles.graphXAxisContainer}>
                        <Text style={styles.timeTextGraph}>00{"\n"}AM</Text>
                        <Text style={styles.timeTextGraph}>03{"\n"}AM</Text>
                        <Text style={styles.timeTextGraph}>06{"\n"}AM</Text>
                        <Text style={styles.timeTextGraph}>09{"\n"}AM</Text>
                        <Text style={styles.timeTextGraph}>12{"\n"}PM</Text>
                        <Text style={styles.timeTextGraph}>03{"\n"}PM</Text>
                        <Text style={styles.timeTextGraph}>06{"\n"}PM</Text>
                        <Text style={styles.timeTextGraph}>09{"\n"}PM</Text>
                      </View>
                    </View>
                  </View>
                )}

                {selectedItem == "4" && (
                  <View style={{
                    alignSelf: "center",
                  }}>
                    <Text style={styles.leaderBoardText}>{months[today.getMonth()]} {today.getFullYear()}</Text>
                    <View style={{ paddingBottom: 10 }}>
                      <View style={styles.graphFooterIndicators}>
                        <View style={styles.individualIndicatorContainer}>
                          <View style={{ ...styles.dot, backgroundColor: "#93D012" }} />
                          <Text style={styles.indicatorText}>HRV</Text>
                        </View>

                        <View style={styles.individualIndicatorContainer}>
                          <View style={{ ...styles.dot, backgroundColor: "#FF0000" }} />
                          <Text style={styles.indicatorText}>Strain</Text>
                        </View>

                        <View style={styles.individualIndicatorContainer}>
                          <View style={{ ...styles.dot, backgroundColor: "#002FFF" }} />
                          <Text style={styles.indicatorText}>Recovery</Text>
                        </View>
                      </View>
                      <LineChart
                        withVerticalLines={false}
                        data={{
                          labels: machine2.context.data!.daily.hrv.map(v => v.date),
                          datasets: [
                            {
                              data: machine2.context.data!.daily.hrv.map(v => v.score),
                              strokeWidth: 4,
                              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                            },
                            {
                              data: machine2.context.data!.daily.strain.map(v => v.score),
                              strokeWidth: 4,
                              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                            },
                            {
                              data: machine2.context.data!.daily.recovery.map(v => v.score),
                              strokeWidth: 4,
                              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                            },
                          ],
                        }}
                        width={WIDTH}
                        height={HEIGHT - (10 + 50 + 150 + 250 + 30 + 65 + 60 + (Platform.OS === "ios" ? 80 : 0))}
                        formatYLabel={(y) => `${y}%`}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                          useShadowColorFromDataset: true,
                          backgroundColor: "#000",
                          backgroundGradientFrom: "#000",
                          backgroundGradientTo: "#000",
                          decimalPlaces: 0,
                          color: (opacity = 1) => `rgba(189, 189, 189, ${opacity})`,
                          propsForDots: {
                            r: "4",
                          },
                          count: 100,
                        }}
                        withShadow={false}
                        fromZero={true}

                      />

                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          </>
        )}

        {/* AI Trainer Container */}
        {selectedIndex === 2 && (
          <View style={{ ...styles.profileContainer, borderBottomWidth: 0, display: "flex", flexWrap: "wrap" }}>
            {
              !machine.context.profileData.language || !machine.context.profileData.info ? <Text style={{ ...styles.badgesText, marginTop: 50 }}>Setup On Discord</Text> :
                <Fragment>
                  <ScrollView style={{
                    height: HEIGHT - 230 - (Platform.OS === "ios" ? 60 : 0),
                  }}
                    ref={setRef}
                    onContentSizeChange={() => ref.scrollToEnd({ animated: true })}>
                    <Image source={require("../../../assets/images/chattop.jpg")} alt="chat top" style={{
                      width: WIDTH,
                      height: WIDTH / 1.86,
                      marginBottom: 10
                    }} />
                    {messages.map((v, i) => <Message key={i} content={v.content} trainer={v.trainer} name={machine.context.profileData?.username} avatar={machine.context.profileData?.avatarHalf || machine.context.profileData?.avatar} thinking={v.thinking} />)}
                  </ScrollView>
                  <View style={{ height: 48 }}>
                    <HStack style={{
                      width: "92%",
                      left: "3%",
                      height: 50,
                      marginTop: 5,
                      marginLeft: -8
                    }}>
                      <VStack>
                        <Avatar
                          source={{
                            uri: machine.context.profileData.avatarHalf || machine.context.profileData.avatar
                          }}
                          style={{
                            marginTop: 15,
                            height: 33,
                            width: 33,
                            marginLeft: 0
                          }}
                        />
                      </VStack >
                      <HStack style={{
                        backgroundColor: "#282828",
                        borderRadius: 5,
                        marginLeft: 10,
                        paddingLeft: 7,
                        marginTop: 10,
                      }}>
                        <TextInput
                          style={{
                            width: '86%',
                            color: 'white',
                            fontSize: 20,
                            backgroundColor: "#282828",
                          }}
                          onChangeText={onChangeText}
                          value={text}
                          placeholder={"Type Message Here"}
                          placeholderTextColor="#ffffff86"
                          editable={!disabled}
                        />
                        <Button
                          style={{
                            backgroundColor: "#282828",
                          }}
                          disabled={disabled}
                          onPress={async () => {
                            if (text.length === 0) return Alert.alert("Error", "Please Input A Message");

                            let completed = false, i = 1;
                            setMessages([...messages, {
                              trainer: false,
                              content: text,
                            }, {
                              trainer: true,
                              content: "Oracle is thinking",
                              thinking: true
                            }]);

                            const int = setInterval(() => {
                              if (completed) clearInterval(int);
                              else setMessages([...messages, {
                                trainer: false,
                                content: text,
                              }, {
                                trainer: true,
                                content: "Oracle is thinking" + ".".repeat(i++ % 4),
                                thinking: true
                              }]);
                            }, 200);

                            setDisabled(true);
                            onChangeText("");
                            oracleClient.post("/trainer/chat", {
                              message: text,
                              author: machine.context.profileData?.id,
                            }).then((x) => {
                              completed = true;

                              setMessages([...messages, {
                                trainer: false,
                                content: text,
                              }, {
                                trainer: true,
                                content: x.data,
                              }]);
                              setDisabled(false);
                            }).catch((e) => {
                              completed = true;
                              setDisabled(false);
                            })

                          }}>
                          <Image alt="send" width={6} height={6} source={require('../../../assets/images/send.png')} />
                        </Button>
                      </HStack>
                    </HStack>
                  </View>
                </Fragment>
            }
          </View>
        )}
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2.5%',
    marginTop: 3,
    flex: 1,
    height: "100%"
  },
  mt: {
    marginTop: 25,
  },
  menuIcon: {
    width: 21,
    height: 12,
    marginHorizontal: 17,
    marginTop: 10
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    marginTop: RFValue(22),
    paddingHorizontal: RFValue(16),
    marginBottom: -4.2,
    width: "100%"
  },
  segmentItem: {
    padding: 6,
    paddingHorizontal: RFValue(14),
    borderRadius: 25,
  },
  activeSegmentItem: {
  },
  activeSegmentBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "#AEFF03",
    borderRadius: 0,
    paddingBottom: 9
  },
  segmentText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeSegmentText: {
    color: '#FFF',
  },
  itemContainer: {
    width: '100%',
    backgroundColor: '#000',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  selectedDot: {
    backgroundColor: '#D9D9D9',
  },
  depressDoctorText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'FamiljenGroteskGF-Regular',
    marginTop: -5,
  },
  poundScoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 14,
    paddingBottom: 15,
    marginBottom: -18,
  },
  score: {
    color: '#AEFF03',
    fontSize: 32,
    paddingTop: 18,
    paddingBottom: 16,
    fontWeight: 'bold',
  },
  cardFooterIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -9,
    marginBottom: -4,
  },
  itemContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemrightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seprator: {
    width: Dimensions.get('window').width - 34,
    height: 1.5,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  profileContainer: {
    borderTopWidth: 0.2,
    borderTopColor: '#ffffff88',
    borderBottomWidth: 0.2,
    borderBottomColor: '#ffffff88',
    width: WIDTH * 0.9,
    marginLeft: WIDTH * 0.05,
    paddingBottom: Platform.OS === "ios" ? 8 : 4
  },
  streakImage: {
    width: 63,
    height: 85,
    alignSelf: 'center',
  },
  leaderBoardText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 18,
    marginBottom: -35,
  },
  scroll: {
    width: RFValue(5),
    height: RFValue(125),
  },
  rankImage: {
    width: RFValue(25),
    height: RFValue(25),
  },
  personImage: {
    width: RFValue(17),
    height: RFValue(38),
  },
  leaderTitle: {
    color: '#fff',
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
  leaderboardLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderBoardMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 12,
    marginTop: RFValue(30),
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: RFValue(4),
  },
  indicatorText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '800',
  },
  avatarImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    backgroundColor: '#000',
    // width: Math.min((WIDTH - 65), (HEIGHT - 400) / 1.23),
    // height: Math.min((WIDTH - 65) * 1.23, HEIGHT - 400),
    width: (HEIGHT - 260 - (Platform.OS === "ios" ? 60 : 0)) / 1.23,
    height: HEIGHT - 260 - (Platform.OS === "ios" ? 60 : 0),
  },
  badgesText: {
    color: '#fff',
    fontSize: RFValue(27),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  badgeImageContainer: {
    width: 42,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: RFValue(30),
  },
  title: {
    fontSize: RFValue(15),
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  badgeListContainer: {
    marginTop: 0,
  },
  activateCapusleButton: {
    width: 169,
    height: 31,
    backgroundColor: "rgba(174, 255, 3, 0.44)",
    borderWidth: 1,
    borderColor: "#AEFF03",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 10,
  },
  activateBtnText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  graphXAxisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginRight: 40,
    marginTop: 2,
  },
  timeTextGraph: {
    fontSize: 12,
    color: '#7A7A7A',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
  graphFooterIndicators: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: RFValue(60),
    marginTop: 15,
    marginBottom: 2,
  },
  individualIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5
  },
});
