import React from 'react';
import front from '../graphics/cards/front100.png'; //Old version of front
import napis from '../graphics/cards/napis.png';
import cytryna from '../graphics/cards/cytryna.png';
import deska from '../graphics/cards/deska.png';
import czytelniczka from '../graphics/cards/czytelniczka.png';
import jogurt from '../graphics/cards/jogurt.png';
import karton from '../graphics/cards/karton.png';
import kluski from '../graphics/cards/kluski.png';
import kotka from '../graphics/cards/kotka.png';
import kucharz from '../graphics/cards/kucharz.png';
import maslo from '../graphics/cards/maslo.png';
import marchew from '../graphics/cards/marchewka.png';
import pies from '../graphics/cards/pies.png';
import mleko from '../graphics/cards/mleko.png';
import pilkarz from '../graphics/cards/pilkarz.png';
import ser from '../graphics/cards/ser.png';
import shake from '../graphics/cards/shake.png';
import silacz from '../graphics/cards/silacz.png';
import smietana from '../graphics/cards/smietana.png';

interface IProps {
  click: () => void;
  close?: boolean | undefined;
  complete?: boolean | undefined;
  framework: string;
  hideFront?: boolean;
}

export default class Card extends React.Component<IProps, IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      hideFront: true,
      click: () => '',
      framework: 'anything'
    };
  }
  clicked(framework: string) {
    this.props.click(); //ME removed framework
    this.setState({
      hideFront: false
    });
    setTimeout(() => {
      this.checkIfCardNotFinishedAndHide();
    }, 3000);
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

  checkIfCardNotFinishedAndHide() {
    console.log('this:', this);
    console.log('card complete:', this.props.complete);
    if (this.props.complete || !this.props.close) {
      return;
    } else {
      this.setState({
        hideFront: true
      });
    }
  }

  imgSrc(): string | undefined {
    if (this.state.hideFront && !this.state.complete) {
      return front;
    }
    switch (this.props.framework) {
      case 'deska':
        return deska;
      case 'napis':
        return napis;
      case 'marchew':
        return marchew;
      case 'kotka':
        return kotka;
      case 'karton':
        return karton;
      case 'cytryna':
        return cytryna;
      case 'pies':
        return pies;
      case 'shake':
        return shake;
      case 'pilkarz':
        return pilkarz;
      case 'kucharz':
        return kucharz;
      case 'czytelniczka':
        return czytelniczka;
      case 'jogurt':
        return jogurt;
      case 'kluski':
        return kluski;
      case 'maslo':
        return maslo;
      case 'mleko':
        return mleko;
      case 'ser':
        return ser;
      case 'silacz':
        return silacz;
      case 'smietana':
        return smietana;
      default:
        return undefined;
    }
  }
  render() {
    return (
      <div
        className={
          'card' +
          (!this.props.close ? ' opened' : '') +
          (this.props.complete ? ' matched' : '')
        }
        onClick={() => this.throttle(this.clicked(this.props.framework), 750)}
      >
        <div className="front">
          <img src={front} />
        </div>
        <div className="back">
          <img src={this.imgSrc()} />
        </div>
      </div>
    );
  }
}
