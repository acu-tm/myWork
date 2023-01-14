//Authentification

import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

//import generateKeyPair from '../lib/generateKeyPair';
import signinImage from '../resources/signup_g.jpg';

const cookies = new Cookies();

//set the form fields value initial state
const blankForm = {                       
    employeeName: '',
    department: '',
    password: '',
    confirmPassword: '',
    employeePhone: '',
    userImage: '',
    //publicKeyJWT: '',                 //encryption public
    //privateKeyJWT: '',               //encryption private
}

const Authentification = () => {
    const [form, setForm] = useState(blankForm);
    const [createingNew, isCreateingNew] = useState(false);
    //const [keyPair, setKeyPair] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {                                                 
        e.preventDefault();

        console.log(form);

        //pass data to backend
        const { employeeName, password, employeePhone, userImage } = form;

        if(createingNew){
            const { data: { token, employeeID, hashedPassword, department } } = await axios.post(`${'http://localhost:5000/auth'}/${'signup'}`, {
                employeeName, password, department: form.department, employeePhone, userImage,
            });

            cookies.set('token', token);
            cookies.set('employeeName', employeeName);
            cookies.set('department', department);
            cookies.set('employeeID', employeeID);

            cookies.set('employeePhone', employeePhone);
            cookies.set('userImage', userImage);
            cookies.set('hashedPassword', hashedPassword);

            //setKeyPair(await generateKeyPair());                        //encryption
            const keyPair = await window.crypto.subtle.generateKey(
                {
                  name: "ECDH",
                  namedCurve: "P-256",
                },
                true,
                ["deriveKey", "deriveBits"]
              );
              const publicKeyJwk = await window.crypto.subtle.exportKey(
                "jwk",
                keyPair.publicKey
              );
              const privateKeyJwk = await window.crypto.subtle.exportKey(
                "jwk",
                keyPair.privateKey
              );
            console.log(keyPair);

            //generate symmetric key
            const symmKey = await window.crypto.subtle.generateKey(
                {name:"AES-CTR", length: 256},
                true,
                ["encrypt", "decrypt"]
            );

            const symmKeyJwk = await window.crypto.subtle.exportKey(
                "jwk",
                symmKey
            );
            //end generate symmetric key

            cookies.set('publicKey', JSON.stringify(publicKeyJwk));
            cookies.set('privateKey', JSON.stringify(privateKeyJwk));
            cookies.set('symmetricKey', JSON.stringify(symmKeyJwk));
        }
        else{
            const { data: { token, employeeID, department } } = await axios.post(`${'http://localhost:5000/auth'}/${'login'}`, {employeeName, password});
    
            cookies.set('token', token);
            cookies.set('employeeName', employeeName);
            cookies.set('department', department);
            cookies.set('employeeID', employeeID);
        }

        window.location.reload();
    }

    //define a function to switch between signin and signup
    const changeForm = () => {
        isCreateingNew((prevState) => !prevState);
    }

    return (
        <div className='login-page_wrapper'>

            <div className='login-page_img-part'>
                <img className='login-page_img' src={signinImage} alt="sign in" />
            </div>

            <div className='login-page_form-part'>
                <div className='login-page_form-fields'>
                    <p>{createingNew ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {createingNew && (
                            <>
                                <div className='login-page_form-input'>
                                    <label htmlFor="employeeName">Employee Name</label>
                                    <input 
                                        name="employeeName" 
                                        type="text"
                                        placeholder="Employee Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='login-page_form-input'>
                                    <label htmlFor="department">Department</label>
                                    <input 
                                        name="department" 
                                        type="text"
                                        placeholder="Full Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='login-page_form-input'>
                                    <label htmlFor="employeePhone">Phone</label>
                                    <input 
                                        name="employeePhone" 
                                        type="text"
                                        placeholder="Phone"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='login-page_form-input'>
                                    <label htmlFor="userImage">User Image</label>
                                    <input 
                                        name="userImage" 
                                        type="text"
                                        placeholder="User Image"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='login-page_form-input'>
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        name="password" 
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='login-page_form-input'>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input 
                                        name="confirmPassword" 
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {!createingNew &&(
                            <>
                                <div className='login-page_form-input'>
                                    <label htmlFor="employeeName">Employee Name</label>
                                    <input 
                                        name="employeeName" 
                                        type="text"
                                        placeholder="Employee Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className='login-page_form-input'>
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        name="password" 
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className='login-page_button'>
                            <button>{createingNew ? "Sign Up" : "Sign In"}</button>
                        </div>

                    </form>

                    <div className='login-page_switch-form'>
                        <p>
                            {createingNew ? "Already have an account?" : "Don't have an account?"}
                            <span onClick={changeForm}>
                                {createingNew ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Authentification