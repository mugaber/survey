import { newSpecPage } from '@stencil/core/testing';
import { RadioQuestion } from '../radio-question';

describe('radio-question', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RadioQuestion],
      html: `<radio-question></radio-question>`,
    });
    expect(page.root).toEqualHtml(`
      <radio-question>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </radio-question>
    `);
  });
});
