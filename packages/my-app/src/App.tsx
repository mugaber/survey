import './App.css'
import { SurveyComponent, defineCustomElements } from 'react-library';

defineCustomElements()

function App() {

  return (
    <div className='my-app'>
      <SurveyComponent surveyData={[]} />
    </div>
  )
}

export default App
