import React from 'react'
import TabInfo from './Tabset.js'
import Sponsorer from './Sponsorer.js'
import './styles/rainbow-styles.scss'

function App() {
  return (
  <div className="container">
    <header className="rainbow-align-content_space-between rainbow-background-color_white rainbow-p-vertical_medium react-rainbow-golbal-header"></header>
      <section>
        <header className="rainbow-p-horizontal_xx-large rainbow-background-color_gray-1">
          <div className="row">
            <div className='col-12'>
              <header className='rainbow-m-vertical_large'>
                <h1 className='rainbow-font-size-heading_x-large'>Dave's &ldquo;Bath Half&rdquo; Sweepstake</h1>
              </header>
            </div>
          </div>
          <div className="row">
            <div className='col-8'>
              <p>Sponsor me by entering my &ldquo;Bath Half&rdquo; Sweepstake.</p>
              <p>It's £5 to enter&hellip;</p>
              <p>&hellip;if you pick the time that I finish the Bath Half Marathon in&hellip;<br />
                &nbsp;&hellip;you win a prize!</p>
            </div>
            <div className='col-4'>
              <img 
                src="images/bath-half.jpg"
                width="480px"
                height="480px"
                className="img-border"
                alt="dave" />
            </div>
          </div>
          <div className="row">
            <div className='col-12'>
              <div className='rainbow-m-vertical_large'>
                <Sponsorer />
              </div>
            </div>
          </div>
        </header>
        <article>
          <TabInfo />
        </article>
      </section>
    </div>
  )
}

export default App
