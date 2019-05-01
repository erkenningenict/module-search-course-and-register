import * as React from "react";

import { FormikProps } from "formik";

interface IFormItemProps {
  label?: string;
  for?: string;
  name?: string;
  form?: FormikProps<any>;
}

class FormItem extends React.Component<IFormItemProps, {}> {
  public render() {
    return (
      <div
        className={
          "form-group row " +
          (this.hasError(this.props.name) ? "has-error" : "")
        }
      >
        {this.props.label ? (
          <label
            htmlFor={this.props.for}
            className="col-sm-4 col-md-3 control-label"
          >
            {this.props.label}
          </label>
        ) : null}
        <div className="col-sm-8 col-md-9">
          {this.props.children}
          <span className="help-block">{this.getError(this.props.name)}</span>
        </div>
      </div>
    );
  }

  private hasError(name?: string): boolean {
    return this.getError(name) !== undefined && this.getError(name) !== "";
  }

  private getError(name?: string): string {
    if (!name || !this.props.form) {
      return "";
    }

    // Use name for value retrieval
    const parts = name.split(".");
    let value: any = this.props.form.errors;
    for (const part of parts) {
      if (!value) {
        break;
      }
      value = value[part];
    }

    return value;
  }
}

export default FormItem;
