import React, { Component } from 'react';

class SignIn extends Component {
    
    state = {
        username: '',
        password: ''
    };

    updateUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    };

    updatePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    submitUsername = (e) => {
        e.preventDefault();
        console.log(this.state);
        if (true) {
            this.props.history.push('/home');
        }
    };

    render() {
        return (
            <div className="todo-app container formCont">
                <div className="todos">
                    <h2 className="center blue-text header">Todo<span className="comma">'</span>s</h2>
                    <form className="formSign" onSubmit={this.submitUsername}>
                        <input type="text" value={this.state.username} className="sign" placeholder="email" onChange={this.updateUsername}/><br/>
                        <input type="password" value={this.state.password} className="sign" placeholder="password" onChange={this.updatePassword}/><br/>
                        <button type="submit" className="button login" value="Clear History">Login</button>
                    </form>
                    <button type="button" className="button login" value="Clear History">SignUp</button>
                </div>
            </div>
        )
    }
}

export default SignIn;