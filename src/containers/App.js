import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Board from './Board';
import Tickets from './Tickets';
import Header from '../components/Header/Header';
import TaskCard from './TaskCard';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

class App extends Component {
  render() {
    const lanes = [
      { id: 1, title: 'No Sign of Intellegence' },
      { id: 2, title: 'Plain Stupid' },
      { id: 3, title: 'Can Hold A Job At Least' },
      { id: 4, title: 'Smart Cookie' },
      { id: 5, title: 'Hyper Intelligent' },
    ];

    return (
      <>
        <GlobalStyle />
        <AppWrapper>
          <Header />
          <Board
            lanes={lanes}
            dataSource={'../../assets/data.json'}
          />
          <Tickets
            dataSource={'../../assets/data.json'}
          />
        </AppWrapper>
      </>
    );
  }
}

export default App;
