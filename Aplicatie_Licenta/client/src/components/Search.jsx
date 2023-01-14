import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

import { ResultsAsList } from './'
import { SearchIcon } from '../resources';

const Search = ({ setAndroidMode }) => {   
    const { client, setActiveChannel } = useChatContext();

    const [isSearching, setIsSearching] = useState(false);
    const [textForSearch, setTextForSearch] = useState('');

    const [teamChatList, setTeamChatList] = useState([]);
    const [userChatList, setUserChatList] = useState([]);

    useEffect(() => {
        if(!textForSearch) {
            setTeamChatList([]);
            setUserChatList([]);
        }
    }, [textForSearch])

    const searchLogic = async (event) => {
        //Prevent browser to reload page on seartch
        event.preventDefault();

        //set searching status
        setIsSearching(true);
        //get the value of what user type on search
        setTextForSearch(event.target.value);
        //obtain the chat channels from database
        try {  //fetch searched channels or users(contacts)                  
            const teamChatResults = client.queryChannels({
                type: 'team',                                   
                name: { $autocomplete: event.target.value }, 
                members: { $in: [client.userID]}
            });
            const userChatResults = client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: event.target.value }
            })

            //start both request at the same time 
            const [channels, { users }] = await Promise.all([teamChatResults, userChatResults]);

            if(channels.length) {
                setTeamChatList(channels);
            } 
            if(users.length) {
                setUserChatList(users);
            } 
        } catch (error) {
            setTextForSearch('');
        }
    }

    const setChannel = (channel) => {       
        setTextForSearch('');
        setActiveChannel(channel);
    }

    return (
        //Set the styles of search box
        <div className="search_container">
            <div className="search_field">
                <div className="search_field-image">
                    <SearchIcon />
                </div>
                <input 
                    className="search_field-text" 
                    placeholder="Search" 
                    type="text" 
                    value={textForSearch}  
                    onChange={searchLogic}
                />
            </div>
            { textForSearch && (//if exists some text for search...
                <ResultsAsList                      
                    teamChatList={teamChatList}
                    userChatList={userChatList}
                    isSearching={isSearching}
                    setChannel={setChannel}         
                    setTextForSearch={setTextForSearch}
                    setAndroidMode={setAndroidMode}
                />
            )}
        </div>
    )
}

export default Search
