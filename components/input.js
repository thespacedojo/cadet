class Input extends React.Component {
  constructor(props) {
    super(props)
    const {type, label, ...options} = props;
    this.options = options;
  }

  labelize = () => {
    const spacedLabel  = this.props.label.split(/(?=[A-Z])/).join(' ')
    const finalLabel = spacedLabel.charAt(0).toUpperCase() + spacedLabel.slice(1)
    return finalLabel
  }

  formType = () => {
    const options = this.options
    switch(this.props.type) {
      case 'textarea':
        return <textarea id={this.props.label} {...options} />
      default:
        return <input id={this.props.label} type={this.props.type} {...options} />
    }
  }

  render() {
    const label = this.props.label
    const type = this.props.type
    return (
      <fragment>
        { label ?
            <label title={this.options.hint} htmlFor={label}>{this.labelize()}</label>
            : null
        }
        {this.formType()}
      </fragment>
    )
  }
}

export default Input
