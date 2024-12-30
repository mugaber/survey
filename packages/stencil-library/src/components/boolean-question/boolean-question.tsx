import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'boolean-question',
  styleUrl: 'boolean-question.css',
  shadow: true,
})
export class BooleanQuestion {
  @Prop() questionNumber: number;
  @Prop() question: any;
  @Prop() updateAnswers: (key: string, value: string[]) => void;
  @State() selectedChoice: string;

  handleClick = (value) => {
    this.selectedChoice = value;
    this.updateAnswers(this.question.name, [value]);
  }

  render() {
    const { labelTrue, labelFalse } = this.question;

    return (
      <Host>
        <div class='question'>
          <h4>{`${this.questionNumber}. ${this.question.title}`}</h4>

          <div class='choices'>
            <div
              class={{
                'selected': this.selectedChoice === labelTrue
              }}
              onClick={() => this.handleClick(labelTrue)}
            >
              {labelTrue}
            </div>
            /
            <div
              class={{
                'selected': this.selectedChoice === labelFalse
              }}
              onClick={() => this.handleClick(labelFalse)}
            >
              {labelFalse}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
