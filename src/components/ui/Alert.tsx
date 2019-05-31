import * as React from 'react';

interface IAlertProps {
  type?: 'danger' | 'info' | 'warning' | 'success';
}

class Alert extends React.Component<IAlertProps, {}> {
  public render() {
    return (
      <div className={'alert alert-' + (this.props.type || 'danger')} role="alert">
        {this.props.children}
      </div>
    );
  }
}

export default Alert;
