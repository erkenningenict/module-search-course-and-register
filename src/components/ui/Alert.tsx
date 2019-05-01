import * as React from 'react';

interface IAlertProps {
  type?: string;
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
