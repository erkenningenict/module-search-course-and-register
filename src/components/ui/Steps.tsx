import * as React from 'react';

import classNames from 'classnames';

import './Steps.scss';

interface IStepsProps {
  steps: IStep[];
  activeIndex: number;
}

export interface IStep {
  title: string;
}

export class Steps extends React.Component<IStepsProps, {}> {
  public render() {
    return (
      <div className="ui-steps">
        {this.props.steps.map((step, index) => (
          <div
            className={classNames('ui-step', {
              'ui-step-active': index === this.props.activeIndex,
              'ui-step-complete': index < this.props.activeIndex,
            })}
            key={index}
          >
            <div className="ui-step-line" />
            <div className="ui-step-circle">
              <i
                className={classNames({
                  'fas fa-check-circle': index < this.props.activeIndex,
                  'far fa-dot-circle': index === this.props.activeIndex,
                  'far fa-circle': index > this.props.activeIndex,
                })}
              />
            </div>
            <div className="ui-step-line" />
            <div className="ui-step-title">{step.title}</div>
          </div>
        ))}
      </div>
    );
  }
}
