import React, { fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from "graphql-tag"
import Router from 'next/router';
import { Mutation } from "react-apollo"
import Form from '../components/form'
import styled from 'styled-components'
import { Button, ErrorMessage, StyledInput } from '../components/styled_inputs'

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
                <ErrorMessage>{this.state.error}</ErrorMessage>
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
