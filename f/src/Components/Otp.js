import React, {useState} from 'react';
// import img from './images/login.jpg';
// import {AiOutlineMail} from 'react-icons/ai';

import Swal from "sweetalert2";  
// import {FiUserPlus} from 'react-icons/fi';
// import {RiLockPasswordLine,RiLockPasswordFill} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';
import './Otp.css'


// import img1 from './images/loginman.png';

// import './Login.css';

export default function Login() {
 

  const history = useNavigate();


const [user, setUserid] = useState({
  otp:""
});

let name, value;
const handleInputs = (e) => {

  console.log(e);
  name = e.target.name;
  value = e.target.value;

  setUserid({...user, [name]:value});
  

}


const PostData = async (e) => {
    e.preventDefault();
    const { otp} = user;

    
      const res = await fetch("/otp_validator", {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          otp
        })
      });
  
      const data = await res.json();
  
      if(res.status === 422 || !data){
       // window.alert("Invalid Registration");
       Swal.fire({  
        title: "Invalid OTP",
        icon: "warning",
        confirmButtonText: "OK",
        timer: 2000
      });  
        console.log("Invalid Registration");
      }
      else{
        Swal.fire({  
          title: "Successful",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000
        });  
        
        console.log("Successfull");
  
        history ("/login");
  
      }
    
    
}

// const resetform = async (e) => {
//   e.preventDefault();
//   setUserid({  otp:"" });
// }
  return (
    <div className='otp-box'>
      <div className="container">
       
        <div className="row justify-content-center">
            <div className="col-sm-8 col-sm-offset-2 form-box">
            <h1>Validate OTP</h1>
            <div className='form-top'>
              <h5>A verification code will be send to the email address you provide:</h5>
              </div>
            </div>
      </div>
                {/* <div className="form-top">
                  <div className="form-top-left">
                      <h3>Blood Bank Login : Portal</h3>
                  <p>Enter your username and password to login on:</p>
                  </div>
                  
                </div>   */}
          <div className="row justify-content-center">
          <div className="col-sm-5 col-sm-offset-2 form-box">
            <div className="form-bottom">
                 <form onSubmit={PostData} method="POST">
                 <div className="form-group row">
                 <input type="text" className="form-control" placeholder="Enter OTP"
                  name="otp"
                  value={user.otp}
              required onChange={handleInputs}/>
                 </div>
                 <center>
                 <button type="submit" className="btn-default">Login</button></center>
           

         
       </form>
       </div>
      </div> 
      </div>
    </div>
    </div>
  )
}
