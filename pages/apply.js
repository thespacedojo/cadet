import React, { fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from "graphql-tag"
import Router from 'next/router';
import { Mutation } from "react-apollo"
import Input from '../components/input'
import Form from '../components/form'
import styled from 'styled-components'

const ADD_CADET = gql`
  mutation AddCadet($name: String!, $email: String!, $location: String!, $languages: String!, $githubUrl: String, $twitterUrl: String, $linkedInUrl: String) {
    createCadet(name: $name, email: $email, location: $location, languages: $languages, githubUrl: $githubUrl, twitterUrl: $twitterUrl, linkedInUrl: $linkedInUrl) {
      id
			name
			email
			location
			languages
			githubUrl
			twitterUrl
			linkedInUrl
    }
  }
`;

const Error = styled.p`
  grid-column-start: 2;
  color: #333;
  background-color: lightcoral;
  width: 100%;
  border: 1px solid red;
  border-radius: 4px;
  padding: 13px 0;
  text-align: center;
  margin: 5px 0;
`

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.5fr 1fr;

  @media (max-width: 1000px) {
		grid-template-columns: 0.2fr 1fr 0.2fr;
  }

	form {
		grid-column-start: 2;
	}
`

const Header = styled.h1`
	text-align: left;
	grid-column-start: 2;

  @media (max-width: 1000px) {
    font-size: 1.1em;
  }
`

const Intro = styled.p`
	grid-column-start: 2;
	text-align: left;
	padding: 10px 0px;
	line-height: 1.4em;
	max-width: 75ch;

  @media (max-width: 1000px) {
    font-size: 0.9em;
  }
`

const StyledInput = styled(Input)`
	display: grid;

	margin-bottom: 1rem;

	input, textarea {
		padding: 6px 12px;
		border-radius: 3px;
		border: 1px solid white;
		font-size: 1.1em;
		grid-row-start: 2;
    -webkit-appearance: none;

		::placeholder {
			color: #aaa;
		}
	}

	input:focus, textarea:focus {
		border:1px solid #6b539c;
		outline:none;
		font-size: 1.1em;
		-webkit-text-size-adjust: 100%;
	}

	label {
		grid-row-start: 1;
		text-align: left;
		padding-right: 30px;
		padding-top: 6px;
		margin-bottom: 7px;
	}
`

const Button = styled(Input)`
	input[type="submit"] {
		grid-column-start: 2;
		background-color: #6b539c;
		border: 1px solid #6b539c;
		color: white;
		font-weight: 600;
		height: 50px;
		width: 100%;
		display: inline-block;
    padding: 6px 12px;
    margin: 1.6em 0 0 0;;
    font-size: 14px;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
		-webkit-appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border-radius: 4px;
	}
`

class Apply extends React.Component {
  state = {error: undefined}

  render() {
    return (
      <Mutation mutation={ADD_CADET}>
        {(addCadet, {error, data}) => (
          <Grid>
            <Header>Apply for the Spacedojo Cadet program</Header>
            <Intro>The Spacedojo Cadet program is a 6 month paid on-the-job training program. Use the skills you have now and the ones you will learn during the six months to start building a career in development right now.</Intro>
            <Form callback={(formData, ref) => {
              addCadet({variables: { ...formData }})
              .then((response) => {
                ref.reset()
                this.props.updateCadet(response.data.createCadet.id)
                Router.push({ pathname: '/apply-thanks' })
              })
              .catch((err) => {
                this.setState({error: err.message})
              })
            }}>
              <StyledInput type="text" label="name" placeholder="Jill Smith" required />
              <StyledInput type="email" label="email" placeholder="jill@smith.com" required />
              <StyledInput type="textarea" label="languages" rows="4" placeholder="JS, Ruby, PHP" hint="Languages you've used to develop before" />
              <StyledInput type="text" label="githubUrl" placeholder="https://github.com/queso" />
              <StyledInput type="text" label="twitterUrl" />
              <StyledInput type="text" label="linkedInUrl" />
              <StyledInput type="text" label="location" placeholder="Portland, Oregon" hint="Your physical city and state" required />
              {this.state.error &&
                <Error>{this.state.error}</Error>
              }
              <Button type="submit" value="Apply" />
            </Form>
          </Grid>
        )}
      </Mutation>
    )
  }
}

export default Apply

