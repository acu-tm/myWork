import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
 
const EmailInput = ({ email = '', setEmail }) => {

    //take email imput
    const handleChange = (event) => {
        event.preventDefault();   

        setEmail(event.target.value);
    }

    return(
        <div className='invite-user__enter-email'>
            <input value={email} onChange={handleChange} placeholder="@email" />
        </div>
    )
}

const InviteUser = () => {
    const [isInviting, setIsInviting] = useState(false);

    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(''); //??
    const [context, setContext] = useState({message: 'Works!'});

    const changeState = () => {
        setIsInviting(!isInviting);
        setIsSent('');
        setEmail('')
    }

    const sendEmail = (event) => {
        event.preventDefault();

        if(email === 'andrei.cuvin00@e-uvt.ro'){          //Hardcoded Email Restriction java.coder89@gmail.com
            emailjs.send("service_wpxis3o", "template_q48engw", context, "1P6OGay__EuwMN3-i")
            .then((result) => {
                        console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            //console.log('Right');

            setIsSent('true');
            
        }else{
            /*return(
                <div className='send-email__button-wrapper'>
                    <p>Invalid email</p>
                </div>
            )*///console.log('Wrong');
            setIsSent('false');
            
        }
        
    }

    //if invite button is clicked, pop the mail input box
    if(isInviting){
        return(
            <div className="invite-user__button-wrapper">
                
                <EmailInput email={email} setEmail={setEmail} />

                {/*<p>{email}</p>*/}

                <div onClick={changeState}>
                    <p>&nbsp;Cancel</p>
                </div>

                <div> <p>&ensp;</p> </div>
                
                <div onClick={sendEmail}>
                    <p className='send-email__button-wrapper'>Send</p>
                </div>

                
                {isSent === 'false' && <div className='wrong-email-message'> <p>&emsp;Invalid email!</p> </div>}
                {isSent === 'true' && <div className='send-email-message'> <p>&emsp;Invitation sent!</p> </div>}
                
            </div> 
        )
    }

    //Invite Button
    return(
        <div className="invite-user__button-wrapper" onClick={changeState}>
             <p>Invite user</p>
        </div>
    )

    /*return(                       //TEST AREA
             //<EmailInput email={email} setEmail={setEmail} />
             <Test />
    )*/
}

export default InviteUser

