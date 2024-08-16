import { gql, useQuery } from '@apollo/client';
import './App.css'
import { SurveyComponent, defineCustomElements } from 'react-library';

defineCustomElements()

const ASSESSMENT_QUERY = gql`
  {
    assessmentCollection {
      items {
        name
        slug
        questions
        intro {
          json
        }
          resultsIntro {
            json
          }
      }
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(ASSESSMENT_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :{error.message}</p>

  return (
    <div className='my-app'>
      <SurveyComponent surveyData={data} />
    </div>
  )
}

export default App
