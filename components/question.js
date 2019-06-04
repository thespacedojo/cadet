import React from 'react'
import ReactMarkdown from 'react-markdown'
import Input from '../components/input'

const Question = ({question}) => (
  <div>
    <ReactMarkdown source={question.question} />
    {question.choices.map((choice, index) => {
      return <Input name={`${question.id}`} key={index} label={choice} type="radio" />
    })}
  </div>
)

export default Question
