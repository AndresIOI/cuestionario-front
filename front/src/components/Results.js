import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import download from "downloadjs";
import * as htmlToImage from 'html-to-image';

import withLayoutRegister from "../Layouts/withLayoutRegister";
import { UserContext } from "../providers/user";
import MessagesResult from "./MessagesResult";


const Results = () => {
  const {state:{answers, sexo, nombre}} = useContext(UserContext);
  const [atencion, setAtencion] = useState(0);
  const [claridad, setClaridad] = useState(0);
  const [reparacion, setReparacion] = useState(0);

  useEffect(() => {
 
    let a = 0;
    let c = 0;
    let r = 0;
    answers.forEach((answer, index) => {
      const question = parseInt(Object.keys(answer).join(''));
      const value = parseInt(Object.values(answer));

      switch (question) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          a+=value;
          break;
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
          c+=value;
          break;
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
            r+=value;
              break;
        default:
          console.log("la pregunta no correspone a ningun elemento de evaluacion");
          break;
      }
    });
    
    setAtencion(a);
    setClaridad(c);
    setReparacion(r);
    console.log(atencion, claridad, reparacion);

  }, [])
  
  const saveResult = () => {
    htmlToImage.toPng(document.getElementById('root'))
  .then(function (dataUrl) {
    download(dataUrl, `resultados_cuestionario_${nombre}`);
  });
  }
 
  return (
    <>
      <MessagesResult nombre={nombre} genere={sexo} atencion_sentimientos={atencion} claridad_emocional={claridad} reparacion_emociones={reparacion} lugar="student"/>
      <Text>ATENCIÓN A LOS SENTIMIENTOS : Se refiere a la  percepcion que tienes de tus propias emociones, es decir a la capacidad para sentir y expresar las emociones de forma adecuada, Ejemplo: Presto mucha atención a los sentimientos </Text>
      <Text>CLARIDAD EMOCIONAL: Evalúa la percepción que tienes sobre la comprensión de tus propios estados emocionales, para facilitar la actividad cognitiva ejemplo: ¿Puedo  llegar a comprender mis sentimientos?</Text>
      <Text>REPARACIÓN DE LAS EMOCIONES: Mide la capacidad percibidad para regular  los propios estados emocionales de forma correcta para el crecimiento personal y emocional  Ejemplo: ¿Cuando estoy triste, pienso en los placeres de  la vida?</Text>
      <ButtonWrap>
        <DownloadBtn onClick={saveResult}>Descargar Resultados</DownloadBtn>
      </ButtonWrap>

    </>
  )
}

const Text = styled.p`
  margin-top: 40px;
  font-size: 15px;
`;

const ButtonWrap = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const DownloadBtn = styled.a`

background: #185ADB;
color: white;
font-size: 18px;
border-radius: 3px;
cursor: pointer;
padding: 15px 10px;
border: none;
grid-column: 2 / 3;

margin-top: 20px;
cursor: pointer;
`; 



export default withLayoutRegister(Results)
