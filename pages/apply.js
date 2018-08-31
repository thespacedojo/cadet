import React, { fragment } from 'react'
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import Input from '../components/input'

const Apply = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <fragment>
      <h1>Apply for the Spacedojo Cadet program</h1>
      <form onSubmit={handleSubmit} >
        <Input type="text" label="name" />
        <Input type="email" label="email" />
        <Input type="textarea" label="languages" rows="4" hint="Languages you've used to develop before" />
        <Input type="text" label="githubUrl" />
        <Input type="text" label="twitterUrl" />
        <Input type="text" label="linkedInUrl" />
        <Input type="text" label="location" hint="Your physical city and state" />
        <Input type="submit" value="Apply" />
      </form>
    </fragment>
  )
}

export default Apply

