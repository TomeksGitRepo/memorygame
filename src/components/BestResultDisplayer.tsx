import React from 'react';

import { connect } from 'react-redux';
import Menu from './Menu';

class BestResultDisplayer extends React.Component<any, any> {
  store: any;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Menu />
        <table className="ui celled table">
          <thead>
            <tr>
              <th className="center aligned">Miejsce</th>
              <th className="center aligned">Nick</th>
              <th className="center aligned">Czas</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dbRecords == null
              ? null
              : this.props.dbRecords.map((result: any, iterator: any) => {
                  return (
                    <tr>
                      <td className="center aligned" data-label="Miejsce">
                        {iterator + 1}
                      </td>
                      <td className="center aligned" data-label="Nick">
                        {result.nick}
                      </td>
                      <td className="center aligned" data-label="Czas">
                        {result.time.toFixed(2)} sekundy
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return { activeComponent: state.activeComponent, dbRecords: state.dbRecords };
}

export default connect(mapStateToProps)(BestResultDisplayer);
