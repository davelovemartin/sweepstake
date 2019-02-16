import React from 'react'
import Button from 'react-rainbow-components/components/Button'

function App() {
  return (
    <div className="container">
      <section>
        <div className="row">
          <div className='col-8'>
            <header>
              <h1>Dave's Bath Half Sweepstake</h1>
              <p>Sponsor me. Pick a finishing time.</p>
              <p>If you pick the time that I finish the Bath Half Marathon in, you win a prize.</p>
              <Button
                  label="Sponsor me"
                  variant="brand"
                  onClick={() => alert('Hello!')}
              />
            </header>
          </div>
          <div className='col-4'>
          </div>
        </div>
        <article>
          <div className="row">
            <div className='col-8'>
              <h2>The Charity</h2>
              <p>I first heard of <a href='http://labourbehindthelabel.org'>Labour Behind the Label</a> after reading about the Rana Plaza Building disaster in 2013.  1138 people who made clothes destined for the UK high street died in the deadliest garment-factory accident in history.</p>
              <p>Labour Behind the Label is a campaign that raises awareness of the problems in the garment industry, where our clothes come from, and the issues that workers face in countries like Cambodia, Bangladesh, India and Sri Lanka.</p>
              <p>Labour Behind the Label is the only UK campaign group that focuses exclusively on labour rights in the global garment industry. Based in Bristol, they are are small but mighty in relentlessly raising the profile of garment workers who need their stories to be told.</p>
            </div>
            <div className='col-4'>
            </div>
          </div>
          <div className="row">
            <div className='col-8'>
              <h2>The Race</h2>
              <p>The ‘Bath Half’ as it is affectionately known, is one of the longest established and most popular city centre road events in the UK. It is also the largest charity fundraising event in the South West region, raising over £2.25 million for charity in 2017 alone.</p>
              <p>The course itself is fast and flat. It covers a two lap 13.1 mile (21.1km) traffic-free course straddling both sides of the River Avon.</p>
            </div>
            <div className='col-4'>
            </div>
          </div>
          <div className="row">
            <div className='col-8'>
              <h2>The Prize</h2>
              <h2>Frequently Asked Questions</h2>
              <h3>What's your Personal Best time?</h3>
              <p>1 hour, 39 minutes and 20 seconds at the 2014 Bath Half Marathon. I'm aiming to beat this time. You can see my finishing time in other selected races on the <a href='https://www.runbritainrankings.com/runners/profile.aspx?athleteid=553563'>Run Britain</a> rankings website.</p>
              <h3>Are you in good form?</h3>
              <p>Check-out <a href='https://www.strava.com/athletes/1783040'>my Strava profile</a> and judge for yourself.</p>
              <h3>What happens after I sponsor you?</h3>
              <p>Once you've sponsored me, you pick a time. There are only 50 "time-slots" available and once they're gone - they're gone. The winner is determined by which time-slot my official chip time falls within.  I'll notify the winner in the week after the race.</p>
              <h3>Is this website legit?</h3>
              <p>Yes. Hopefully you're here because you already know me and you are hoping to help out a cause I support.  You know that I work as a web developer and will use secure methods to ensure all payment and personal information is kept safe. For example, I use Stripe for the checkout - I don't hold any of your payment details. Stripe is certified to PCI Service Provider Level 1 - the most stringent level of certification available in the payments industry.</p>
              <div className='col-4'>
              </div>
            </div>  
          </div>
        </article>
      </section>
    </div>
  )
}

export default App
