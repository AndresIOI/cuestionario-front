import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import withLayoutRegister from '../Layouts/withLayoutRegister';
import Question from './Question';
import api from '../services/api';
import { UserContext } from "../providers/user";


const Questionnaire = () => {
  const {state:{nombre, sexo, grupo}, dispatch} = useContext(UserContext);
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([]);
  const [isFinalQuestion, setIsFinalQuestion] = useState(false);
  const length = questions.length;
  const history = useHistory();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await api.get('questionnaires/1');
        setQuestions(response.data.questions);
      } catch (error) {
        console.log(error);
      }
    }
    getQuestions();
  }, [])

  const storageAnswers = () => {

    api.post('storageAnswers', 
    {
      name: nombre,
      group_id: grupo,
      genere: sexo,
      answers: answers
    }).then(response => {
      dispatch({answers: answers});
      history.push('/resultados');
    }).catch(error => {
      console.log(error);
    })
  }
  return (
  <>
{
  isFinalQuestion ? <SendAnswers><button onClick={storageAnswers}>Ver resultados</button></SendAnswers> :
    <Questions>
    {
      questions.map((question, index) => {
        return(
          <div key={question.id} className={index === current ? 'slide active' : 'slide'}>
          {
            index === current && (     
            <> 
              <sup>{current+1} / {length}</sup>          
              <Question question={question} answers={answers} setAnswers={setAnswers} current={current} setCurrent={setCurrent} length={length}  setIsFinalQuestion={setIsFinalQuestion}/>
            </>
            )
          }
        </div>
        );
      })
    }
    

  </Questions>
        
      
      }
  </>
  );
};

const Questions = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  & .slide {
    opacity: 0;
    transition-duration: .5s ease;
  }
  & .slide.active {
    opacity: 1;
    transition-duration: .5s;
  }
  & div {
    & p {
      font-family: 'Hina Mincho';
      color: #142850;
      font-size: 3rem;
      text-align: center;
    }
  }

`;


const Arrows = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100%;
  transform: translateY(-100%);
  & span { 
    margin-right: 15px;
    background: #eee;
    padding: 10px;
    border-radius: 3px;
    color: gray;
    cursor: pointer;
  }
  & a {
    margin-left: 15px;
    text-decoration: none;
    color: gray;
    background: #eee;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 3px;
  }
  & a.active {
    background: #185ADB;
    color: white;
  }
`;

const Message = styled.p`
height: 70vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family: 'Hina Mincho';
color: #142850;
font-size: 3rem;
text-align: center;
margin: 0;
 & span {
   font-size: 18px;
  font-family: 'Roboto';
  color: #142850;
  margin-top: 10px;
 }

`;

const SendAnswers = styled.div`
height: 70vh;
display: flex;
justify-content: center;
align-items: center;
& button {
  background: #185ADB;
  color: white;
  font-size: 18px;
  height: 50px;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 25px;
}

`;
export default withLayoutRegister(Questionnaire);
