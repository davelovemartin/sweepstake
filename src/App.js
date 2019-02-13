import React from 'react'
import Button from 'react-rainbow-components/components/Button'

function App() {
  return (
      <Button
          label="Hello World!"
          variant="brand"
          onClick={() => alert('Hello World!')}
      />
  );
}

export default App;
