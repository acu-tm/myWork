import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../resources';

const ListItem = ({ user, setChannelParticipants }) => { 
    const [mark, setMark] = useState(false);

    const selectUser = () => {
        if(mark) {
            setChannelParticipants((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setChannelParticipants((prevUsers) => [...prevUsers, user.id])
        }

        setMark((prevSelected) => !prevSelected)
    }

    return (
        <div className="single-participant_container" onClick={selectUser}>
            <div className="single-participant_element">
                <Avatar image={user.image} name={user.name || user.id} size={32} />
                <p className="single-participant_user-name">{user.name || user.id}</p>
            </div>
            {mark ? <InviteIcon /> : <div className="single-participant_no-users" />}
        </div>
    )
}

//get the user list
const ParticipantsList = ({ setChannelParticipants }) => { 
    const {client} = useChatContext();

    const [userList, setUserList] = useState([]);
    const [noUsersFound, setNoUsersFound] = useState(false);
    

    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if(isMounted === true) 
                return null;

            setIsMounted(true);
            
            try {
                                                                    // exclude current user from list
                const querryUsersRESULT = await client.queryUsers( {id:{ $ne: client.userID }}, {id: 1}, {limit: 10} );
                if(querryUsersRESULT.users.length) {
                    setUserList(querryUsersRESULT.users);
                }
                else
                {
                    setNoUsersFound(true);
                }

            }catch(error){
               setError(true);
            }

            setIsMounted(false);
        }

        if(client)
            fetchUsers();

    }, []);

    //no users in database
    if(noUsersFound === true) {
        return (
            <div className="participants-list_container">
                <div className="participants-list_title">
                    <p>Employee Name</p>
                    <p>Add</p>
                </div>

                <div className="participants-list_text">
                    There are no users yet.
                </div>
            </div>
                
        )
    }

    //handle get user list error
    if(error === true) {
        return (
            <div className="participants-list_container">
                <div className="participants-list_title">
                    <p>Employee Name</p>
                    <p>Add</p>
                </div>

                <div className="participants-list_text">
                     An error ocurred, please try again later.
                </div>
            </div>
                
        )
    }

    //ParticipantsList layout
    return (
        <div className="participants-list_container">
            <div className="participants-list_title">
                <p>Employee Name</p>
                <p>Add</p>
            </div>

            {isMounted 
            ? 
            <div className="participants-list_text">
                Loading users...
            </div> 
            : 
            (  userList?.map((user, i) => (<ListItem index={i} key={user.id} user={user} setChannelParticipants={setChannelParticipants} />))       )
            }
        </div>
            
    )
}

export default ParticipantsList;