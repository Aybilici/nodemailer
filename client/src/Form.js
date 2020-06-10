import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {
  formSubmit = (e) => {
    e.preventDefault();

    this.setState({
      buttonText: '...sending',
    });

    let data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
      file: this.state.file,
    };

    axios
      .post('http://localhost:4444/send', data)
      .then((res) => {
        this.setState({ sent: true }, this.resetForm());
        console.log(data.file);
      })
      .catch(() => {
        console.log('Message not sent');
        console.log(data.file);
      });
  };
  state = {
    name: '',
    message: '',
    email: '',
    file: '',
    sent: false,
    buttonText: 'Send Message',
  };

  resetForm = () => {
    this.setState({
      name: '',
      message: '',
      email: '',
      file: '',
      buttonText: 'Message Sent',
    });
  };
  render() {
    return (
      <div className='App'>
        <form className='contact-form' onSubmit={(e) => this.formSubmit(e)}>
          <label className='message' htmlFor='message-input'>
            Your Message
          </label>
          <textarea
            onChange={(e) => this.setState({ message: e.target.value })}
            name='message'
            className='message-input'
            type='text'
            placeholder='Please write your message here'
            value={this.state.message}
            required
          />

          <label className='message-name' htmlFor='message-name'>
            Your Name
          </label>
          <input
            onChange={(e) => this.setState({ name: e.target.value })}
            name='name'
            className='message-name'
            type='text'
            placeholder='Your Name'
            value={this.state.name}
          />

          <label className='message-email' htmlFor='message-email'>
            Your Email
          </label>
          <input
            onChange={(e) => this.setState({ email: e.target.value })}
            name='email'
            className='message-email'
            type='email'
            placeholder='your@email.com'
            required
            value={this.state.email}
          />
          <input
            onChange={(e) => this.setState({ file: e.target.value })}
            name='file'
            className='message-email'
            type='file'
            required
            value={this.state.file}
          />

          <div className='button--container'>
            <button type='submit' className='button button-primary'>
              {this.state.buttonText}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Contact;
