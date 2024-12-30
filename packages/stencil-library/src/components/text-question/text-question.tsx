import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'text-question',
  styleUrl: 'text-question.css',
  shadow: true,
})
export class TextQuestion {
  @Prop() questionNumber: number;
  @Prop() question: any;
  @Prop() updateAnswers: (key: string, value: string[]) => void;

  handleTextChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement
    this.updateAnswers(this.question.name, [target.value])
  }

  render() {
    return (
      <Host>
        <div class='question'>
          <h4>{`${this.questionNumber}. ${this.question.title}`}</h4>

          <div class='input'>
            <textarea
              name={this.question.name}
              placeholder='Type your answer here...'
              onChange={this.handleTextChange}
            />
          </div>
        </div>
      </Host>
    );
  }
}
