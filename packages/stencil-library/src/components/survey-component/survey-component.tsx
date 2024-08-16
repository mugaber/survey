import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import mockSurveyData from '../../data/surveyData'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
  getFacetFilters,
  getSurveyData,
  getSurveyPages,
  getSurveyQuestions,
  truncateText
} from '../../utils/utils';
import searchIndex from '../../services/algolia';

@Component({
  tag: 'survey-component',
  styleUrl: 'survey-component.css',
  shadow: true,
})
export class SurveyComponent {
  @Prop() surveyData: any;
  @State() userAnswers: any;
  @State() currentPage = 1;
  @State() isLoading = false;
  @State() unansweredQuestions: any;
  pages: any;

  updateAnswers = (key: string, value: string[]) => {
    this.userAnswers = {
      ...this.userAnswers,
      [key]: value
    }
  }

  @Watch('userAnswers')
  watchHandler(newValue: any) {
    const userAnswersKeys = Object.keys(newValue)
    const wasUnAnswered = userAnswersKeys?.some(
      key => this.unansweredQuestions?.includes(key)
    )

    if (!wasUnAnswered) return
    this.unansweredQuestions = this.unansweredQuestions?.filter(
      question => !userAnswersKeys?.includes(question)
    )
  }

  handleSubmit = () => {
    const filters = getFacetFilters(this.userAnswers)
    if (!filters?.length) return

    this.isLoading = true;
    searchIndex.search('', {
      facetFilters: filters
    }).then(({ hits }) => {
      setTimeout(() => {
        console.log(hits);
        this.isLoading = false;
      }, 1000)
    }).catch((err) => {
      this.isLoading = false
      console.log('Error getting algolia results:', err)
    })
  }

  getUnAnsweredQuestions = () => {
    const pageQuestions = this.pages[this.currentPage - 1].elements;
    const unansweredQuestions = pageQuestions.filter(question => {
      return !this.userAnswers?.[question.name]
    }).map(question => question.name);
    return unansweredQuestions;
  }

  handleNextClick = (pagesLength: number) => {
    const unansweredQuestions = this.getUnAnsweredQuestions();
    if (unansweredQuestions?.length) {
      return this.unansweredQuestions = unansweredQuestions;
    }

    if (this.currentPage === pagesLength) return this.handleSubmit()
    this.currentPage++;
  }

  handleBackClick = () => {
    if (this.currentPage === 1) return
    this.currentPage--;
  }

  render() {
    const survey = getSurveyData(mockSurveyData)
    const pages = getSurveyPages(survey)
    this.pages = pages

    const allQuestions = getSurveyQuestions(survey)
    const estimatedTime = allQuestions?.length * .5

    const introHtmlString = documentToHtmlString(survey?.intro?.json)
    const truncatedIntro = truncateText(introHtmlString, 200)

    const showErrorMessage = this.unansweredQuestions?.length > 0;

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
            <page-component
              class={{ hide: this.currentPage !== pageIndex + 1 }}
              questions={page.elements}
              updateAnswers={this.updateAnswers}
              unansweredQuestions={this.unansweredQuestions}
            />
          ))}
        </div>

        {showErrorMessage && (
          <div class='error-message'>
            <p>Please answer all questions before continuing</p>
          </div>
        )}

        <div
          class={{
            'buttons-container': true,
            'reduce-margin': showErrorMessage
          }}
        >
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
            {this.isLoading ? (
              <div class='loader' />
            ) : (
              this.currentPage === pages?.length ? 'submit' : 'next'
            )}
          </button>
        </div>
      </Host>
    )
  }
}
