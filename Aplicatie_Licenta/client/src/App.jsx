import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

import Cookies from 'universal-cookie';

import 'stream-chat-react/dist/css/index.css';
import './App.css';
import './lib/generateKeyPair';

import { MenuContainer, ChatContainer, Authentification } from './components';


//create an instance of StreamChat
const apiKey = xxxxxx-xxxxxx-xxxxxx;
const client = StreamChat.getInstance(apiKey);


//Connect to app using cookies             *
const cookies = new Cookies();
const authToken = cookies.get("token");                             //*?* FOR change

if(authToken) {                                                     //*?* FOR change ??
    client.connectUser({
        id: cookies.get('employeeID'),
        name: cookies.get('employeeName'),
        department: cookies.get('department'),
        image: cookies.get('userImage'),
        hashedPassword: cookies.get('hashedPassword'),
        employeePhone: cookies.get('employeePhone'),
        //keyPair: JSON.stringify(cookies.get('keyPair')),
        publicKeyJwk: cookies.get('publicKey'),                 //encryption public
        privateKeyJwk: cookies.get('privateKey'),               //encryption private
        symmetricKeyJwk: cookies.get('symmetricKey'),
    }, authToken)
}


const App = () => {
    //main state fields
    const [channelType, setChannelType] = useState('');
    const [toggleCreationPage, setToggleCreationPage] = useState(false);
    const [toggleUpdatePage, setToggleUpdatePage] = useState(false);

    //Request user to login
    if(!authToken) {
        return <Authentification />                      
    }


    return (
        /*  The app main page is formed from 2 main components, one contains contacts and teams,
            other contains the conversation */
        <div className="all_content_wrapper">
            <Chat client={client} theme="team light">
                <MenuContainer 
                    toggleCreationPage={toggleCreationPage}
                    setToggleCreationPage={setToggleCreationPage}
                    setChannelType={setChannelType}
                    setToggleUpdatePage={setToggleUpdatePage}
                />
                <ChatContainer 
                    toggleCreationPage={toggleCreationPage}
                    setToggleCreationPage={setToggleCreationPage}
                    toggleUpdatePage={toggleUpdatePage}
                    setToggleUpdatePage={setToggleUpdatePage}
                    channelType={channelType}
                />
            </Chat>
        </div>
    );
}

export default App;
