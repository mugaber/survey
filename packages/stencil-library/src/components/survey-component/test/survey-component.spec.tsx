import { newSpecPage } from '@stencil/core/testing';
import { SurveyComponent } from '../survey-component';

describe('survey-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SurveyComponent],
      html: `<survey-component></survey-component>`,
    });
    expect(page.root).toEqualHtml(`
      <survey-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </survey-component>
    `);
  });
});
