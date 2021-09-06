import styled from "styled-components";




const Question = ({question, answers, setAnswers, current, setCurrent, length, setIsFinalQuestion}) => {

  const handledValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAnswers([...answers, {[name]: value}]);
    if (current === length-1) {
      setTimeout(() => {
        setIsFinalQuestion(true);
      }, 250);
    } else if (current !== length-1) {
      setTimeout(() => {
        setCurrent(current + 1);
      }, 250);
    }
  }
  return (
    <div>
      <Name>{question.name}</Name>
      <Options>
        {
          question.options.map(option => {
            return (
              <Option key={option.id}>
                <input type="radio" name={question.number} id={`option${option.id}`} onChange={handledValue} value={option.id}/>
                <label htmlFor={`option${option.id}`}>{option.name}</label>
              </Option>
            )
          })
        }
      </Options>
    </div>
  )
}
const Name = styled.p`
  margin-top: 0;
`;
const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Option = styled.div`
  & label {
    background: #e5e8ee;
    height: 80px;
    width: 200px;
    border-radius: 3px;
    cursor: pointer;
    padding: 0 10px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    color: #1F3C88;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  & input[type="radio"]{
    display: none;
  }
  & input[type="radio"]:checked:checked ~ label {
    background: #185ADB;
    color: white;
  }
`;
export default Question
