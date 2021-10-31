import React from 'react';
import Modal from 'react-modal';
import scoreBoardImage from '../graphics/scoreBoard/gratulacje.png';
import './ScoreBoard.scss';
import { connect } from 'react-redux';
import SaveRecordForm from './SaveRecordForm';

const customStyles = {
  content: {
    top: '20%',
    left: '20%',
    right: '10%',
    width: '60%',
    height: '60%',
    bottom: '10%',
    transform: 'translate(-5%, -5%)',
    background: 'rgba(255, 255, 255, 0)',
    border: 'none'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class ScoreBoard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      modalIsOpen: true,
      showSaveRecordForm: false,
      subtitle: {
        style: {
          color: '#f00'
        }
      }
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.state.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  checkIfTimeIsNewRecord() {
    if (this.props.worstRecord > this.props.finishTime) {
      return <SaveRecordForm time={this.props.finishTime} />;
    }
  }

  render() {
    return (
      <div className="ui container">
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {this.checkIfTimeIsNewRecord()}
          <br />
          <img
            className="ui centered image score_modal"
            src={scoreBoardImage}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  let worstTimeRecord;
  if (state.dbRecords) {
    worstTimeRecord = state.dbRecords[state.dbRecords.length];
  }
  let worstRecord;
  if (worstTimeRecord) {
    worstRecord = worstTimeRecord.time;
  } else {
    worstRecord = 999;
  }
  return {
    dbRecords: state.dbRecords,
    worstRecord,
    finishTime: state.finishTime
  };
}

export default connect(mapStateToProps)(ScoreBoard);
