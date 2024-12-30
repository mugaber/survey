import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
  getFacetFilters,
  getSurveyData,
  getSurveyPages,
  getSurveyQuestions,
  truncateText
} from '../../utils/utils';
import searchIndex from '../../services/algolia';
import recommendationsFallback from '../../data/recommendation';


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
  @State() recommendations: any[];
  @State() showRecommendations = false;
  @State() isIntroTruncated = true;
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
        console.log('Algolia hits:', hits);
        this.isLoading = false;
        this.showRecommendations = true;
        this.recommendations = hits?.length ? hits : recommendationsFallback
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
    const attemptAgain = this.showRecommendations;
    if (attemptAgain) {
      this.showRecommendations = false;
      this.userAnswers = {}
      this.currentPage = 1;
      return;
    }

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

  handleReadClick = () => {
    this.isIntroTruncated = !this.isIntroTruncated
  }

  render() {
    const survey = getSurveyData(this.surveyData)
    const pages = getSurveyPages(survey)
    this.pages = pages

    const allQuestions = getSurveyQuestions(survey)
    const estimatedTime = allQuestions?.length * .5

    const introHtmlString = documentToHtmlString(survey?.intro?.json)
    const truncatedIntro = truncateText(introHtmlString, 200)

    const showErrorMessage = this.unansweredQuestions?.length > 0;
    const hideBackButton = this.currentPage === 1 || this.showRecommendations;

    return (
      <Host>
        <div class="header">
          <p class="label">assessment</p>
          <h1>{survey?.name}</h1>
          <p class="timer">Takes only {estimatedTime} minutes</p>

          <div class='intro-section'>
            <span
              class='intro-container'
              innerHTML={this.isIntroTruncated ? truncatedIntro : introHtmlString}
            />
            <span class='read-button' onClick={this.handleReadClick}>
              Read {this.isIntroTruncated ? 'more' : 'less'}
            </span>
          </div>

          <div class='progress-wrapper'>
            <progress-bar total={pages?.length} progress={this.currentPage} />
          </div>
        </div>

        <div
          class={{
            'pages': true,
            'hide': this.showRecommendations
          }}
        >
          {pages.map((page, pageIndex) => (
            <page-component
              class={{ hide: this.currentPage !== pageIndex + 1 }}
              questions={page.elements}
              updateAnswers={this.updateAnswers}
              unansweredQuestions={this.unansweredQuestions}
            />
          ))}
        </div>

        <div
          class={{
            'recommendations': true,
            'hide': !this.showRecommendations
          }}
        >
          {this.recommendations?.map(recommendation => (
            <recommendation-card
              class='recommendation-card'
              recommendation={recommendation}
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
          {hideBackButton ? null : (
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
              this.showRecommendations
                ? 'Attempt again'
                : this.currentPage === pages?.length ? 'submit' : 'next'
            )}
          </button>
        </div>
      </Host>
    )
  }
}
