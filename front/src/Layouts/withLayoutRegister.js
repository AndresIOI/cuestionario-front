import { useContext } from "react";
import Register from "../components/Register";

import { UserContext } from "../providers/user";


function withLayoutRegister (Wrapper) {

  return function () {
    const {state:{nombre, sexo, grupo}} = useContext(UserContext);
    if (nombre === '' || sexo === '' || grupo === '' ) {
      return <Register />
    } else {
      return <Wrapper/>
    }
  }   
}

export default withLayoutRegister
