import * as React from 'react';

interface IPanelProps {
  title: string;
}

class Panel extends React.Component<IPanelProps, {}> {
  public render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          <div className="contents">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Panel;
