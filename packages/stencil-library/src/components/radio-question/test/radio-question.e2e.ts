import { newE2EPage } from '@stencil/core/testing';

describe('radio-question', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<radio-question></radio-question>');

    const element = await page.find('radio-question');
    expect(element).toHaveClass('hydrated');
  });
});
