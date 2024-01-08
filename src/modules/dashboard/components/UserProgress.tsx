import React, { FC, useState } from 'react';
import { VStack, Text, Progress, Image, View } from 'native-base';
import { StyleProp, ViewStyle, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

type UserProgressProps = {
  style?: StyleProp<ViewStyle>;
  level: number;
  streak: number;
  coins: number;
};

export const UserProgress: FC<UserProgressProps> = ({ level, streak, coins }) => {
  const [selectedItem, setSelectedItem] = React.useState("2");

  const renderItemlevel = ({ item }: { item: any }) => {
    const onPressItem = () => {
      setSelectedItem(item?.id);
    };
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get("window").width / 3.4,
          height: 220,
          borderWidth: selectedItem === item.id ? 1 : 0,
          borderColor: "#fff",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "baseline",
        }}
        activeOpacity={0.5}
        onPress={onPressItem}
      >
        <Image
          alt="img"
          style={{
            ...styles.streakImage,
            width: item.width,
            height: item.height,
          }}
          source={item.image}
        />

        <Text
          style={{
            fontSize: selectedItem === item.id ? RFValue(15) : RFValue(11),
            color: "#fff",
            alignSelf: "center",
            marginTop: 6,
            fontWeight: selectedItem === item.id ? "bold" : "normal",
          }}
        >
          {item.title}
        </Text>

        {selectedItem === item.id ? (
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "rgba(174, 255, 3, 0.44)",
              justifyContent: "center",
              alignItems: "center",
              padding: 6,
              paddingHorizontal: 10,
              alignSelf: "center",
              borderWidth: 1,
              borderColor: "#AEFF03",
              marginTop: 6,
            }}
          >
            <Text
              style={{
                fontSize: RFValue(16),
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {item.subtitle}
            </Text>
          </View>
        ) : (
          <Text
            style={{
              color: "#fff",
              alignSelf: "center",
            }}
          >
            {item.subtitle}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{
      marginTop: 60
    }}>
      <View >
        <FlatList
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            {
              id: "1",
              image: require("../../../assets/images/streak.png"),
              title: "Streak",
              subtitle: streak + " Days",
              width: 63,
              height: 85,
            },
            {
              id: "2",
              image: require("../../../assets/images/level.png"),
              title: "Level",
              subtitle: level || "Mono",
              width: 71,
              height: 71,
            },
            {
              id: "3",
              image: require("../../../assets/images/coin.png"),
              title: "LB Coin",
              subtitle: coins + "",
              width: 69,
              height: 69,
            },
          ]}
          renderItem={renderItemlevel}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </View>
  )

  // return (

  //   <VStack style={{
  //     flex: 1,
  //     flexWrap: 'wrap',
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     padding: 10
  //   }}>
  //     <VStack style={[
  //       style,
  //       {
  //         height: 95,
  //         width: 95,
  //         backgroundColor: "#1c1e1d",
  //         borderRadius: 4,
  //         flexBasis: '30%',
  //         alignItems: "center",
  //         padding: 10
  //       }
  //     ]}>

  //       <Image
  //         source={require('../../../assets/images/leaderboard.png')}
  //         height={7}
  //         width={7}
  //         alt={"leaderboard"}
  //       />
  //       <Text color={"white"} style={{
  //         fontSize: 10,
  //         paddingTop: 8,
  //       }}>Rank</Text>
  //       <Text color={"white"} style={{
  //         fontSize: 16,
  //         fontWeight: '900'
  //       }}>Level {level}</Text>
  //     </VStack>

  //     <VStack style={[
  //       style,
  //       {
  //         height: 95,
  //         width: 95,
  //         backgroundColor: "#1c1e1d",
  //         borderRadius: 4,
  //         flexBasis: '30%',
  //         alignItems: "center",
  //         padding: 10
  //       }
  //     ]}>
  //       <Image
  //         source={require('../../../assets/images/streak.png')}
  //         height={7}
  //         width={5}
  //         alt={"streak"}
  //       />
  //       <Text color={"white"} style={{
  //         fontSize: 10,
  //         paddingTop: 8,
  //       }}>Streak</Text>
  //       <Text color={"white"} style={{
  //         fontSize: 16,
  //         fontWeight: '900'
  //       }}>{streak} {streak > 1 ? 'days' : 'day'}</Text>
  //     </VStack>

  //     <VStack style={[
  //       style,
  //       {
  //         height: 95,
  //         width: 95,
  //         backgroundColor: "#1c1e1d",
  //         borderRadius: 4,
  //         flexBasis: '30%',
  //         alignItems: "center",
  //         padding: 10
  //       }
  //     ]}>
  //       <Image
  //         source={require('../../../assets/images/coin.png')}
  //         height={7}
  //         width={7}
  //         alt={"coin"}
  //       />
  //       <Text color={"white"} style={{
  //         fontSize: 10,
  //         paddingTop: 8,
  //       }}>LB Coin</Text>
  //       <Text color={"white"} style={{
  //         fontSize: 16,
  //         fontWeight: '900'
  //       }}>{coins}</Text>
  //     </VStack>
  //   </VStack>
  // );
};


const styles = StyleSheet.create({
  streakImage: {
    width: 63,
    height: 80,
    alignSelf: "center",
  },
});
