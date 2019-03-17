import React from 'react'
import Tabset from 'react-rainbow-components/components/Tabset'
import Tab from 'react-rainbow-components/components/Tab'
import Card from 'react-rainbow-components/components/Card'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class TabInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 'charity' }
    this.handleOnSelect = this.handleOnSelect.bind(this)
  }

  handleOnSelect(event, selected) {
    this.setState({ selected })
  }

  getTabContent() {
    const { selected } = this.state
    const { timeSlots } = this.props

    if (selected === 'charity') {
      return (
        <div aria-labelledby="charity" id="charityTab" className="rainbow-p-around_xx-large rainbow-m-bottom_xx-large rainbow-font-size-text_large rainbow-align-text-center rainbow-color_gray-3">
          <div className="row">
            <div className='col-8'>
              <h2>The Charity</h2>
              <p>I'm raising money for Labour Behind the Label (registered charity 1159356).</p>
              <p>I first heard of <a href='http://labourbehindthelabel.org'>Labour Behind the Label</a> after reading about the Rana Plaza Building disaster in 2013.  1138 people who made clothes destined for the UK high street died in the deadliest garment-factory accident in history.</p>
              <p>Labour Behind the Label is a charity that raises awareness of the problems in the garment industry, where our clothes come from, and the issues that workers face in countries like Cambodia, Bangladesh, India and Sri Lanka.</p>
              <p>Labour Behind the Label is the only UK campaign group that focuses exclusively on labour rights in the global garment industry. Based in Bristol, they are are small but mighty in relentlessly raising the profile of garment workers who need their stories to be told.</p>
            </div>
            <div className='col-4'>
            </div>
          </div>
        </div>
      )
    } else if (selected === 'times') {
      return (
        <div aria-labelledby="times" id="timesTab" className="rainbow-p-around_xx-large rainbow-m-bottom_xx-large rainbow-font-size-text_large rainbow-align-text-center rainbow-color_gray-3">
          <div className="row">
            <div className='col-12'>
              <h2>The Times</h2>
              <p>Here are the current times and sponsors:</p>
              <div className="rainbow-flex rainbow-flex_wrap">
              {
                timeSlots && timeSlots.map(timeSlot => {
                  return (
                    <Card
                      className="rainbow-align-content_space-around rainbow-p-around_x-small center"
                      key={timeSlot.id}
                    >
                      {timeSlot.name ? timeSlot.name + ' chose ' + timeSlot.time : timeSlot.time + ' is free'}
                    </Card>
                    )
                })
              }
              </div>
            </div>
          </div>
        </div>
      )
    }  
    return (
      <div aria-labelledby="questions" id="questionsTab" className="rainbow-p-around_xx-large rainbow-m-bottom_xx-large rainbow-font-size-text_large rainbow-align-text-center rainbow-color_gray-3">
        <div className="row">
          <div className='col-8'>
            <h2>Frequently Asked Questions</h2>
            <h3>What's the Bath Half?</h3>
            <p>The ‘Bath Half’, as it is affectionately known, is one of the longest established and most popular city centre road events in the UK. It is also the largest charity fundraising event in the South West region, raising over £2.25 million for charity in 2017 alone.</p>
            <p>The course itself is fast and flat. It covers a two lap 13.1 mile (21.1km) traffic-free course straddling both sides of the River Avon.</p>
            <p>The race starts on Sunday 17th March 2019 at 11:00am.</p>
            <h2>What's the Prize?</h2>
            <p>You can win a £25 Amazon Voucher - I'll hook the winner up with the voucher the day after the race is finished.</p>
            <p>I'm donating the £25 Amazon Voucher as the prize - it doesn't come out of the donations.</p>
            <h3>What's your Personal Best time?</h3>
            <p>1 hour, 39 minutes and 20 seconds at the 2014 Bath Half Marathon. I'm aiming to beat this time. You can see my finishing time in other selected races on the <a href='https://www.runbritainrankings.com/runners/profile.aspx?athleteid=553563'>Run Britain</a> rankings website.</p>
            <h3>Are you in good form?</h3>
            <p>Check-out <a href='https://www.strava.com/athletes/1783040'>my Strava profile</a> and judge for yourself.</p>
            <h3>What happens after I sponsor you?</h3>
            <p>Once you've sponsored me, you pick a time.</p>
            <p>There are only 50 "30-second time-slots" available. Once a time slot is picked - it's gone. Only one person, can hold a particular time-slot.</p>
            <p>The winner is determined by which time-slot my official chip time falls within.  I'll notify the winner the day after the race is finished.</p>
            <div className='col-4'>
            </div>
          </div>  
        </div>
      </div>
    )
  }

  render () {
    const { selected } = this.state
  
    return (
      <div className="rainbow-flex rainbow-flex_column rainbow_vertical-stretch">
        <Tabset
          id="tabset-1"
          onSelect={this.handleOnSelect}
          activeTabName={selected}
          className="rainbow-p-horizontal_xx-large rainbow-background-color_gray-1">

          <Tab 
            label="The Charity"
            name="charity"
            id="charity"
            ariaControls="charityTab" />

          <Tab
              label="Times"
              name="times"
              id="times"
              ariaControls="timesTab" />

          <Tab
            label="FAQ"
            name="questions"
            id="questions"
            ariaControls="questionsTab" />

        </Tabset>
        {this.getTabContent()}
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {    
    timeSlots: state.firestore.ordered.timeSlots
  }
}

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([{ collection: 'timeSlots' }])
)(TabInfo)