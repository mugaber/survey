import { newE2EPage } from '@stencil/core/testing';

describe('recommendation-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<recommendation-card></recommendation-card>');

    const element = await page.find('recommendation-card');
    expect(element).toHaveClass('hydrated');
  });
});
