import React, { FC } from "react";
import {
    Text,
    View,
    Image,
    Dimensions,
    StyleSheet,
} from "react-native";

// @ts-ignore
import Carousel from "react-native-new-snap-carousel";

const WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = WIDTH * 0.31;

export const CustomCarousel: FC<{ selectedIndex: any, setSelectedIndex: any, LevelsData: any }> = ({ selectedIndex, setSelectedIndex, LevelsData }) => {
    const loopedData = [...LevelsData, ...LevelsData, ...LevelsData, ...LevelsData, ...LevelsData, ...LevelsData, ...LevelsData, ...LevelsData, ...LevelsData];

    return (
        <View>
            <View style={styles.fixedBox} />
            <Carousel
                data={loopedData}
                sliderWidth={WIDTH}
                itemWidth={ITEM_WIDTH}
                loop={true}
                // onSnapToItem={setSelectedIndex}
                // @ts-ignore
                onSnapToItem={(index) => {
                    // Calculate the index of the item in the original data array
                    const originalIndex = index % LevelsData.length;
                    setSelectedIndex(originalIndex);
                }}
                // @ts-ignore
                renderItem={({ item, index }) => (
                    <LevelItem
                        key={index}
                        index={parseInt(item.id) - 1}
                        item={item}
                        selectedIndex={selectedIndex}
                    />
                )}
            />
        </View>
    );
};

export default CustomCarousel;

const styles = StyleSheet.create({
    streakImage: {
        width: 63,
        height: 85,
        alignSelf: "center",
    },
    fixedBox: {
        width: ITEM_WIDTH,
        height: 210,
        position: "absolute",
        alignSelf: "center",
        marginLeft: 5,
        marginTop:10
    },
});

const LevelItem = ({ item, index, selectedIndex }: any) => {
    return (
        <View
            style={{
                width: ITEM_WIDTH,
                height: 210,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: index == selectedIndex ? "#0D0D0D" : "#000",
                borderColor: index == selectedIndex ? "#ffffff" : "#000",
                borderWidth: index == selectedIndex ? 0.2 : 0,
            }}
        >
            <Image
                style={{
                    ...styles.streakImage,
                    width: item.width,
                    height: item.height,
                }}
                source={item.image}
            />

            <Text
                style={{
                    fontSize: selectedIndex == index ? 15 : 11,
                    color: "#fff",
                    alignSelf: "center",
                    marginTop: 6,
                    fontWeight: selectedIndex == index ? "bold" : "normal",
                }}
            >
                {item.title}
            </Text>

            {selectedIndex == parseInt(item.id) - 1 ? (
                <View
                    style={{
                        borderRadius: 13,
                        backgroundColor: "rgba(174, 255, 3, 0.44)",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,
                        paddingHorizontal: 10,
                        alignSelf: "center",
                        borderWidth: 1,
                        borderColor: "#AEFF03",
                        marginTop: 6,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
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
                        fontSize: 15,
                        fontWeight: 'normal'
                    }}
                >
                    {item.subtitle}
                </Text>
            )}
        </View>
    );
};
