import React from 'react';
import InputField from './inputfield';
import SubmitButton from './SubmitButton';
import Userstore from './loginDetails_Storage/Userstore';

class Loginform extends React.Component{

  constructor(props){      //props is property of object
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property,val){
    val=val.trim();
    if(val.length > 12){
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm(){
    this.setState({
      username: '',
      password: '',
      buttonDisabled: true
    })
  }

  async doLogin(){

    if(!this.state.username){
      return;
    }

    else if(!this.state.password){
      return;
    }
    
    this.setState({
      buttonDisabled: true
    })

    try {
      let chk  = await fetch('/login',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let result = await chk.json();
      if (result && result.success) {
          Userstore.isLoggedIn = true;
          Userstore.username = result.username;
        }

      else if(result && result.success === false) {
          this.resetForm();
          alert(result.msg);
        }

    }


    catch(e){
      console.log(e);
      this.resetForm();
    }
  }


  render(){
    return (
      <div className="loginform">
        <header style={{marginLeft:"90px"}}>Log in</header>
        <InputField
          type='text'
          placeholder='Username'
          value={this.state.username ? this.state.username : ''}
          onChange={(val)=> this.setInputValue('username',val)}
        />

        <InputField
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange={(val)=> this.setInputValue('password',val)}
        />

        <SubmitButton
          text = 'Login'
          disabled = {this.state.buttonDisabled}
          onClick={ ()=> this.doLogin() }
        />

      </div>
  );
}
}
export default Loginform;

