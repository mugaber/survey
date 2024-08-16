import { newE2EPage } from '@stencil/core/testing';

describe('survey-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<survey-component></survey-component>');

    const element = await page.find('survey-component');
    expect(element).toHaveClass('hydrated');
  });
});
