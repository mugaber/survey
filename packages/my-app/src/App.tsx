import './App.css'
import { MyComponent, defineCustomElements } from 'react-library';

defineCustomElements()

function App() {

  return (
    <div className='my-app'>
      <MyComponent first="Mohamed" last="Gaber" />
    </div>
  )
}

export default App
