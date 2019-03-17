import React from 'react'
import { StripeProvider } from 'react-stripe-elements'
import Button from 'react-rainbow-components/components/Button'
import Input from 'react-rainbow-components/components/Input'
import CheckoutForm from './CheckoutForm.js'
import { Elements } from 'react-stripe-elements'
import { connect } from 'react-redux'
import { /* createAnonymousUser, */ updateTimeSlot, updateShowStripe, updateShowThankyou, updateShowDetails, updateShowEmail, updateShowTimes } from './actions.js'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Sponsorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      time: '',
      email: '',
      stripe: null
    }
    this.handleSponsorMeClick = this.handleSponsorMeClick.bind(this)
    this.handleTimeSlotClick = this.handleTimeSlotClick.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleDetailsSubmit = this.handleDetailsSubmit.bind(this)
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_live_x4bBWBq2eFx2tSjTIcowW4j')});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_live_x4bBWBq2eFx2tSjTIcowW4j')});
      });
    }
  }

  handleSponsorMeClick() {
    this.props.updateShowDetails(true)
  }

  handleTimeSlotClick(name, id, time, order) {
    this.props.updateTimeSlot(this.props, {
      id,
      name,
      order
    })
    this.setState({time})
    this.props.updateShowThankyou(true)
  }

  handleDetailChange(event) {
    this.setState({ name: event.target.value })
    // this.props.createAnonymousUser(this.props)
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
    // this.props.createAnonymousUser(this.props)
  }

  handleDetailsSubmit(event) {
    event.preventDefault()
    this.props.updateShowEmail(true)
  }

  handleEmailSubmit(event) {
    event.preventDefault()
    this.props.updateShowStripe(true)
  }

  render () {
    const { timeSlots, showThankyou, showTimes, showStripe, showEmail, showDetails } = this.props
    
    return (
      showDetails
      ? 
        showEmail
        ?
          showStripe
          ?
            showTimes  
            ?
              showThankyou
              ? <p>Thanks {this.state.name}, {this.state.time} is a time I'd be proud of.  Best of luck.</p>
              : <React.Fragment>
                <h2>Your payment was successfully proccessed - thank you!</h2>
                <p>Now pick a time that you think I'll finish the Bath Half in&hellip;</p>
                <div className="rainbow-flex rainbow-flex_wrap">
                  {
                    timeSlots && timeSlots.map(timeSlot => {
                      return (
                        <Button
                          label={timeSlot.name ? timeSlot.name : timeSlot.time}
                          onClick={() => this.handleTimeSlotClick(this.state.name, timeSlot.id, timeSlot.time, this.props.order)}
                          variant="neutral"
                          disabled={timeSlot.name ? true : false}
                          className="rainbow-align-content_space-between"
                          key={timeSlot.id}
                        />
                        )
                    })
                  }
                </div>
              </React.Fragment>
            : <React.Fragment>
                <p>Please enter your card details.  This checkout uses Stripe to process your card details. The card data entered into this payment form is sent directly to Stripe and not stored by me.</p>
                <p>(You can pick your time after the checkout).</p>
                <StripeProvider stripe={this.state.stripe}>
                  <Elements>
                    <CheckoutForm
                      name={this.state.name}
                      order={this.state.order}
                    />
                  </Elements>
                </StripeProvider>
              </React.Fragment>
          : <React.Fragment>
            <p>We need you to tell us your email address so that we can send you your prize if you win.</p>
            <p>Your email address will only be used for this purpose and will be deleted one day after the race.</p>
            <form id="myEmailForm" onSubmit={this.handleEmailSubmit}>
              <Input
                className="rainbow-p-vertical_x-small"
                label="Your email"
                placeholder="eg dave.martin@cxpartners.co.uk"
                value={this.state.value}
                onChange={this.handleEmailChange}
                type="email" />
              <Button
                label="Next"
                variant="brand"
                form="myEmailForm"
                type="submit"
                disabled={!this.state.email}
              />
            </form>
          </React.Fragment>
        : <React.Fragment>
            <p>Hey, thanks friend. What's your name?</p>
            <form id="myForm" onSubmit={this.handleDetailsSubmit}>
              <Input
                className="rainbow-p-vertical_x-small"
                label="Your name"
                placeholder="eg Jayne Smith"
                value={this.state.value}
                onChange={this.handleDetailChange}
                type="text" />
              <Button
                label="Next"
                variant="brand"
                form="myForm"
                type="submit"
                disabled={!this.state.name}
              />
            </form>
          </React.Fragment>
      : <Button
          label="Sponsor me"
          variant="brand"
          onClick={this.handleSponsorMeClick}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {    
    timeSlots: state.firestore.ordered.timeSlots,
    order: state.ui.order,
    showDetails: state.ui.showDetails,
    showEmail: state.ui.showEmail,
    showStripe: state.ui.showStripe,
    showTimes: state.ui.showTimes,
    showThankyou: state.ui.showThankyou
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // createAnonymousUser: (props) => dispatch(createAnonymousUser(props)),
    updateTimeSlot: (props, timeSlot) => dispatch(updateTimeSlot(props, timeSlot)),
    updateShowDetails: (status) => dispatch(updateShowDetails(status)),
    updateShowEmail: (status) => dispatch(updateShowEmail(status)),
    updateShowStripe: (status) => dispatch(updateShowStripe(status)),
    updateShowTimes: (status) => dispatch(updateShowTimes(status)),
    updateShowThankyou: (status) => dispatch(updateShowThankyou(status))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'timeSlots' }])
)(Sponsorer)