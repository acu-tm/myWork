import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { ParticipantsList, InviteUser } from './';
import { CloseCreationWindow } from '../resources';

const ChannelUpdatePage = ({ setToggleUpdatePage }) => {                 
    const { client, channel } = useChatContext();
    
    const [editedChannelName, setEditedChannelName] = useState(channel?.data?.name || '');
    const [channelParticipants, setChannelParticipants] = useState([]);
    const [warnEq, setWarnEq] = useState(false); 

    const handleChange = (event) => {
        event.preventDefault();
        setEditedChannelName(event.target.value);
    }

    const editChannel = async (event) => {
        event.preventDefault();

        try {
            const response = await client.queryChannels({
                type: 'team',                                    
                name: { $autocomplete: editedChannelName }, 
                members: { $in: [client.userID]}
            });
            
            if(response){
                setWarnEq(true);
                
            }

        } catch (error) {
            console.log(error);
        }

    if(warnEq === false)
    {
        if(editedChannelName !== (channel.data.name || channel.data.id)) {
            await channel.update({ name: editedChannelName }, { text: `Channel name changed to ${editedChannelName}`});
        }

        if(channelParticipants.length) {
            await channel.addMembers(channelParticipants);
        }

        setEditedChannelName(null);
        setToggleUpdatePage(false);
        setChannelParticipants([]);
        setWarnEq(false); 
    }
    else{
        setToggleUpdatePage(true);
        setWarnEq(true);
    }

    }
    return (
        <div className="channel-update_wrapper">
            <div className="channel-update_title">
                <p>Edit Channel</p>
                <CloseCreationWindow setToggleUpdatePage={setToggleUpdatePage} />
            </div>

            <div className="channel-creation_input-field">
                <p>Edit Channel Name</p>
                    <input value={editedChannelName} onChange={handleChange} placeholder="channel-name" />
                <p>Edit Participants</p>
            </div>

            <ParticipantsList setChannelParticipants={setChannelParticipants} />
            <InviteUser />

            <div className="channel-update_button" onClick={editChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default ChannelUpdatePage
