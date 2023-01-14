import React, { useState } from 'react';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {    

    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-creation_input-field">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
            <p>{channelName}</p>
        </div>
    )
}

const Test = () => {
    const [channelName, setChannelName] = useState('');

    return (
        <div className="channel-creation_wrapper">
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
            <p>{channelName}</p>
        </div>
    )
}

export default Test

