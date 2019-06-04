import React from 'react'

class Timer extends React.Component {
  state = { currentTime: new Date }

  componentDidMount() {
    const intervalId = setInterval(this.updateTimer.bind(this), 1000)
    this.setState({intervalId})
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.stop && this.props.stop !== prevProps.stop) {
      clearInterval(this.state.intervalId)
      this.props.finish(this.calculateTime(new Date))
    }
  }

  calculateTime(newDate) {
    const timeLeft = (this.props.finishedDate - newDate) / (60 * 1000)
    const minutes = Math.floor(Math.abs(timeLeft))
    let seconds = Math.floor((Math.abs(timeLeft) * 60) % 60)
    if (seconds < 10)
      seconds = `0${seconds}`
    return `${minutes}:${seconds}`
  }

  updateTimer() {
    const newDate = new Date
    if (newDate >= this.props.finishedDate) {
      this.setState({currentTime: new Date, timer: 'Time is up'})
      clearInterval(this.state.intervalId)
      this.props.finish('0:00')
    } else {
      this.setState({currentTime: new Date, timer: `${this.calculateTime(newDate)} left`})
    }
  }

  render() {
    return <div>{this.state.timer}</div>
  }

}

export default Timer
