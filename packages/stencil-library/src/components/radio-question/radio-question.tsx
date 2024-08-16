import { Component, Host, Prop, State, h } from '@stencil/core';
import { RadioQuestionType } from '../../utils/types';

@Component({
  tag: 'radio-question',
  styleUrl: 'radio-question.css',
  shadow: true,
})
export class RadioQuestion {
  @Prop() questionNumber: number;
  @Prop() question: RadioQuestionType;
  @Prop() updateAnswers: (key: string, value: string[]) => void;
  @State() selectedChoice: string;

  handleRadioChange = (event: Event) => {
    const target = event.target as HTMLElement
    const input = target.querySelector('input[type="radio"]') as HTMLInputElement
    if (!input) return

    this.selectedChoice = input.value
    input.checked = true
    this.updateAnswers(this.question.name, [input.value])
  }

  render() {
    const questionChoices = this.question.choices;
    if (!questionChoices?.length) return null;

    return (
      <Host>
        <div class='question'>
          <h4>{`${this.questionNumber}. ${this.question.title}`}</h4>

          <div class='choices'>
            {this.question.choices.map((choice) => (
              <div
                class={{
                  choice: true,
                  selected: this.selectedChoice === choice
                }}
                onClick={this.handleRadioChange}
              >
                <input
                  type='radio'
                  id={choice}
                  value={choice}
                  name={this.question.name}
                />
                <label htmlFor={choice}>{choice}</label>
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
