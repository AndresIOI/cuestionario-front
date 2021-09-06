import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../providers/auth'
import api from '../../services/api';
import styled from 'styled-components';
import MessagesResult from '../MessagesResult';

const ListaStudents = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [infoStudent, setInfoStudent] = useState([]);
  const refList = useRef();

  useEffect(() => {
    const getStudentsByGroup = async () => {
      const response = await api.get(`results/students/group/${user.group.id}`)
      setStudents(response.data);
      setLoading(false);
    }
    getStudentsByGroup();
  }, []);

  const getResult = async (e, id) => {
    for (const key in refList.current.children) {
      if (Object.hasOwnProperty.call(refList.current.children, key)) {
        const element = refList.current.children[key];
        if (element.classList.contains('active')) {
          element.classList.remove('active')
        }
      }
    }
    e.target.classList.add('active');
    setShowResult(false);
    const response = await api.get(`results/students/${id}`);
    setInfoStudent(response.data);
    setShowResult(true);
    setLoadingStudent(false);
  }

  console.log(students);

  return (
    <StudentsWrap>
      {
        loading ? <p>Cargando</p>:(
          <>
            <div>
              <h3>Alumnos</h3>
              <ul ref={refList}>
                {
                  students.map(student => {
                    return <li key={student.id}  onClick={(e) => getResult(e, student.id)}>{student.name}</li>
                  })
                }
              </ul>
            </div>
            <div>
              {
                (showResult && loadingStudent === false) && (
                  <>
                    <MessagesResult  nombre={infoStudent.student.name} genere={infoStudent.student.genere} atencion_sentimientos={infoStudent.atencion} claridad_emocional={infoStudent.claridad} reparacion_emociones={infoStudent.reparacion} lugar="dashboard"></MessagesResult>
                    <Text>ATENCIÓN A LOS SENTIMIENTOS : Se refiere a la  percepcion que tienes de tus propias emociones, es decir a la capacidad para sentir y expresar las emociones de forma adecuada, Ejemplo: Presto mucha atención a los sentimientos </Text>
      <Text>CLARIDAD EMOCIONAL: Evalúa la percepción que tienes sobre la comprensión de tus propios estados emocionales, para facilitar la actividad cognitiva ejemplo: ¿Puedo  llegar a comprender mis sentimientos?</Text>
      <Text>REPARACIÓN DE LAS EMOCIONES: Mide la capacidad percibidad para regular  los propios estados emocionales de forma correcta para el crecimiento personal y emocional  Ejemplo: ¿Cuando estoy triste, pienso en los placeres de  la vida?</Text>
                  </>
                )
              }
            </div>
          </>
        )
      }

    </StudentsWrap>
  )
}

const StudentsWrap = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  margin-top: 20px;
  grid-gap: 0 25px;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;

    & li {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      cursor: pointer;

      &.active {
        background: #185ADB;
        color: white;
      }
    }
  }
`;
const Text = styled.p`
  margin-top: 40px;
  font-size: 15px;
`;

const MessagesResultWrap = styled(MessagesResult)`
`;

export default ListaStudents
