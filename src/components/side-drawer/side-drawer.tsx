import {Component, h, Method, Prop, State} from '@stencil/core';

@Component({
  tag: 'side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})
export class SideDrawer {

  @State() showContactInfo = false;

  @Prop({ reflect: true }) drawerTitle: string;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  open() {
    this.opened = true;
    return Promise.resolve()
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 49802384032</li>
            <li>
              E-Mail:
              <a href="mailto:something@something.com">
                something@something.com
              </a>
            </li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}/>,
      <aside>
        <header>
          <h1>{this.drawerTitle}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}
          >
            Navigation
          </button>
          <button
            class={this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'contact')}
          >
            Contact
          </button>
        </section>
        <main>{mainContent}</main>
      </aside>
    ];
  }

}
