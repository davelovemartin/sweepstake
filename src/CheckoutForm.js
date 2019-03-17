import React, { Component } from 'react'
import Button from 'react-rainbow-components/components/Button'
import Notification from 'react-rainbow-components/components/Notification'
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import { updateShowTimes, updateOrder } from './actions.js'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = { 
      valid: false,
      fetching: false,
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false,
      postalCode: false,
      errorMessage: false
    }
  }

  async submit(ev) {
    this.setState({ fetching: true })
    try {
      let { token } = await this.props.stripe.createToken({name: this.props.name})
      await fetch(process.env.REACT_APP_CHARGE_URL, {
        method: 'POST',
        body: JSON.stringify({
          token,
          description: 'Charge for Bath Half Sweepstake',
          email: this.props.email
        })
      }).then((response) => {
        if (response.ok) {
          this.props.updateShowTimes(true)
          this.props.updateOrder(token.id)
          this.setState({ fetching: false })
          console.log('Payment completed successfully')
          return 
        } else {
          return response.text().then((response) => {
            throw new Error(response)
         }).catch((error) => {
           this.setState({ 
             errorMessage: error + '',
             fetching: false
            })
         })
        }
      })
      
    } catch (error) {
      this.setState({ errorMessage: 'something went wrong - please try again: ' + error })
    }
  }

  onChange = (e) => {
    if (e.complete) {
      switch (e.elementType) {
        case "cardNumber":
          this.setState({ cardNumber: true })
          break
        case "cardExpiry":
          this.setState({ cardExpiry: true })
          break
        case "cardCvc":
          this.setState({ cardCvc: true })
          break
        case "postalCode":
          this.setState({ postalCode: true })
          break
        default:      
          return
      }
    }
    if (this.state.cardNumber && this.state.cardNumber && this.state.cardCvc && this.state.postalCode) {
      this.setState({ valid: true })
    }
  }

  render() {
    const createOptions = () => {
      return {
        style: {
          base: {
            fontSize: '18px',
            color: '#424770',
            letterSpacing: '0.025em',
            fontFamily: 'Source Code Pro, monospace',
            '::placeholder': {
              color: '#aab7c4',
            },
            padding: '5px',
            margin: '5px'
          },
          invalid: {
            color: '#fe4849',
          },
        },
      }
    }

    return (
      <div className="checkout row">
        <div className='col-6'>
          <div className="rainbow-m-vertical_xx-small">
            <CardNumberElement
              onChange={(e) => this.onChange(e)}
              onReady={(el) => el.focus()}
              {...createOptions()}
            />
          </div>
          <div className="rainbow-m-vertical_xx-small">
            <CardExpiryElement
              onChange={(e) => this.onChange(e)}
              {...createOptions()}
            />
          </div>
          <div className="rainbow-m-vertical_xx-small">
            <CardCVCElement
              onChange={(e) => this.onChange(e)}
              {...createOptions()}
            />
          </div>
          <div className="rainbow-m-vertical_xx-small">
            <PostalCodeElement
              onChange={(e) => this.onChange(e)}
              {...createOptions()}
            />
          </div>
          <Button
            className="rainbow-m-vertical_x-small"
            label="Pay £5 sponsorship"
            onClick={this.submit}
            variant="brand"
            isLoading={this.state.fetching}
            disabled={!this.state.valid}
          />
          {this.state.errorMessage
          ? <Notification
              title="Sorry"
              description={this.state.errorMessage}
              icon="error"
              onRequestClose={() => this.setState({ errorMessage: false })} />
          : ''
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowTimes: (status) => dispatch(updateShowTimes(status)),
    updateOrder: (order) => dispatch(updateOrder(order))
  }
}

export default injectStripe(connect(
  null,
  mapDispatchToProps
)(CheckoutForm))