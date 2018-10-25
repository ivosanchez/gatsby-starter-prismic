import React from 'react'
import Input from './Input'
import Textarea from './Textarea'

const Form = () => {
  return (
    <form
      className="my-6"
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/no-cache=1"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />
      <Input
        type="text"
        label="Name"
        name="name"
        placeholder="name..."
        required={true}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        placeholder="email..."
        required={true}
      />
      <Textarea
        label="Message"
        name="message"
        placeholder="leave a message..."
        required={true}
      />
      <button
        type="submit"
        className="border border-black px-6 py-3 bg-grey-light"
      >
        Send
      </button>
    </form>
  )
}

export default Form
