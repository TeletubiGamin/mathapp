import React, { useState} from 'react';
import { Link, Navigate  } from "react-router-dom";


const Signin = ({ updateUser, user}) => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [status, updateStatus] = useState("")

  const submitSignin = (e) => {
  if(!email||!password){ updateStatus(["signin","emt_fail"])}

  e.preventDefault();
    fetch('https://matematikasuzdevumiapi.herokuapp.com/signin', {
      method: 'post',
      headers : {'Content-type' : 'application/json'},
        body : JSON.stringify({
          email: email,
          password: password
        })
    })
    .then(response => response.json())
    .then(res=> {
      if(res.email){
        updateUser(res);

      }
      if(res==="fail"){
        updateStatus(["signin","cr_fail"])
      }
    })
    .catch(err=>console.log(err))
  }
  return (
    <main className="pa4 black-80">
      <form className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
              onChange={(e)=> updateEmail(e.target.value)}
              autoComplete="on"
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-blue" type="email" name="email-address"  id="email-address"></input>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input 
              onChange={(e)=> updatePassword(e.target.value)}
              autoComplete="on"
             className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-blue" type="password" name="password"  id="password"></input>
          </div>
          <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"></input> Remember me</label>
        </fieldset>
        <div className="">
          <Link
           
           className="w-30 mt3 link b ph3 pv2 input-reset black tc ba b--black bg-transparent grow pointer f6 dib"
           onClick={submitSignin}
           
           >Sign in</Link>
           {user.email && (
          <Navigate to="/home" replace={true} />
        )}
        </div>
        <div className="">
        <Link
           className="w-30 mt3 link b ph3 pv2 input-reset black tc ba b--black bg-transparent grow pointer f6 dib"
           to="/register"
           >Register</Link>
        </div>
        <div className="">
          <Link 
          to="home"
           onClick={()=>
            updateUser("janka")
           }
           className="w-30 mt3 link b ph3 pv2 input-reset black tc ba b--black bg-transparent grow pointer f6 dib" 
           >Anonīms</Link>
        </div>
        <div className="lh-copy mt3">
          <div  className="pv2 f6 link dim black db">Forgot your password?</div>
        </div>
        {
        status[1]==="success" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">Reģistrācija notikusi veiksmīgi</label >
          </div>
        }
        {
        status[1]==="cr_fail" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">Epasta adrese neeksistē vai arī parole nesakrīt</label >
          </div>
        }
        {
        status[1]==="emt_fail" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">Visi lauki nav aizpildīti</label >
          </div>
        }
      </form>
    </main>
  )
}


export default Signin