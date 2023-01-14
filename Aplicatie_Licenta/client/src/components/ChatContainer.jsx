import React from 'react';
import { Channel, MessageTeam, useChatContext } from 'stream-chat-react';

import { ChatBox, ChannelCreationPage, ChannelUpdatePage, DecryptedMessageList } from './';

import noMessage from '../resources/noMessage.png';

const ChatContainer = ({ toggleCreationPage, setToggleCreationPage, toggleUpdatePage, setToggleUpdatePage, channelType }) => {
    const { channel } = useChatContext(); //give information about a specific channel

    //if the user is creating a new channel
    if(toggleCreationPage) {
        return (
            <div className="chat-box_container">
                <ChannelCreationPage channelType={channelType} setToggleCreationPage={setToggleCreationPage} />
            </div>
        )
    }

    //if the user is editing an existing channel
    if(toggleUpdatePage) {
        return (
            <div className="chat-box_container">
                <ChannelUpdatePage setToggleUpdatePage={setToggleUpdatePage} />
            </div> 
        )
    }

    //handle the situation of a new chat with no messages yet
    const EmptyState = () => (
        <div className="channel-empty__container">
            <img className='channel-empty__image' src={noMessage} alt='no message' />
            <p className="chat-box_no-message1">You have no messages on this channel yet!</p>
            <p className="chat-box_no-message2">Write messages, send attachments, links, emojis, and more!</p>
        </div>
    )

    /*const show = (props, i) => {
        console.log(props)
        return <DecryptedMessageList {...props} i={i}/>
    }*/

    return (
        <div className="chat-box_container">
            <Channel
                EmptyStateIndicator={EmptyState}
                channel={channel}
                //Message={(messageProps, i) => show(messageProps, i)}
                //Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
                //Message={(messageProps, i) =>  <DecryptedMessageList props={messageProps} i={i}/>}
            >
                <ChatBox setToggleUpdatePage={setToggleUpdatePage} />
            </Channel>
        </div>
    );
}

export default ChatContainer;
