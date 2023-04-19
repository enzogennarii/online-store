import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      prodList: [],
    };
  }

  render() {
    const { prodList } = this.state;
    const emptyList = prodList.length === 0;

    return (
      <section>
        <p data-testid="home-initial-message">
          {emptyList ? 'Digite algum termo de pesquisa ou escolha uma categoria.' : ''}
        </p>
      </section>
    );
  }
}

export default Home;
