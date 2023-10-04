import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
    const [show,setShow]=useState (false);
    const [registerError,setRegisterError]=useState('');
    const [success,setSuccess]=useState('');
    const handleRegister=e=>
    {
        e.preventDefault();
        // console.log("register");
        // console.log(e);
        const email=e.target.email.value;
        const password=e.target.password.value;
        const acceptTerms=e.target.terms.checked;
        const name=e.target.name.value;
        console.log(name,email,password);
          // error reset
          setRegisterError('');
          setSuccess('');
        // validation client side
        if(password.length<6)
        {
            setRegisterError("password should be at least 6 characters");
            return;
        }
        // regex(regular expression) validation
        else if(!/[A-Z]/.test(password))
        {
            setRegisterError("password should contain at least one uppercase letter");
            return;
        }
        else if(acceptTerms===false)
        {
            setRegisterError("please accept terms and conditions");
            return;
        }
      
        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>
            {
                console.log("user created");
                console.log(result);
                console.log(result.user);

                // update profile
                updateProfile(result.user,
                    {
                        displayName:name,
                        photoURL: "https://example.com/jane-q-user/profile.jpg"
                    }
                    )
                .then(()=>{
                    console.log("profile updated");
                })
                .catch(error=>{
                    console.log(error);
                })





                // send verification mail
                sendEmailVerification(result.user)
                .then(()=>{
                   alert("verification mail sent");

                })
                setSuccess("user created successfully");
            }
            )
        .catch(error=>{
            console.log(error);
            setRegisterError(error.message);
        })

    }

    return (
        <div className="">
         <div className="mx-auto md:w-1/2">
         <h1 className="text-3xl mb-8">Registration page</h1>
            
        <form onSubmit={handleRegister}>

            <input 
            placeholder="Email Address"
            className="mb-4 w-full py-2 px-4" type="email" id="" name="email"
            required
            
            />

            <br />
            <input 
            placeholder="Your Name"
            className="mb-4 w-full py-2 px-4"
             type="text" id="" name="name"
            required
            
            />
            <br />
           
            <div className="relative mb-4 border">
            <input 
            placeholder="Password"
            required
            className="
            py-2 px-4
            w-full"
            type={show? "text": "password"} id="" name="password" />
            <span className="absolute top-1/2
            right-2 transform -translate-y-1/2 
              cursor-pointer   " onClick={()=>setShow(!show)} >
                {
                    show? <FaEyeSlash/>:<FaEye/>
                }
                
            </span>
            <br />
            </div>
           <br/>
           <input type="checkbox" name="terms" id="terms"/>
              <label htmlFor="terms">I agree to the terms and conditions</label>
                <br/>
            <br/>
            <input
            className=" btn btn-secondary mb-4 w-full"
             type="submit" value="register" />
        </form>

        {
           registerError &&<p className="text-red-500">{registerError}</p>
        }
        {
            success && <p className="text-green-500">{success}</p>
        }
         <p>Already have an account??<Link
         to="/login">
         please go to the login page
         </Link>  </p>
        
         </div>

        
        
        </div>
    );
};

export default Register;