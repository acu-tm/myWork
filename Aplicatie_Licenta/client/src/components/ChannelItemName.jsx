import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const ChannelItemName = ({ setActiveChannel, setToggleCreationPage, setToggleUpdatePage, setAndroidMode, channel, type }) => {  
    //get channel and client from useChatContext refered as a hook
    const { channel: selectedChannel, client } = useChatContext();
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);         

    return (
        <div 
        onClick={() => {
            setToggleCreationPage(false);               
            setToggleUpdatePage(false);                
            setActiveChannel(channel);
            if(setAndroidMode) {
                setAndroidMode((prevState) => !prevState)
            }
        }}
        //switch
        className={
            channel?.id === selectedChannel?.id
                ? "channel-item-name_item-marked"
                : "channel-item-name_item"
        }
        >
            {type === 'team'        //dispaly the template of a team channel with multiple users      
            ? 
            <p className="channel-item-name_wrapper">
                # {channel?.data?.name || channel?.data?.id}
                    {channel.countUnread() !== 0
                    ? <p className='unread_message-count'>&nbsp;({channel.countUnread()})</p>
                    : null}
            </p>
            :                       //dispaly the template of users chat
            <div className="channel-item-name_wrapper single">
                <Avatar image={members[0]?.user?.image} name={members[0]?.user?.name || members[0]?.user?.id} size={25} />
                <p>{members[0]?.user?.name || members[0]?.user?.id} </p>
                {channel.countUnread() !== 0 
                    ? <p className='unread_message-count'>&nbsp;({channel.countUnread()})</p>
                    : null}
            </div>
            }
        </div>
    );
}

export default ChannelItemName
