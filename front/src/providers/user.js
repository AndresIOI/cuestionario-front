import { createContext, useReducer } from "react"

const initialState = {
  nombre: '',
  sexo: '',
  grupo: '',
  answers: ''
}

function reducer(state, action) {
  return { ...state, ...action };
}

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider}
