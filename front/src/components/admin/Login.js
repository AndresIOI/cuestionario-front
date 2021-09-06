import { useState } from 'react';
import styled from 'styled-components';

import api from '../../services/api';
import { useAuth } from '../../providers/auth';
import Cookies from 'js-cookie';
import { useHistory, useLocation } from 'react-router';

const Login = () => {

  const [isValidated, setIsValidated] = useState();
  const { setUser, setGroup } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const registerPerson = async (e) => {
    e.preventDefault();

    await api.post('/login', {
      'email': e.target[0].value,
      'password': e.target[1].value
    }).then(async (response) => {
      Cookies.set('token', response.data.token.original.access_token, { expires: 1 });
      api.defaults.headers.authorization = `Bearer ${response.data.token.original.access_token}`;
      setUser(response.data.user);
      setIsValidated(true);
      if(location.pathname === '/login'){
        history.push('/dashboard')
      }

    }).catch(error => {
      setIsValidated(false);
      console.log(error);
    })
  }

  const handledValues = () => {

  }


  return (
    <RegisterWrap>
      <h2>Sistema Admin</h2>
      <Form onSubmit={registerPerson} autoComplete="off">
        {isValidated === false && <Error>Su correo electronico o contraseña son incorrectos</Error>}
        <FormGroup>
          <label htmlFor="fullName">Correo Electronico</label>
          <input type="email" name="email" id="email" onChange={handledValues} required/>
        </FormGroup>

        <FormGroup>
          <label htmlFor="fullName">Contraseña</label>
          <input type="password" name="password" id="password" onChange={handledValues} required/>
        </FormGroup>

          <button type="submit">Iniciar Sesión</button>
      </Form>
    </RegisterWrap>
  );
};
const RegisterWrap = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  width: 500px;

  & button {
    background: #185ADB;
    color: white;
    font-size: 18px;
    height: 50px;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
    padding: 0 10px;
    border: none;
  }
`;

const FormGroup = styled.div`
  margin: 40px 0;
  & input[type="text"],
  select {
    display: block;
  }
  & label {
    font-size: 16px;
    padding-bottom: 10px;
    color: black;
    & span {
      font-size: 12px;
      color: gray;
    }
  }
  & input, select {
    margin: 15px 0;
    padding: 15px 10px;
    width: 100%;
    outline: none;
    border: 1px solid #bbb;
    border-radius: 3px;
    display: inline-block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -ms-transition: 0.2s ease all;
    -o-transition: 0.2s ease all;
    transition: 0.2s ease all;
  }

`;


const Error = styled.p`
padding: 15px;
background: #DF5E5E;
border: 2px solid #DF5E5E;
color: white;
border-radius: 3px;
text-align:
`

export default Login
