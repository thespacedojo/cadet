import React, { fragment } from 'react'

class Input extends React.Component {
  constructor(props) {
    super(props)
    const {type, label, className, ...options} = props;
    this.options = options;
  }

  labelize = () => {
    const spacedLabel  = this.props.label.split(/(?=[A-Z])/).join(' ')
    const finalLabel = spacedLabel.charAt(0).toUpperCase() + spacedLabel.slice(1)
    return finalLabel
  }

  formType = () => {
    const options = this.options
    const ref = this.options.forwardedRef || React.createRef()
    switch(this.props.type) {
      case 'textarea':
        return <textarea id={this.props.label} {...options}></textarea>
      case 'radio':
        return <input type={this.props.type} id={`${options.name}-${this.props.label}`} value={this.props.label} {...options} />
      default:
        return <input id={this.props.label} ref={ref} type={this.props.type} {...options} />
    }
  }

  beforeLabel = () => {
    if (this.props.type !== 'radio')
      return this.label()
  }

  afterLabel = () => {
    if (this.props.type === 'radio')
      return this.label()
  }

  label = () => {
    return this.props.label ?
      <label title={this.options.hint} htmlFor={this.props.label}>{this.labelize()}</label>
      : null
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.beforeLabel()}
        {this.formType()}
        {this.afterLabel()}
      </div>
    )
  }
}

const ForwardedInput = React.forwardRef((props, ref) => (
  <Input {...props} forwardedRef={ref} />
))

export default ForwardedInput
