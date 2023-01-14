import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { ParticipantsList, InviteUser } from './';
import { CloseCreationWindow } from '../resources';
//const [warnEq, setWarnEq] = useState(false); //verify

//warnEq == true ?
    //       <h4 className='channel-same_name-warning-DUMMY'>There is already a channel with this name!</h4>
    //        : null

const ChannelCreationPage = ({ channelType, setToggleCreationPage }) => {  
    const { client, setActiveChannel } = useChatContext();

    const [newChannelName, setNewChannelName] = useState('');
    const [channelParticipants, setChannelParticipants] = useState([client.userID || '']);
    const [warnEq, setWarnEq] = useState(false); 

    const handleChange = (event) => {
        event.preventDefault();

        setNewChannelName(event.target.value);//get channel name
    }

    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const response = await client.queryChannels({
                type: 'team',                                         
                name: { $autocomplete: newChannelName }, 
                members: { $in: [client.userID]}
            });
            
            if(response){
                setWarnEq(true);
                
            }

        } catch (error) {
            console.log(error);
        }
    //end vcn

    if(warnEq === false) //verify if
    {
        //generate channel key
        const publicKey = await window.crypto.subtle.generateKey(
            {name:"AES-CTR", length: 256},
            true,
            ["encrypt", "decrypt"]
        );

        const exportedKey = await window.crypto.subtle.exportKey(
            "jwk",
            publicKey
          );

        const publicKeyJwk = JSON.stringify(exportedKey);
        //end generate key

        try {
            const createdChannel = await client.channel(channelType, newChannelName, {
                name: newChannelName, members: channelParticipants, channelKey: publicKeyJwk
            });

            await createdChannel.watch();

            setNewChannelName('');
            setToggleCreationPage(false);
            setChannelParticipants([client.userID]);
            setActiveChannel(createdChannel);
            setWarnEq(false);
        } catch (error) {
            console.log(error);
        }
    }else{
        setToggleCreationPage(true);
        setWarnEq(true);
    }//end if-else

    }
    //ChannelCreationPage box layout
    return (                                                  
        <div className="channel-creation_wrapper">
            <div className="channel-creation_title">
                <p>{channelType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreationWindow setToggleCreationPage={setToggleCreationPage} />
            </div>
            {channelType === 'team' &&
                <div className="channel-creation_input-field">
                    <p>Channel Name</p>
                        <input value={newChannelName} onChange={handleChange} placeholder="channel-name"/>
                    <p>Add Participants</p>
                </div>
            }
            <ParticipantsList setChannelParticipants={setChannelParticipants} />
            <InviteUser />
            <div className="channel-creation_button" onClick={createChannel}>
                <p>{channelType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    )
}

export default ChannelCreationPage
