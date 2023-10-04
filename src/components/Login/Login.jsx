import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [success,setSuccess]=useState('');
    const [error,setError]=useState('');
    const[sendmail,setSendmail]=useState('');
    const EmailRef=useRef(null);
    const handleLogin=e=>
    {
        e.preventDefault();
        console.log("login");
        console.log(e);
        const email=e.target.email.value;
        const password=e.target.password.value;
        console.log(email,password);
        // error reset
        setError('');
        setSuccess('');
       
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            if(userCredential.user.emailVerified)
            {
              setSuccess("user logged in successfully");
            }
            else
            {
              setError("please verify your email");
            }
           
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            setError('user not found');
          });

        


    }
    const handlePass=()=>
    {
        const email=EmailRef.current.value;
        if(!email)
        {
            console.log("please provide an email",EmailRef.current.value);
            return;
            
        }
        else if(!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email))
            {
            
                console.log("invalid email address ");
                return;
                
            }
            sendPasswordResetEmail(auth, email)
            .then(() => {
              // Password reset email sent!
              // ..

                setSendmail("password reset email sent");
                
                alert("password reset email sent");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
      
        

    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin}
      className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email"
           type="email"
              ref={EmailRef}
            placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a onClick={handlePass}href="#" className="label-text-alt link link-hover">Forgot password?</a>
            
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        
      </form>
      {
            success && <p className="text-green-500">{success}</p>
        }
        {
            error && <p className="text-red-500">{error}</p>
        }
        <p>New to this website?Please <Link
        to="/register">Register
         </Link></p>
    </div>
  </div>
</div>
    );
};

export default Login;