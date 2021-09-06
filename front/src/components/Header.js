import { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../providers/user";


const Header = () => {
  const {state:{nombre}} = useContext(UserContext);

  return (
    <HeaderWrap>
      <h1>Cuestionario de la expresión, manejo y reconocimientos de emociones</h1>
      {
        nombre !== '' && <p>{nombre} </p>
      }
      
    </HeaderWrap>
  )
}

const HeaderWrap = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  
  & h1 {
    font-size: 18px;
    text-align: center;
    color: #185ADB;
    margin: 0
  }
  & p {
    display: block;
  }
`;

export default Header;
