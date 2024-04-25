import { Component, h } from '@stencil/core';

@Component({
  tag: 'stock-spinner',
  styleUrl: './stock-spinner.css',
  shadow: true
})
export class StockSpinner {
  render() {
    return (
      <div class="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
