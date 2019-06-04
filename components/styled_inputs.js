import React from 'react'
import styled from 'styled-components'
import Input from './input'

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

const ErrorMessage = styled.p`
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

export { Button, ErrorMessage, StyledInput }
