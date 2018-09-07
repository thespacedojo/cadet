import React, { fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import Input from '../components/input'
import Form from '../components/form'

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

const Apply = () => {
  const data = {}

	const formSubmitted = (formData) => {

	}

  return (
		<Mutation mutation={ADD_CADET}>
			{(addCadet, {error, data}) => (
				<fragment>
					<h1>Apply for the Spacedojo Cadet program</h1>
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
						<Input type="text" label="name" required />
						<Input type="email" label="email" required />
						<Input type="textarea" label="languages" rows="4" hint="Languages you've used to develop before" required />
						<Input type="text" label="githubUrl" />
						<Input type="text" label="twitterUrl" />
						<Input type="text" label="linkedInUrl" />
						<Input type="text" label="location" hint="Your physical city and state" required />
						<Input type="submit" value="Apply" />
					</Form>
				</fragment>
			)}
		</Mutation>
  )
}

export default Apply

