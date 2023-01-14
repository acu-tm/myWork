import React from 'react';
import { AddChannel } from '../resources';
                            /*Using stream default component ChannelList properties in our custom component*/
const CustomChannelOrganizer = ({ setAndroidMode, children, error = false, loading, type, toggleCreationPage, setToggleCreationPage, setChannelType, setToggleUpdatePage }) => {
    //handle loading process message                *
    if(loading) {
        return (                                                                  
            <div className="custom_organizer">
                <p className="custom_organizer_notification loading">
                    {type === 'team' ? 'Team Channels' : 'Users Messages'} is loading...     
                </p>
            </div>
        )
    }

    //handle posible errors
    if(error) {
        return type === 'team' ? (                                            
            <div className="custom_organizer">
                <p className="custom_organizer_notification">
                    An error appear, please try again later!
                </p>
            </div>
        ) : null
    }

    //Display our lists ...         *
    return (                                                                      
        <div className="custom_organizer">
            <div className="custom_organizer_title">
                <p className="custom_organizer_title_text">
                    {type === 'team' ? 'Team Channels' : 'Users Messages'}
                </p>
                <AddChannel    //Button to add the channel         
                    toggleCreationPage={toggleCreationPage}
                    setToggleCreationPage={setToggleCreationPage}
                    setChannelType={setChannelType}
                    setToggleUpdatePage={setToggleUpdatePage}
                    type={type === 'team' ? 'team' : 'messaging'}       
                    setAndroidMode={setAndroidMode}
                />
            </div>
            {children}
        </div>
    )
}

export default CustomChannelOrganizer
