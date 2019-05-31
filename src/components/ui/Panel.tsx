import * as React from 'react';

interface IPanelProps {
  title: string;
  doNotIncludeBody?: boolean;
  children: any;
}

export default function Panel(props: IPanelProps) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{props.title}</h3>
      </div>
      {false || props.doNotIncludeBody ? (
        props.children
      ) : (
        <div className="panel-body">{props.children}</div>
      )}
    </div>
  );
}
