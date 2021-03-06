import React from "react";
import styled from "styled-components";
import {routes} from "../../../routes";
import AuthenticationService from "../../../service/AuthenticationService";
import { withRouter} from 'react-router-dom';

class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
        hasLoginFailed: false,
        error: ''
    };

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }
        )
    };

    loginClicked = () => {
        const { username, password } = this.state;
        AuthenticationService
            .executeJwtAuthenticationService(username, password)
            .then(res => {
                if(res.ok) {
                    return res.headers.get('auth-token')
                }
                return res.text().then(text => {throw new Error(text)})
            })
            .then(token => {
                AuthenticationService.registerSuccessfulLoginForJwt(username, token);
                this.toHomepage();
            })
            .catch((e) => {
                this.setState({
                    ...this.state,
                    hasLoginFailed: true,
                    error: e.message
                });
            })
    };

    toHomepage = () => {
        this.props.history.push(routes.homepage)
    };

    render() {

        return (
            <Wrapper>
                {this.state.hasLoginFailed && <div>{this.state.error}</div>}
                <Input placeholder="Nazwa użytkownika" name="username" value={this.state.username} onChange={this.handleChange} />
                <Input type="password" placeholder="Hasło" name="password" value={this.state.password} onChange={this.handleChange} />
                <Button onClick={this.loginClicked}>Zaloguj</Button>
                <Button onClick={this.toHomepage}>Kontynuuj jako gość</Button>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

const Input = styled.input`
  width: 50rem;
  height: 5rem;
  margin-bottom: 1.5rem;
  background: #121212;
  border: none;
  border-bottom: 0.5rem solid #332940;
  padding: 2rem;
  color: white;
`;

const Button = styled.button`
  display: inline;
  background: none;
  border: 1px solid #332940;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  padding: 1.5rem;
  &:hover {
    background: #332940;
  }
`;

export default withRouter(LoginForm);