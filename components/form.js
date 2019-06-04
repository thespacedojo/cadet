import React from 'react'

const Form = ({ callback, formRef, children }) => {
  formRef = formRef || React.createRef();
  const data = {}

  const handleSubmit = (event) => {
    event.preventDefault();
    for(let field of formRef.current.elements) {
      if (field.type && field.type == "radio") {
        data[`${field.name}`] = formRef.current.elements[field.name].value
      } else {
        if(field.id)
          data[field.id] = field.value;
      }
    }
    callback(data, formRef.current);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

export default Form
