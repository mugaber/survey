import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'recommendation-card',
  styleUrl: 'recommendation-card.css',
  shadow: true,
})
export class RecommendationCard {
  @Prop() recommendation: any;

  render() {
    const { title, description, type, image, author } = this.recommendation || {};

    return (
      <Host>
        <div class='card'>
          <div class='card-header'>
            <h3>{title}</h3>
          </div>

          <div class='card-body'>
            <div class='author'>
              <img src={image} alt={author} />
            </div>
            <p>{type} by {author}</p>
            <p>{description}</p>
          </div>
        </div>
      </Host>
    );
  }
}