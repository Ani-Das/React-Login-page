import React from 'react';
import { observer } from 'mobx-react'
import Loginform from './Loginform';
import SubmitButton from './SubmitButton';
import Userstore from './loginDetails_Storage/Userstore';
import './App.css';

class App extends React.Component{

  async componentDidMount(){

    try{
      let chk =  await fetch('/isLoggedin', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      
      });
      let result  = await chk.jason();

      if(result && result.success){
        Userstore.loading = false;
        Userstore.isLogin = true;
        Userstore.username = result.username;
      }

      else{
        Userstore.loading = false;
        Userstore.isLogin = false;
      }

    }


    catch(e){
      Userstore.loading = false;
      Userstore.isLogin = false;
    }
  }

  async doLogout(){

    try{
      let chk =  await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      
      });
      let result  = await chk.jason();

      if(result && result.success){
        Userstore.isLogin = false;
        Userstore.username = '';
      }
      
    }


    catch(e){
      console.log(e);
    }
  }



  render(){

    if(Userstore.loading){
      return(
        <div className="app">
          <div className="container">

          Loading please wait...

          </div>
        </div>
      );
      }


    else{

      if(Userstore.isLogin){
        return(
          <div className="app">
            <div className="container">
  
            Welcome {Userstore.username}

            <SubmitButton
            text ={'Log Out'}
            disabled={'false'}
            onClick={ ()=> this.doLogout() }
            />
  
            </div>
          </div>
        );
      }

      else{  
        return(
          <div className="app">
            <div className="container">
              <div className="grid-container2"> 
              <Loginform
              />

              </div>
            </div>
          </div>
        );
      }

    }
  
    
  }
}
  
export default observer(App);
