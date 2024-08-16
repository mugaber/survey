import { Component, Host, Prop, State, h } from '@stencil/core';
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

  updateAnswers = (key: string, value: string[]) => {
    this.userAnswers = {
      ...this.userAnswers,
      [key]: value
    }
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

  handleNextClick = (pagesLength: number) => {
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
            <page-component
              class={{ hide: this.currentPage !== pageIndex + 1 }}
              questions={page.elements}
              updateAnswers={this.updateAnswers}
            />
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
