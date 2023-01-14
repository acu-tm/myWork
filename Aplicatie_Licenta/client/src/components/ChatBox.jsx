// ***
import React, { useState } from 'react';
import { MessageList, MessageTeam, MessageSimple, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext, Channel, useMessageContext } from 'stream-chat-react';

//import 'react-native-webcrypto';

import {DecryptedMessageList} from './';

import { ChannelInfo } from '../resources';

export const GiphyContext = React.createContext({});

const ChatBox = ({ setToggleUpdatePage }) => {

  const { channel, client } = useChatContext();
  const { sendMessage } = useChannelActionContext();

  const [enableGifs, setEnableGifs] = useState(false);

  //encrypt message function
  const encryptMessage = async (message) => {
    //const channelCreator = await channel.data.created_by; //get current channel key
    const symmKeyJwk = JSON.parse(channel.data.channelKey);
    const onelog = channel?.data?.channelKey;
    //console.log(onelog);

    //console.log(symmKeyJwk);

    const symmKey = await window.crypto.subtle.importKey(
      "jwk",
      symmKeyJwk,
      {name:"AES-CTR", length: 256},
      true,
      ["encrypt", "decrypt"]
    );

    const plainText = new TextEncoder().encode(message);

    const cipherText = await window.crypto.subtle.encrypt(
      {name: "AES-CTR", counter: new Uint8Array(16), length: 16*8},
      symmKey,
      plainText
    );

    const uintArray = new Uint8Array(cipherText);
    const string = String.fromCharCode.apply(null, uintArray);
    const base64Data = btoa(string);

    return base64Data;
  }
  //END encrypt message function
  
  const sendCustomFormMessage = async (message) => {
    let customMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      //text: await encryptMessage(message.text),
      text: message.text
    };
    
    if (enableGifs) {
      customMessage = { ...customMessage, text: `/giphy ${message.text}` };
    }
    
    if (sendMessage) {
      setEnableGifs(false);
      sendMessage(customMessage);
    }
  };

  const BuildNewProps = (oldProps) => {
    const {message} = useMessageContext();

    const newProps = {
      ...oldProps,
      message: message

    };

    return newProps;
  }

  return (
    <GiphyContext.Provider value={{ giphyState: enableGifs, setGiphyState: setEnableGifs }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
        <ChatBoxHeader setToggleUpdatePage={setToggleUpdatePage} />
        <MessageList 
            //Message={(messageProps) => <DecryptedMessageList {...messageProps}/>}
            Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            //Message={(messageProps, i) =>  <DecryptedMessageList props={BuildNewProps(messageProps)} i={i}/>}
            //Message={<DecryptedMessageList/>}
        />
        <MessageInput overrideSubmitHandler={sendCustomFormMessage} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const ChatBoxHeader = ({ setToggleUpdatePage}) => {
    const { client } = useChatContext();
    const { channel, watcher_count } = useChannelStateContext();
  
    const ParticipantsInfo = () => {
      const participants = Object.values(channel.state.members).filter(
        ({ user }) => user.id !== client.userID
      );
      const moreParticipants = participants.length - 4;
  
      if(channel.type === 'messaging') {
        return (
          <div className='chat-box_wrapper'>
            {
              participants.map(({ user }, i) => (
                <div key={i} className='chat-box_multiple-title'>
                    <Avatar image={user.image} name={user.name || user.id} size={32} />
                    <p className='chat-box_header-text user'>{user.name || user.id}</p>
                </div>
              ))
            }
  
            {moreParticipants > 0 && <p className='chat-box_header-text user'>and {moreParticipants} more</p>}

          </div>
        );
      }
  
      return (                                                        //*?* name !!! ???
        <div className='chat-box_header'>
          <p className='chat-box_header-text'># {channel.data.name}</p>
          <span style={{ display: 'flex' }} onClick={() => setToggleUpdatePage(true)}>
            <ChannelInfo />
          </span>
        </div>
      );
    };
  
    const displayActiveUsers = (watchers) => {
      if (!watchers) 
        return 'No users online';
      if (watchers === 1) 
        return '1 online';
        
      return `${watchers} online`;
    };
  
    return (
      <div className='chat-box_header-wrapper'>
        <ParticipantsInfo />
        <div className='chat-box_header-views'>
          <p className='chat-box_header-views-text'>{displayActiveUsers(watcher_count)}</p>
        </div>
      </div>
    );
  };

  export default ChatBox;
