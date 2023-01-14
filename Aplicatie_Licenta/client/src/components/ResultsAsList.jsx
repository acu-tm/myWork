import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

//render a Seartch Result 
const Results = ({ channel, channelType, setChannel, selectedChannel, setAndroidMode }) => { 
  const { client, setActiveChannel } = useChatContext();

  if (channelType === 'team-channels') {
    return (
      <div
        onClick={() => {  if(setAndroidMode) {  setAndroidMode((prevState) => !prevState); }  setChannel(channel);}}
        className={
                    selectedChannel === channel.id 
                      ? "results_marked-item" 
                      : "results_item"
                  }
      >
        <div className="results_channel-marker">#</div>
        <p className="results_text">{channel.data.name}</p>
      </div>
    );
  }
  if(channelType === 'users'){
    return (
      <div
        onClick={async () => {
          const [userChatExists] = await client.queryChannels(
            {
              type: 'messaging', 
              member_count: 2 || 3,
              members: { $eq: [client.user.id, client.userID] },
            }
          );

          if(setAndroidMode) {  setAndroidMode((prevState) => !prevState);  }
    
          if (userChatExists){
            return setActiveChannel(userChatExists);
          }else{
            const newUserChat = client.channel('messaging', { members: [channel.id, client.userID] });
            setChannel(newUserChat);
            return setActiveChannel(newUserChat);
          }
        }
        }
        className={
                    selectedChannel === channel.id 
                      ? "results_marked-item"
                      : "results_item"
                  }
      >
        <div className="results_user">
          <Avatar image={channel.image} name={channel.name} size={25} />
          <p className="results_text">{channel.name}</p>
        </div>
      </div>
  );
  };
}

  

const ResultsAsList = ({ teamChatList, userChatList, selectedChannel, isSearching, setChannel, setAndroidMode }) => {     

  return (                                                              
    <div className="results_result-list">
      <p className="results_list-title">Team Channels</p>
      {isSearching && !teamChatList.length && (
        <p className="results_list-title">
          <i>Loading...</i>
        </p>
      )}
      {!isSearching && !teamChatList.length ? (
        <p className="results_list-title">
          <i>No channels found</i>
        </p>
      ) : (
        teamChatList?.map((channel, i) => (
          <Results
            channel={channel}
            channelType='team-channels'
            setChannel={setChannel}
            selectedChannel={selectedChannel}
            setAndroidMode={setAndroidMode}
            key={i}
          />
        ))
      )}
      <p className="results_list-title">Users</p>
      {isSearching && !userChatList.length && (
        <p className="results_list-title">
          <i>Loading...</i>
        </p>
      )}
      {!isSearching && !userChatList.length ? (
        <p className="results_no-message">
          <i>No direct messages found</i>
        </p>
      ) : (
        userChatList?.map((channel, i) => (
          <Results
            channel={channel}
            channelType='users'
            setChannel={setChannel}
            selectedChannel={selectedChannel}
            setAndroidMode={setAndroidMode}
            key={i}
          />
        ))
      )}
    </div>
  );
};

export default ResultsAsList;