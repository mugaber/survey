import { newSpecPage } from '@stencil/core/testing';
import { CheckboxQuestion } from '../checkbox-question';

describe('checkbox-question', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CheckboxQuestion],
      html: `<checkbox-question></checkbox-question>`,
    });
    expect(page.root).toEqualHtml(`
      <checkbox-question>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </checkbox-question>
    `);
  });
});
