import React, { fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from "graphql-tag"
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

const Header = styled.h1`
	text-align: center;
`
const Intro = styled.p`
	text-align: center;
	width: 50%;
	margin-left: 25%;
`

const StyledInput = styled(Input)`
	display: grid;
	grid-template-columns: 0.5fr 0.5fr 2fr 1fr;
	margin-bottom: 1rem;

	input, textarea {
		padding: 6px 12px;
		border-radius: 3px;
		border: 1px solid white;
		font-size: 1.1em;
	}

	input:focus, textarea:focus {
		border:1px solid #6b539c;
		outline:none;
	}

	label {
		grid-column-start: 2;
		text-align: right;
		padding-right: 30px;
		padding-top: 6px;
	}
`

const Button = styled(Input)`
	display: grid;
	grid-template-columns: 0.5fr 0.5fr 2fr 1fr;

	input[type="submit"] {
		grid-column-start: 3;
		background-color: #6b539c;
		border: 1px solid #6b539c;
		color: white;
		font-weight: 600;
		height: 50px;
		width: 100%;
		display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border-radius: 4px;
	}
`

const Apply = () => {
  const data = {}

  return (
		<Mutation mutation={ADD_CADET}>
			{(addCadet, {error, data}) => (
				<fragment>
					<Header>Apply for the Spacedojo Cadet program</Header>
					<Intro>The Spacedojo Cadet program is a 6 month paid on-the-job training program. Use the skills you have now and the ones you will learn during the six months to start building a career in development right now.</Intro>
					<Form callback={(formData, ref) => {
						addCadet({variables: { ...formData }})
						.then((response) => {
							ref.reset()
							console.log(response.data, 'INCOMING TRANSMISSION')
						})
						.catch((err) => {
							console.log(err, 'DANGER WILL')
							console.log(error, 'DANGER WILL PT 2')
						})
					}}>
						<StyledInput type="text" label="name" required />
						<StyledInput type="email" label="email" required />
						<StyledInput type="textarea" label="languages" rows="4" hint="Languages you've used to develop before" required />
						<StyledInput type="text" label="githubUrl" />
						<StyledInput type="text" label="twitterUrl" />
						<StyledInput type="text" label="linkedInUrl" />
						<StyledInput type="text" label="location" hint="Your physical city and state" required />
						<Button type="submit" value="Apply" />
					</Form>
				</fragment>
			)}
		</Mutation>
  )
}

export default Apply

