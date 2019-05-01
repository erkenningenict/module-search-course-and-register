import * as React from 'react';
import './Spinner.scss';

interface ISpinnerProps {
  text?: string;
  global?: boolean;
}

class Spinner extends React.Component<ISpinnerProps, {}> {
  public render() {
    return (
      <div className={'ui-spinner ' + (this.props.global ? 'ui-spinner-global' : '')}>
        <i className={'pi pi-spin pi-spinner'} />{' '}
        <span style={{ verticalAlign: 'top' }}>
          {this.props.text ? this.props.text : 'Gegevens laden...'}
        </span>
      </div>
    );
  }
}

export default Spinner;
