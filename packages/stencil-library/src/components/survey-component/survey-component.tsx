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
  @State() currentPage = 1;

  updateAnswers = (key: string, value: string[]) => {
    this.userAnswers = {
      ...this.userAnswers,
      [key]: value
    }
  }

  handleNextClick = (pagesLength: number) => {
    if (this.currentPage === pagesLength) return
    this.currentPage++;
  }

  handleBackClick = () => {
    if (this.currentPage === 1) return
    this.currentPage--;
  }

  getQuestionComponent = (props) => {
    switch (props.question.type) {
      case 'radiogroup':
        return <radio-question {...props} />
      case 'text':
        return <text-question {...props} />
      case 'checkbox':
        return <checkbox-question {...props} />
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
          {pages.map((page, pageIndex) => (
            <div
              class={{
                'hide': pageIndex !== this.currentPage - 1
              }}
            >
              {
                page?.elements?.map((question, index) => (
                  this.getQuestionComponent({
                    questionNumber: index + 1,
                    question,
                    updateAnswers: this.updateAnswers
                  })
                ))
              }
            </div>
          ))}
        </div>

        <div class='buttons-container'>
          {this.currentPage === 1 ? null : (
            <button
              class='secondary-button'
              onClick={() => this.handleBackClick()}
            >
              back
            </button>
          )}

          <button
            class='primary-button'
            onClick={() => this.handleNextClick(pages?.length)}
          >
            {this.currentPage === pages?.length ? 'submit' : 'next'}
          </button>
        </div>
      </Host>
    )
  }
}
