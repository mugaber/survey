import { Component, Host, Prop, State, h } from '@stencil/core';
import { RadioQuestionType } from '../../utils/types';

@Component({
  tag: 'checkbox-question',
  styleUrl: 'checkbox-question.css',
  shadow: true,
})
export class CheckboxQuestion {
  @Prop() questionNumber: number;
  @Prop() question: RadioQuestionType;
  @Prop() updateAnswers: (key: string, value: string[]) => void;
  @State() selectedChoices: string[] = [];

  handleCheckboxChange = (event: Event) => {
    event.stopPropagation()
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (target.checked) {
      this.selectedChoices = [...this.selectedChoices, value];
    } else {
      this.selectedChoices = this.selectedChoices.filter(choice => choice !== value);
    }

    this.updateAnswers(this.question.name, this.selectedChoices);
  }

  render() {
    return (
      <Host>
        <div class='question'>
          <h4>{`${this.questionNumber}. ${this.question.title}`}</h4>

          <div class='choices'>
            {this.question.choices.map(choice => (
              <div class={{
                'choice': true,
                'selected': this.selectedChoices.includes(choice)
              }}
                onChange={this.handleCheckboxChange}
              >
                <input
                  type='checkbox'
                  id={choice}
                  name={this.question.name}
                  value={choice}
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
