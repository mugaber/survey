import { newE2EPage } from '@stencil/core/testing';

describe('checkbox-question', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<checkbox-question></checkbox-question>');

    const element = await page.find('checkbox-question');
    expect(element).toHaveClass('hydrated');
  });
});
