//Message component (displays one message)
import React, {Children, useEffect, useState} from 'react';
import { useChatContext, MessageSimple, MessageTeam, useMessageContext } from 'stream-chat-react';

const DecryptedMessageList = ({props, i}) => {
//export default props => {

    const { channel } = useChatContext();
    //const [thisMessage, setThisMessage] = useState(props.message);
    //console.log(thisMessage);
    //console.log(i);

    //const { message } = useMessageContext();
    //const [thisMessage, setThisMessage] = useState(props.message);
    const thisMessage = props.message;
    const [messObj, setmessObj] = useState(null);

    //decrypt message function
    const decryptMessage = async (text) => {
        const symmKeyJwk = JSON.parse(channel.data.channelKey);
        //const symmKeyJwk = key;
        //const onelog = channel?.data?.channelKey;
        //console.log(channel.data.channelKey);

        console.log("*DECRIPTION...*");

        const symmKey = await window.crypto.subtle.importKey(
        "jwk",
        symmKeyJwk,
        {name:"AES-CTR", length: 256},
        true,
        ["encrypt", "decrypt"]
        );

        try{
            const string = atob(text);
             console.log("Text: ", text);
            const uintArray = new Uint8Array(
                [...string].map((char) => char.charCodeAt(0))
            );

            const decryptedData = await window.crypto.subtle.decrypt(
                {name: "AES-CTR", counter: new Uint8Array(16), length: 16*8},
                symmKey,
                uintArray
            );

            const messageText = new TextDecoder().decode(decryptedData);

            console.log("Message Text: ", messageText);
            return messageText;

        }catch (e) {
        return `error decrypting message: ${e}`;
      }
  }
  //END decrypt message function

  useEffect (() => {
    let isMounted = true;

    //if(isMounted){
    const op = async () => {
        
            console.log(isMounted);
            const result = await decryptMessage(props.message.text);

            return result;
            /*setThisMessage({
             ...thisMessage,
            text: await decryptMessage(props.message.text)
        })*/
        //console.log("before: ", message.text);
        //message.text = await decryptMessage(message.text);
        //console.log("after: ", message.text);
    }

    op().then((result) => {
        if(isMounted){
           thisMessage.text = result;
           console.log("RESULT:", result);
        }

        console.log("thisMessage After:", thisMessage.text);
        
    });

    return () => { 
        isMounted = false;
        setmessObj(thisMessage);
    };

}, [props]);
console.log("thisMessage OutSide:", thisMessage.text);
//console.log("messOBJ: ", messObj.text); -eroare interesanta

    //<MessageSimple {...thisMessage } />
    return (
        <MessageTeam key={i} {...messObj}/>
    )
}

export default DecryptedMessageList