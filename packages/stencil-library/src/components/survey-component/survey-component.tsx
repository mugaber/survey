import { Component, Host, Prop, State, h } from '@stencil/core';
import mockSurveyData from '../../data/surveyData'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
  getSurveyData,
  getSurveyPages,
  getSurveyQuestions,
  truncateText
} from '../../utils/utils';

@Component({
  tag: 'survey-component',
  styleUrl: 'survey-component.css',
  shadow: true,
})
export class SurveyComponent {
  @Prop() surveyData: any;
  @State() userAnswers: any;

  updateAnswers = (key: string, value: string[]) => {
    this.userAnswers = {
      ...this.userAnswers,
      [key]: value
    }
  }

  getQuestionComponent = (props) => {
    switch (props.question.type) {
      case 'radiogroup':
        return <radio-question {...props} />
      case 'text':
        return <text-question {...props} />
      default:
        return null
    }
  }

  render() {
    const survey = getSurveyData(mockSurveyData)
    const pages = getSurveyPages(survey)
    const allQuestions = getSurveyQuestions(survey)
    const estimatedTime = allQuestions?.length * .5
    const introHtmlString = documentToHtmlString(survey?.intro?.json)
    const truncatedIntro = truncateText(introHtmlString, 200)

    return (
      <Host>
        <div class="header">
          <p class="label">assessment</p>
          <h1>{survey?.name}</h1>
          <p class="timer">Takes only {estimatedTime} minutes</p>
          <div class="intro-container" innerHTML={truncatedIntro} />
        </div>

        <div class='pages'>
          {pages[0]?.elements?.map((question, index) => (
            this.getQuestionComponent({
              questionNumber: index + 1,
              question,
              updateAnswers: this.updateAnswers
            })
          ))}
        </div>
      </Host>
    )
  }
}
