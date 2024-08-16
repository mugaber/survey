import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'page-component',
  styleUrl: 'page-component.css',
  shadow: true,
})
export class PageComponent {
  @Prop() questions: any;
  @Prop() updateAnswers: (key: string, value: string[]) => void;

  getQuestionComponent = (props) => {
    switch (props.question.type) {
      case 'radiogroup':
        return <radio-question {...props} />
      case 'text':
        return <text-question {...props} />
      case 'checkbox':
        return <checkbox-question {...props} />
      case 'boolean':
        return <boolean-question {...props} />
      default:
        return null
    }
  }

  render() {
    return (
      <Host>
        {this.questions.map((question, index) => {
          const props = {
            questionNumber: index + 1,
            question,
            updateAnswers: this.updateAnswers
          }

          return this.getQuestionComponent(props)
        })}
      </Host>
    );
  }
}
