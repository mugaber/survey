import { Component, Host, Prop, h } from '@stencil/core';
import mockSurveyData from '../../data/surveyData'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
  getSurveyData,
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

  render() {
    const survey = getSurveyData(mockSurveyData)
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
      </Host>
    )
  }
}
