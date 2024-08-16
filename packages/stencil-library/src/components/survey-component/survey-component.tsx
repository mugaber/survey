import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'survey-component',
  styleUrl: 'survey-component.css',
  shadow: true,
})
export class SurveyComponent {
  @Prop() surveyData: any;

  connectedCallback() {
    console.log('Survey component connected')
    console.log({ surveyData: this.surveyData })
  }

  render() {
    return (
      <Host>
        <div>
          <h1>Survey component</h1>
          <p>This is a survey component made with stencil and react.</p>
        </div>
      </Host>
    )
  }
}
