import React from 'react';
import Modal from 'react-modal';
import { Button, Icon, Menu as SemanticMenu } from 'semantic-ui-react';
import './Menu.scss';
import { activeComponent } from '../actions/index';
import { connect } from 'react-redux';

const customStyles = {
  content: {
    top: '10%',
    left: '10%',
    right: '10%',
    width: '90%',
    height: '90%',
    bottom: '10%',
    transform: 'translate(-5%, -5%)'
  }
};
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class Menu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="menu_container">
        <div className="menu">
          <div className="playground ui container">
            <SemanticMenu vertical className="menu">
              <SemanticMenu.Item
                name="play"
                color="green"
                onClick={() => {
                  this.props.dispatch(activeComponent('menu'));
                }}
              >
                Menu Główne
                <Icon name="play" color="green" />
              </SemanticMenu.Item>

              <SemanticMenu.Item
                name="play"
                onClick={() => {
                  this.props.dispatch(activeComponent('best_results'));
                }}
              >
                Najlepsze wyniki
                <Icon name="trophy" />
              </SemanticMenu.Item>
            </SemanticMenu>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Menu);
