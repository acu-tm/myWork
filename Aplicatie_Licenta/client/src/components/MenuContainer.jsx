import React, { useState } from 'react';
import { Avatar, ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

//import the components neded for sidebar functions
import { Search, CustomChannelOrganizer, ChannelItemName } from './';
import logo from '../resources/logoChat.png'
import LogoutIcon from '../resources/logout.png'

const cookies = new Cookies();

//Create a  functional component for sidebar
const MenuTools = ({ client, logout_function }) => (
    <div className="menu_toolbar">
        <div className="menu_toolbar-image1">
            <div className="image1">
            <img src={logo} alt="logo" width="30" />
            </div>
        </div>
        <div className="menu_toolbar-image1">
            <div className="image1">
            &nbsp;&nbsp;<Avatar image={client.user.image} name={client.user.name} size={45} />
            </div>
        </div>
        <div className="menu_toolbar-image2">
            <div className="image2" onClick={logout_function}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

//Filter team channels function
const chatGroupFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}
//Filter messages function
const userChatFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const MenuContainerInner = ({ toggleCreationPage, setToggleCreationPage, setChannelType, setToggleUpdatePage, setAndroidMode }) => {
    const { client } = useChatContext();    //useChatContext
    const filters = { members: { $in: [client.userID] } };//get all messages and channels where our user is included

    const logout_function = () => {
        cookies.remove("token");
        cookies.remove('employeeID');
        cookies.remove('employeeName');
        cookies.remove('department');
        cookies.remove('userImage');
        cookies.remove('hashedPassword');
        cookies.remove('employeePhone');
        cookies.remove('publicKey');
        cookies.remove('privateKey');
        cookies.remove('symmetricKey');

        window.location.reload();
    }

    return (
        //Channel list structure
        <>
            <MenuTools client={client} logout_function={logout_function} />
            <div className="menu_content-container">
                <div className="menu_title">
                    <p>CHAT APP</p>
                </div>
                <Search setAndroidMode={setAndroidMode} />
                <ChannelList        //Channel list for GROUP MESSAGES
                    //Call ChannelList component from !'stream-chat-react'! who accepts some Props      *
                    //use 'filters' object 
                    filters={filters}
                    channelRenderFilterFn={chatGroupFilter}
                    //Override Stream default component to render a coustom list
                    List={(listProps) => (
                    /*  Render the custom component CustomChannelOrganizer,
                        using stream default component (ChannelList) listProps   */
                        <CustomChannelOrganizer 
                            {...listProps}
                            type="team"
                            toggleCreationPage={toggleCreationPage}
                            setToggleCreationPage={setToggleCreationPage}
                            setChannelType={setChannelType} 
                            setToggleUpdatePage={setToggleUpdatePage}
                            setAndroidMode={setAndroidMode}
                        />
                    )}
                    //Give the necessary props to ChannelItemName
                    Preview={(previewProps) => (
                        <ChannelItemName 
                            {...previewProps}
                            setToggleCreationPage={setToggleCreationPage}
                            setToggleUpdatePage={setToggleUpdatePage}
                            setAndroidMode={setAndroidMode}
                            type="team"
                        />
                    )}
                />
                <ChannelList        //Channel list for DIRECT MESSAGES
                    filters={filters}
                    channelRenderFilterFn={userChatFilter}
                    List={(listProps) => (
                        <CustomChannelOrganizer 
                            {...listProps}
                            type="messaging"
                            toggleCreationPage={toggleCreationPage}
                            setToggleCreationPage={setToggleCreationPage}
                            setChannelType={setChannelType} 
                            setToggleUpdatePage={setToggleUpdatePage}
                            setAndroidMode={setAndroidMode}
                        />
                    )}
                    Preview={(previewProps) => (
                        <ChannelItemName 
                            {...previewProps}
                            setToggleCreationPage={setToggleCreationPage}
                            setToggleUpdatePage={setToggleUpdatePage}
                            setAndroidMode={setAndroidMode}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

const MenuContainer = ({ setChannelType, setToggleCreationPage, setToggleUpdatePage }) => {
    const [androidMode, setAndroidMode] = useState(false);//for mobile devices -experimental-

    return (
        <>
            <div className="menu_container">
              <MenuContainerInner 
                setToggleCreationPage={setToggleCreationPage} 
                setChannelType={setChannelType} 
                setToggleUpdatePage={setToggleUpdatePage} 
                setAndroidMode={setAndroidMode}
              />
            </div>

            <div className="menu_mobile-interface_experimental"
                style={{ left: androidMode ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="menu_switch_experimental" onClick={() => setAndroidMode((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <MenuContainerInner 
                setToggleCreationPage={setToggleCreationPage} 
                setChannelType={setChannelType} 
                setToggleUpdatePage={setToggleUpdatePage}
                setAndroidMode={setAndroidMode}
              />
            </div>
        </>
    )

}

export default MenuContainer;
