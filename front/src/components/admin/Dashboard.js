import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styled from "styled-components";

import withLayoutAuth from "../../Layouts/withLayoutAuth";
import { useAuth } from "../../providers/auth";
import api from "../../services/api";
import Graficas from "./Graficas";
import ListaStudents from "./ListaStudents";

const Dashboard = () => {
  const { user, setUser, group } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isListStudent, setIsListStudent] = useState(true);

  const closeSession = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
  };
  useEffect(() => {
    const getGroup = async () => {
      try {
        const response = await api.get(`results/group/${user.group.id}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getGroup();
  }, []);

  const changeView = () => {
    setIsListStudent(!isListStudent)
  }
  return (
    <div>
      {loading ? (
        <p>Cargando</p>
      ) : (
        <>
          <Navbar>
            <ul>
              <li>Tutor: {user.name}</li>
              <li>Grupo: {user.group.name}</li>
            </ul>
            <ul>
              <ChangeView onClick={changeView}>
                {isListStudent ? 'Ver Graficas' : 'Ver Resultados por alumno'
                }
              </ChangeView>
            </ul>
            <p onClick={closeSession}>Cerrar Sesion</p>
          </Navbar>
          {
            isListStudent ? <ListaStudents/> :          
          ( <Graficas
            atencion={data.atencion}
            claridad={data.claridad}
            reparacion={data.reparacion}
            mujeres={data.mujeres}
            hombres={data.hombres}
            />)
          }

        </>
      )}
    </div>
  );
};

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & ul {
    list-style: none;
    display: flex;
    padding: 0;
    & li {
      margin-right: 10px;
    }
    & li:last-child {
      margin-right: 0;
    }
  }
`;
const ChangeView = styled.li`
  cursor: pointer;
  &:hover {
    color:#185ADB;
  }
`;

export default withLayoutAuth(Dashboard);
