import React, { FC, Fragment } from 'react';
import { VStack, Avatar, Text, HStack, Image } from 'native-base';
import { MessageType } from '../interfaces/MessageType';

type MessageProps = MessageType;

export const Message: FC<MessageProps> = ({ content, author, avatar, createdAt, reply, color }) => {
    const rawWords = content.replace(/\n/g, " ---nn--- ").split(/\s+/);
    const sen: string[][] = [[]];

    let ind = 0;
    for (let i = 0; i < rawWords.length; i++) {
        if (rawWords[i] !== "---nn---") sen[ind].push(rawWords[i]);
        else sen[++ind] = [];
    }
    if (color === "#000000") color = "#ffffff";
    return (
        <VStack style={{
            marginLeft: 5,
            marginBottom: 30,
            backgroundColor: "#000000",
            width: '95%',
            overflow: 'hidden',
        }}>
            {reply ? <HStack style={{
                margin: 4,
                marginLeft: 10
            }}>
                <VStack style={{
                    paddingTop:10,
                    paddingLeft:6
                }}>
                    <Image alt="reply" width={4} height={4} source={require('../../../assets/images/reply.png')} />
                </VStack>
                <VStack>
                    <Avatar 
                    source={{
                        uri: reply.avatar
                    }}
                     size="xs"
                     style={{
                        marginLeft:8,
                        marginBottom:3
                     }}
                     />
                </VStack>
                <VStack style={{
                    paddingLeft: 5
                }}>
                    <Text style={{
                        fontSize: 12,
                        fontWeight:"bold",
                        color: `${reply.color || "#ffffff"}f0`,
                    }}>
                        {reply.author + ": "}
                        <Text style={{
                            fontSize: 12,
                            color: "#ffffffc8",
                            fontWeight:"400"
                        }}>
                            {reply.content.slice(0, 15) + (reply.content.length > 15 ? "..." : "")}
                        </Text>
                    </Text>

                </VStack>
            </HStack> : <Fragment />
            }
            <HStack style={{
            }}>
                <VStack>
                    <Avatar source={{
                        uri: avatar
                    }} size={'sm'} />
                </VStack>
                <VStack style={{
                    paddingLeft: 12
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: color || "white",
                        textShadowColor: "#000000",
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10,
                        fontWeight: "bold",
                    }}>
                        {author + " "}
                        <Text color={"#ffffff81"} style={{
                            fontFamily: "Arial",
                            fontSize: 11,
                            fontWeight: "100",
                            paddingLeft: 9
                        }}>
                            {"  "}{`${new Date(createdAt).getMonth() + 1}/${new Date(createdAt).getDate()}/${new Date(createdAt).getFullYear()} ${new Date(createdAt).getHours() % 12}:${new Date(createdAt).getMinutes()} ${new Date(createdAt).getHours() >= 12 ? "PM" : "AM"}`}
                        </Text>
                    </Text>
                </VStack>
            </HStack>

            {
                sen.map((words, i) => <HStack key={i} style={{
                    paddingLeft: 44.5,
                    marginTop: -12,
                    flexWrap: 'wrap',
                }}>
                    {words.map((w, j) => w === "---nn---" ? <Text key={j}>{'\n'} </Text> : /\*\*[\w\d]+\*\*/.test(w) ? <Text key={j} color="#ffffffde" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                        fontWeight: '900'
                    }}>{w.replace(/\*/g, "") + " "}</Text> : /\`[\w\d]+\`/.test(w) ? <Text key={j} color="#ffffffde" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                        backgroundColor: "#575757",
                        borderRadius: 2,
                        padding: 1,
                        marginLeft: 1,
                        marginRight: 1,
                    }}>{w.replace(/\`/g, "") + " "}</Text> : <Text key={j} color="#ffffffde" fontSize={16} textAlign="left" style={{
                        fontFamily: "Arial",
                    }}>{w + " "}</Text>)
                    }
                </HStack >)
            }
        </VStack >
    );
};
