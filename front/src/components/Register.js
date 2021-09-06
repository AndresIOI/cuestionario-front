import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/user";
import { useHistory } from "react-router";
import api from "../services/api";


const Register = () => {
  const [isValidated, setIsValidated] = useState();
  const [values, setValues] = useState({
    fullName: '',
    genere: '',
    group: ''
  })
  const [groups, setGroups] = useState([])
  const  {fullName, genere, group} = values;
  const { dispatch} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await api.get('groups');
        setGroups(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getGroups();
  }, [])

  const registerPerson = (e) => {
    e.preventDefault();
    if (fullName === '' || genere === '' || group === '') {
      setIsValidated(false);
    } else {
      setIsValidated(true);

      dispatch({nombre: fullName});
      dispatch({sexo: genere});
      dispatch({grupo: group});
      history.push('/cuestionario');
    }
  }
  const handledValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({...values, [name]:value })
  }

  return (
    <RegisterWrap>
      <Form onSubmit={registerPerson} autoComplete="off">
        {isValidated === false && <Error>Completa todos tus datos</Error>}
        <FormGroup>
          <label htmlFor="fullName">Nombre Completo <span>*</span></label>
          <input type="text" name="fullName" id="fullName" onChange={handledValues} required/>
        </FormGroup>
        <FormGroup>
          <label>Sexo <span>*</span></label>
          <Genero>
            <div>
            <input type="radio" name="genere" id="male" value="male" required onChange={handledValues}/>
            <label htmlFor="male">Hombre</label>
            </div>
            <div>
            <input type="radio" name="genere" id="female" value="female" required onChange={handledValues}/>
            <label htmlFor="female">Mujer</label>
            </div>

          </Genero>
        </FormGroup>
        <FormGroup>
          <label htmlFor="group">Grupos <span>*</span></label>
          <select name="group" id="group" required onChange={handledValues}>
            <option  defaultValue>Selecciona tu grupo</option>
            {
              groups.map(group => {
                return <option value={group.id} key={group.id}>{group.name}</option>
              })
            }
          </select>
        </FormGroup>
          <button type="submit">Contestar Cuestionario</button>
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

const Genero = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div { 
    width: 45%;
  }
  & label {
    background: #e5e8ee;
    height: 50px;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
    padding: 0 10px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1F3C88;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: 20px;
  }


  & input[type="radio"]{
    display: none;
  }
  & input[type="radio"]:checked:checked ~ label {
    background: #185ADB;
    color: white;
    font-size: 18px;
  }
`;

const Error = styled.p`
padding: 15px;
background: #DF5E5E;
border: 2px solid #DF5E5E;
color: white;
border-radius: 3px;
text-align: center;
`

export default Register;
