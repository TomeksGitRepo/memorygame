import React from 'react';

import { connect } from 'react-redux';
import Card from './Card';
import Timer from './Timer';
import { Button, Icon, Menu, Label } from 'semantic-ui-react';
import Header from './Header';
import ScoreBoard from './ScoreBoard';
import { resetTime, fetchRecords, activeComponent } from '../actions';
import Start from '../graphics/menu/start-100.png';

interface IPlayGround {
  frameworks: string[];
  duplicatedFrameworks: string[];
  randomizedFrameworks: string[];
  finalizedFrameworks: ICard[];
  openedFrameworks: ICard[];
  playClicked: boolean;
  gameFinished: boolean;
  activeComponent: string;
}

interface ICard {
  index: number;
  name: string;
  close?: boolean;
  complete?: boolean;
  fail?: boolean;
}

class PlayGround extends React.Component<any, IPlayGround> {
  store: any;

  constructor(props: any) {
    super(props);
    this.state = {
      frameworks: [
        'pies',
        'shake',
        'pilkarz',
        'kucharz',
        'czytelniczka',
        'jogurt',
        'kluski',
        'maslo',
        'mleko',
        'ser',
        'silacz',
        'smietana',
        'cytryna',
        'deska',
        'karton',
        'kotka',
        'marchew',
        'napis'
      ],
      duplicatedFrameworks: [],
      randomizedFrameworks: [],
      finalizedFrameworks: [],
      openedFrameworks: [],
      playClicked: false,
      gameFinished: false,
      activeComponent: 'main'
    };
  }

  throttle(callback: any, limit: any) {
    var wait = false;
    return function() {
      if (!wait) {
        callback.apply(null, arguments);
        wait = true;
        setTimeout(function() {
          wait = false;
        }, limit);
      }
    };
  }

  handleClick(name: string, index: number) {
    if (this.state.openedFrameworks.length == 2) {
      setTimeout(() => {
        this.check();
      }, 750);
    } else {
      let framework = {
        name,
        index
      };
      let finalizedFrameworks = this.state.finalizedFrameworks;
      let frameworks = this.state.openedFrameworks;
      finalizedFrameworks[index].close = false;
      frameworks.push(framework);
      this.setState({
        openedFrameworks: frameworks,
        finalizedFrameworks: finalizedFrameworks
      });
      if (this.state.openedFrameworks.length == 2) {
        setTimeout(() => {
          this.check();
        }, 750);
      }
    }
  }
  check() {
    let finalizedFrameworks = this.state.finalizedFrameworks;
    if (!this.state.openedFrameworks[0] || !this.state.openedFrameworks[1]) {
      return;
    }
    if (
      this.state.openedFrameworks[0].name ==
        this.state.openedFrameworks[1].name &&
      this.state.openedFrameworks[0].index !=
        this.state.openedFrameworks[1].index
    ) {
      finalizedFrameworks[this.state.openedFrameworks[0].index].complete = true;
      finalizedFrameworks[this.state.openedFrameworks[1].index].complete = true;
    } else {
      finalizedFrameworks[this.state.openedFrameworks[0].index].close = true;
      finalizedFrameworks[this.state.openedFrameworks[1].index].close = true;
    }
    this.setState({
      finalizedFrameworks,
      openedFrameworks: []
    });
    if (this.checkIfGameEnded(finalizedFrameworks)) {
      console.log('Game ended.');
      this.setState({ playClicked: false });
      this.setState({ gameFinished: true });
    }
  }

  checkIfGameEnded(elementsArray: ICard[]): boolean {
    for (let i = 0; i < elementsArray.length; i++) {
      if (elementsArray[i].complete === false) {
        return false;
      }
    }
    return true;
  }
  start() {
    this.finish();
    this.props.dispatch(resetTime());
    this.props.dispatch(fetchRecords());
    setTimeout(() => {
      this.setState({ playClicked: true });
      console.log('Function start() called!.');
      let finalizedFrameworks: ICard[] = [];
      this.setState({
        duplicatedFrameworks: this.state.frameworks.concat(
          this.state.frameworks
        )
      });
      console.log(
        'this.state.duplicatedFrameworks = ',
        this.state.duplicatedFrameworks
      );
      setTimeout(() => {
        this.setState({
          randomizedFrameworks: this.shuffle(this.state.duplicatedFrameworks)
        });
        this.state.randomizedFrameworks.map((name, index) => {
          finalizedFrameworks.push({
            index, //MY edition
            name,
            close: true,
            complete: false,
            fail: false
          });
        });
        this.setState({ finalizedFrameworks, gameFinished: false });
      }, 1); //Need to slow down by 1 ms
    }, 1);
  }

  finish() {
    this.setState({ playClicked: false });
  }

  shuffle(array: string[]) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    console.log('array in shuffle', array);
    return array;
  }

  render() {
    return (
      <div className="playground ui container">
        <Header />
        <Menu vertical className="menu">
          <Menu.Item name="play" color="green" onClick={() => this.start()}>
            <img className="ui centered small image" src={Start} />
            {/* <Icon name="play" color="green" /> */}
          </Menu.Item>

          <Menu.Item
            name="play"
            onClick={() => {
              this.props.dispatch(activeComponent('best_results'));
            }}
          >
            Najlepsze wyniki
            <Icon name="trophy" />
          </Menu.Item>
        </Menu>

        {this.state.finalizedFrameworks.map((framework, index) => {
          return (
            <Card
              framework={framework.name}
              click={() => {
                this.throttle(this.handleClick(framework.name, index), 1000);
              }}
              close={framework.close}
              complete={framework.complete}
            />
          );
        })}
        {this.state.playClicked ? <Timer /> : null}
        {this.state.gameFinished ? <ScoreBoard /> : null}
      </div>
    );
  }
}

export default connect()(PlayGround);
