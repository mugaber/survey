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
    const target = event.target as HTMLInputElement;
    target.click()
    const value = target.value;

    if (target.checked) {
      this.selectedChoices = [...this.selectedChoices, value];
    } else {
      this.selectedChoices = this.selectedChoices.filter(choice => choice !== value);
    }

    this.updateAnswers(this.question.name, this.selectedChoices);
  }

  handleParentClick = (event: Event) => {
    const div = event.target as HTMLDivElement;
    const input = div.querySelector('input[type="checkbox"]') as HTMLInputElement;
    if (input) input.click()
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
                onClick={this.handleParentClick}
              >
                <input
                  type='checkbox'
                  id={choice}
                  name={this.question.name}
                  value={choice}
                  onChange={this.handleCheckboxChange}
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
