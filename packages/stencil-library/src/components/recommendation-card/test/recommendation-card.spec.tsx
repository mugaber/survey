import { newSpecPage } from '@stencil/core/testing';
import { RecommendationCard } from '../recommendation-card';

describe('recommendation-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RecommendationCard],
      html: `<recommendation-card></recommendation-card>`,
    });
    expect(page.root).toEqualHtml(`
      <recommendation-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </recommendation-card>
    `);
  });
});
