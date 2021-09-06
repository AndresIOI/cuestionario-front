import { useState, useEffect } from "react";
import styled from "styled-components";





const MessagesResult = ({genere, atencion_sentimientos, claridad_emocional, reparacion_emociones, nombre, lugar}) => {
  const [messageA, setMessageA] = useState("")
  const [messageC, setMessageC] = useState("")
  const [messageR, setMessageR] = useState("")
  useEffect(() => {
    if(genere === 'male') {
      getMessageMale(atencion_sentimientos, claridad_emocional, reparacion_emociones);
      } else if (genere === 'female') {
        getMessageFemale(atencion_sentimientos, claridad_emocional, reparacion_emociones)
    }
  }, [])

  const getMessageMale = (atencion, claridad, reparacion) => {
    if(atencion <= 21) {
      setMessageA("Debe mejorar su atención: presta poca atención");
    } else if(atencion >= 22 && atencion <= 32 ) {
      setMessageA("Adecuada atención")
    } else if (atencion >= 33) {
      setMessageA("Debe mejorar su atención: presta demasiada atención")
    }

    if(claridad <= 25) {
      setMessageC("Debe mejorar su claridad emocional");
    } else if(claridad >= 26 && claridad <= 35 ) {
      setMessageC("Adecuada claridad emocional")
    } else if (claridad >= 36) {
      setMessageC("Excelente claridad emocional")
    }

    if(reparacion <= 23) {
      setMessageR("Debe mejorar su reparación de las emociones");
    } else if(reparacion >= 24 && reparacion <= 35 ) {
      setMessageR("Adecuada reparación de las emociones")
    } else if (reparacion >= 36) {
      setMessageR("Excelente reparación de las emociones")
    }
  }
  const getMessageFemale = (atencion, claridad, reparacion) => {
    if(atencion <= 24) {
      setMessageA("Debe mejorar su atención: presta poca atención");
    } else if(atencion >= 25 && atencion <= 35 ) {
      setMessageA("Adecuada atención")
    } else if (atencion >= 36) {
      setMessageA("Debe mejorar su atención: presta demasiada atención")
    }

    if(claridad <= 23) {
      setMessageC("Debe mejorar su claridad emocional");
    } else if(claridad >= 24 && claridad <= 34 ) {
      setMessageC("Adecuada claridad emocional")
    } else if (claridad >= 35) {
      setMessageC("Excelente claridad emocional")
    }

    if(reparacion <= 23) {
      setMessageR("Debe mejorar su reparación de las emociones");
    } else if(reparacion >= 24 && reparacion <= 34 ) {
      setMessageR("Adecuada reparación de las emociones")
    } else if (reparacion >= 35) {
      setMessageR("Excelente reparación de las emociones")
    }
  }



  return (
    <ResultWrap id="results" lugar={lugar}>
      <Header>Atención a los sentimientos</Header>
      <Header>Claridad Emocional</Header>
      <Header>Repatación de las emociones</Header>
      <Result>{messageA}</Result>
      <Result>{messageC}</Result>
      <Result>{messageR}</Result>
  </ResultWrap>
  )
}

const ResultWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 200px;
  justify-items: center;
  align-items: center;
  place-content: ${props => props.lugar == "dashboard" ? 'start' : 'center'};
  gap: 0 10px;
  margin-top: 50px;

  & p:nth-child(1) {
    grid-column: 1 /2;
    width: 100%;
    height: 100%;
  }
  & p:nth-child(2) {
    grid-column: 2 /3;
    width: 100%;
    height: 100%;
  }
  & p:nth-child(3) {
    grid-column: 3 /4;
    width: 100%;
    height: 100%;
  }
  & p:nth-child(4) {
    grid-column: 1 /2;
    grid-row: 2;
    width: 100%;
    height: 100%;
  }
  & p:nth-child(5) {
    grid-column: 2 /3;
    grid-row: 2;
    width: 100%;
    height: 100%;
  }
  & p:nth-child(6) {
    grid-column: 3 /4;
    grid-row: 2;
    width: 100%;
    height: 100%;
  }
`;

const Header = styled.p`
  background: #185ADB;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
  text-align:center;
`;

const Result = styled.p`
background: #DDE8FF;
display: flex;
justify-content: center;
align-items: center;
font-size: 16px;
text-align: center;
color: #142850;

`;



export default MessagesResult
