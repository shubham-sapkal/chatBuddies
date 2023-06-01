import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {

    const [form, setForm] = useState(initialState);

    const [isSignup, setIsSignup] = useState(true);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value  } );

        // console.log(form);
    }


    const switchMode = () => {
        setIsSignup( (prevIsSignup) => !prevIsSignup  ); 
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(form);

        const {userName, password, phoneNumber, avatarURL} = form;
    
    
        const URL = 'http://localhost:5000/auth';
    
    
        const { data : { token, userId, hashedPassword   }   } = await axios.post( 
            `${URL}/${ isSignup ? 'signup' : 'login' }`, 
            { userName, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('userName', userName);
        cookies.set('fullName', form.fullName);
        cookies.set('userId', userId);

        if(isSignup)
        {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();


    };

  return (
    <div className="auth__form-container">  
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p> {isSignup ? 'Sign Up' : 'Sign In'}  </p>
            
                <form onSubmit={ handleSubmit } >

                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" 
                            name="fullName" 
                            placeholder="Full Name"
                            onChange={handleChange}  
                            required/>
                        </div>
                    )}

                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="userName">User Name</label>
                        <input type="text" 
                            name="userName" 
                            placeholder="User Name"
                            onChange={handleChange}  
                            required/>
                    </div>

                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" 
                            name="phoneNumber" 
                            placeholder="Phone Number"
                            onChange={handleChange}  
                            required/>
                        </div>
                    )}


                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="avatarURL">Avatar URL</label>
                            <input type="text" 
                            name="avatarURL" 
                            placeholder="Avatar URL"
                            onChange={handleChange}  
                            required/>
                        </div>
                    )}


                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input type="password" 
                            name="password" 
                            placeholder="Password"
                            onChange={handleChange}  
                            required/>
                    </div>

                    
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm Password"
                            onChange={handleChange}  
                            required/>
                        </div>
                    )}

                    
                    <div className="auth__form-container_fields-content_button">
                        <button>
                            {isSignup ? "Sign Up" : "Sign In"}
                        </button>
                    </div>

                </form>


                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignup 
                        ?  'Already have an account?'
                        : 'Dont have an account?'
                        }

                        <span onClick={switchMode} >
                            {
                                isSignup ? 'Sign In' : 'Sign up'
                            }
                        </span>
                    </p>
                </div>

            </div>
        </div>

        <div className="auth__form-container_image">
            <img src={signinImage} alt="Sign In" />
        </div>


    </div>
  )
}

export default Auth