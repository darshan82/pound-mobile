import React, { FC } from 'react';
import { VStack, Avatar, Text, HStack } from 'native-base';
import { Dimensions } from 'react-native';

export type MessageProps = {
    content: string,
    name?: string,
    avatar?: string,
    trainer: boolean,
    thinking?: boolean,
}

const WIDTH = Dimensions.get('window').width;

export const Message: FC<MessageProps> = ({ content, trainer, name, avatar, thinking }) => {
    const rawWords = content.replace(/\n/g, " ---nn--- ").split(/\s+/);
    const sen: string[][] = [[]];

    let ind = 0;

    for (let i = 0; i < rawWords.length; i++) {
        if (rawWords[i] !== "---nn---") sen[ind].push(rawWords[i]);
        else sen[++ind] = [];
    }

    if (thinking) return (
        <HStack style={{
            marginLeft: 5,
            marginBottom: 20,
            backgroundColor: "#000000",
            width: WIDTH,
            overflow: 'hidden',
            paddingBottom: 10,
        }}>
            <VStack style={{
                width: "90%" ,
                backgroundColor: "#FA00FF36",
                borderColor: "#FA00FF",
                borderWidth: 0.6,
                padding: 5,
                borderRadius: 8,
                
            }}>
                {sen.map((words, i) => <HStack key={i} style={{
                    flexWrap: "wrap"
                }}>
                    {words.map((w, j) => w === "---nn---" ? <Text key={j}>{'\n'} </Text> : /\*\*[\w\d]+\*\*/.test(w) ? <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                        fontWeight: '900'
                    }}>{w.replace(/\*/g, "") + " "}</Text> : /\`[\w\d]+\`/.test(w) ? <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                        backgroundColor: "#575757",
                        borderRadius: 2,
                        padding: 1,
                        marginLeft: 1,
                        marginRight: 1,
                    }}>{w.replace(/\`/g, "") + " "}</Text> : <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                    }}>{w + " "}</Text>)
                    }
                </HStack >)}
            </VStack>
        </HStack>
    )

    if (trainer) return (
        <HStack style={{
            marginLeft: 5,
            marginBottom: 20,
            backgroundColor: "#000000",
            width: WIDTH * 0.9,
            overflow: 'hidden',
            paddingBottom: 10,
        }}>
            <VStack style={{
                width: WIDTH * 0.75,
                backgroundColor: "#FA00FF36",
                borderColor: "#FA00FF",
                borderWidth: 0.6,
                padding: 5,
                borderRadius: 8,
                marginRight: WIDTH * 0.05
            }}>
                <VStack style={{
                }}>
                    <Text style={{
                        fontSize: 17,
                        color: "#FA00FF",
                        fontWeight: '900'
                    }}>
                        {trainer ? "Oracle" : name}
                    </Text>
                </VStack>

                {sen.map((words, i) => <HStack key={i} style={{
                    flexWrap: "wrap"
                }}>
                    {words.map((w, j) => w === "---nn---" ? <Text key={j}>{'\n'} </Text> : /\*\*[\w\d]+\*\*/.test(w) ? <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                        fontWeight: '900'
                    }}>{w.replace(/\*/g, "") + " "}</Text> : /\`[\w\d]+\`/.test(w) ? <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                        backgroundColor: "#575757",
                        borderRadius: 2,
                        padding: 1,
                        marginLeft: 1,
                        marginRight: 1,
                    }}>{w.replace(/\`/g, "") + " "}</Text> : <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                    }}>{w + " "}</Text>)
                    }
                </HStack >)}
            </VStack>

            <VStack>
                <Avatar
                    style={{
                        width: WIDTH * 0.1,
                        height: WIDTH * 0.1,
                        borderWidth: 1,
                        borderColor: "#FA00FF",
                    }}
                    source={
                        trainer ? require("../../../assets/images/oracle.png") : avatar
                    }
                />
            </VStack >
        </HStack>
    )


    return (
        <HStack style={{
            marginLeft: 5,
            marginBottom: 20,
            backgroundColor: "#000000",
            width: WIDTH * 0.9,
            overflow: 'hidden',
            paddingBottom: 10,
        }}>
            <VStack>
                <Avatar
                    style={{
                        width: WIDTH * 0.1,
                        height: WIDTH * 0.1,
                        borderWidth: 1,
                        borderColor: "#595959",
                    }}
                    source={
                        trainer ? require("../../../assets/images/oracle.png") : { uri: avatar }
                    }
                />
            </VStack >
            <VStack style={{
                width: WIDTH * 0.75,
                backgroundColor: "#59595977",
                borderColor: "#ffffffa8",
                borderWidth: 0.6,
                padding: 5,
                borderRadius: 8,
                marginLeft: WIDTH * 0.05
            }}>
                <VStack style={{
                }}>
                    <Text style={{
                        fontSize: 17,
                        color: "#FA00FF",
                        fontWeight: '900'
                    }}>
                        {trainer ? "Oracle" : name}
                    </Text>
                </VStack>

                {sen.map((words, i) => <HStack key={i} style={{
                    flexWrap: "wrap"
                }}>
                    {words.map((w, j) => w === "---nn---" ? <Text key={j}>{'\n'} </Text> : /\*\*[\w\d]+\*\*/.test(w) ? <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                        fontWeight: '900'
                    }}>{w.replace(/\*/g, "") + " "}</Text> : /\`[\w\d]+\`/.test(w) ? <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                        backgroundColor: "#575757",
                        borderRadius: 2,
                        padding: 1,
                        marginLeft: 1,
                        marginRight: 1,
                    }}>{w.replace(/\`/g, "") + " "}</Text> : <Text key={j} color="white" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                    }}>{w + " "}</Text>)
                    }
                </HStack >)}
            </VStack>
        </HStack>
    );
};
