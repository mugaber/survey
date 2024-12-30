import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'progress-bar',
  styleUrl: 'progress-bar.css',
  shadow: true,
})
export class ProgressBar {
  @Prop() total: number;
  @Prop() progress: number;

  render() {
    const progressArray = Array.from({ length: this.total }, (_, i) => i + 1);

    return (
      <Host>
        {progressArray.map(index => (
          <div
            class={{
              'progress-bar-item': true,
              'completed': index <= this.progress
            }}
          />
        ))}
      </Host>
    );
  }
}
