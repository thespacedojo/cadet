import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from "graphql-tag"
import Error from 'next/error'
import Router from 'next/router';
import Question from '../components/question'
import Form from '../components/form'
import Timer from '../components/timer'
import { Button, ErrorMessage } from '../components/styled_inputs'
import styled from 'styled-components'

const quizInfo = gql`
  query quizType($slug: String!) {
    allQuizTypes(filter: {slug: $slug}) {
      slug
      name
      timeAllowed
      id
      quizQuestions {
        id
        question
        choices
      }
    }
  }
`

const ADD_QUIZ_RESULT = gql`
  mutation AddQuizResult($cadetId: ID!, $quizTypeId: ID!, $timeLeft: String!, $answers: Json) {
    createQuizResult(cadetId: $cadetId, timeLeft: $timeLeft, answers: $answers, quizTypeId: $quizTypeId) {
      id
    }
  }
`

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

class Quiz extends React.Component {
  state = {started: false, stop: false}
  formRef = React.createRef()
  buttonRef = React.createRef()

  static async getInitialProps ({query}) {
    return { slug: query.slug }
  }

  form = (quiz) => {
    console.log(this.buttonRef, 'BUTTON REF')
    return (
      <Mutation mutation={ADD_QUIZ_RESULT}>
        {(addQuizResult, {error, data}) => (
          <Form formRef={this.formRef} callback={(formData, ref) => {
            addQuizResult({variables: { quizTypeId: quiz.id, cadetId: this.props.cadetId, timeLeft: this.state.timeLeft, answers: JSON.stringify(formData),  }})
            .then((response) => {
              ref.reset()
              // Router.push({ pathname: '/apply-thanks' })
            })
            .catch((err) => {
              this.setState({error: err.message})
            })
          }}>
            {quiz.quizQuestions.map((q) => {
              return <Question key={q.id} question={q} />
            })}
            {this.state.error &&
              <ErrorMessage>{this.state.error}</ErrorMessage>
            }
            <Button type="submit" ref={this.buttonRef} onClick={this.handleClick} value="Finish" />
          </Form>
        )}
      </Mutation>
    )
  }

  handleClick = () => {
    this.setState({stop: true})
  }

  button() {
    return <Button onClick={this.start} type="submit" value="Start" />
  }

  start = () => {
    const now = new Date
    const later = addMinutes(now, 0.25)
    this.setState({'started': now, finished: later})
  }

  finish(timeLeft) {
    this.setState({timeLeft})
    if(timeLeft === "0:00")
      this.buttonRef.current.click()
  }

  render() {
    return (
      <Query query={quizInfo} variables={{ slug: this.props.slug }}>
        {({ loading, error, data }) => {
          const quiz = data.allQuizTypes[0] || {}
          if (loading) return null
          if (error) return `Error!: ${error}`
          if (data.allQuizTypes.length < 1) return <Error statusCode={404} />

          return (
            <div>
              <h2>{quiz.name} quiz</h2>
              { this.state.finished ?
                  <Timer finishedDate={this.state.finished} stop={this.state.stop} finish={this.finish.bind(this)}/> :
                  null
              }
              { this.state.started ? this.form(quiz) : this.button() }
            </div>
          )
        }}
      </Query>
    )
  }
}



export default Quiz
