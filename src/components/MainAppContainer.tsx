import React from 'react';

import { connect } from 'react-redux';
import Playground from './PlayGround';
import BestResultsDisplayer from './BestResultDisplayer';
import { activeComponent, fetchRecords } from '../actions';

class MainAppContainer extends React.Component<any, any> {
  store: any;

  constructor(props: any) {
    super(props);
    this.state = {
      activeComponent: 'main'
    };
    this.props.dispatch(activeComponent('main')); //TODO change this to main after BestResultsDisplayerEndsTesting
    this.props.dispatch(fetchRecords());
  }

  render() {
    if (this.props.activeComponent === 'best_results') {
      return <BestResultsDisplayer />;
    } else {
      //this.props.activeComponent === 'main'
      return <Playground />;
    }
  }
}

function mapStateToProps(state: any) {
  return { activeComponent: state.activeComponent };
}

export default connect(mapStateToProps)(MainAppContainer);
