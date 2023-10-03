import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from 'react-icons/fa';

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
        // console.log(email,password);
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
      
        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>
            {
                console.log("user created");
                console.log(result);
                console.log(result.user);
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
        
         </div>
        
        </div>
    );
};

export default Register;