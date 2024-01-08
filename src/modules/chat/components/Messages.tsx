import React, { FC, useState } from 'react';
import { ScrollView } from 'native-base';
import { MessageType } from '../interfaces/MessageType';
import { Message } from './message';

export const Messages: FC<{ messages: MessageType[] }> = ({ messages }) => {
    const [ref, setRef] = useState<any>();

    return (
        <ScrollView
            style={{
                marginHorizontal: '2.5%',
                flex: 1,
            }}
            ref={setRef}
            onContentSizeChange={() => ref.scrollToEnd({ animated: true })}
        >
            {messages?.sort((b, a) => b.createdAt - a.createdAt).map((message, i) => <Message author={message.author} avatar={message.avatar} content={message.content} createdAt={message.createdAt} reply={message.reply} key={i} color={message.color} />)}
        </ScrollView>
    );
};
