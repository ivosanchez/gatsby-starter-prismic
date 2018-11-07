import React, { Component } from 'react'
import Input from './Input'
import Textarea from './Textarea'

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class Form extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    success: false,
    error: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.success || prevState.error)
      return { success: false, error: null }
    return null
  }

  handleSubmit = e => {
    fetch('/?no-cache=1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => {
        this.setState(preState => ({
          name: '',
          email: '',
          message: '',
          success: true,
          error: null,
        }))
      })
      .catch(error => {
        this.setState(preState => ({
          success: false,
          error,
        }))
      })
    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { name, email, message, success, error } = this.state
    return (
      <form className="my-6" onSubmit={this.handleSubmit}>
        <Input
          type="text"
          label="Name"
          name="name"
          value={name}
          placeholder="Name"
          required={true}
          onChange={this.handleChange}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          value={email}
          placeholder="Email"
          required={true}
          onChange={this.handleChange}
        />
        <Textarea
          label="Message"
          name="message"
          value={message}
          placeholder="Leave a message"
          required={true}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="bg-purple-light hover:bg-purple text-white font-bold py-3 px-5 rounded"
        >
          Send
        </button>
        {success && !error && <div className="text-green-dark">Success</div>}
        {!success &&
          error && (
            <div className="text-red">
              {error.message ||
                (typeof error === 'string' && error) ||
                'Form submission is failed'}
            </div>
          )}
      </form>
    )
  }
}

export default Form
