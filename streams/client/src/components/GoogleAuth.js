import React from 'react';

import {connect} from 'react-redux'
import {signIn, signOut} from "../actions"


class GoogleAuth extends React.Component {

    state = {isSignedIn: null};

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: "27180375086-9bbt53sf5580k6d16l5t1kd7g7ep0fag.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className='ui red google button'>
                    <i className='google icon' />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className='ui red google button'>
                    <i className='google icon' />
                    Sign in with Google
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);