import React from 'react';

import { FormikProps } from 'formik';

import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { validateField } from '../../shared/Form';
import FormItem from './FormItem';

interface IFormTextProps {
  id: string;
  label: string;
  name?: string;
  value?: string;
  placeholder?: string;
  mask?: string;
  readonly?: boolean;
  keyfilter?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  form?: FormikProps<any>;
  isTextArea?: boolean;
  labelClassNames?: string;
  formControlClassName?: string;
  helpText?: string;
}

class FormText extends React.Component<IFormTextProps, {}> {
  public render() {
    const handleChange = (event: any) => {
      if (this.props.form) {
        this.props.form.handleChange(event);
      }

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };

    const handleBlur = (event: any) => {
      if (this.props.form) {
        this.props.form.handleBlur(event);

        // Trigger validation on blur
        if (this.props.name) {
          validateField(this.props.form, this.props.name);
        }
      }

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    };

    const handleComplete = (event: any) => {
      if (this.props.form) {
        this.props.form.handleBlur(event.originalEvent);

        // Trigger validation on blur
        if (this.props.name) {
          validateField(this.props.form, this.props.name, event.originalEvent.target.value);
        }
      }
    };

    // Show nothing if readonly is true and value is empty
    if (this.props.readonly && !this.getFormValue()) {
      return null;
    }

    return (
      <FormItem
        label={this.props.label}
        for={this.props.id}
        form={this.props.form}
        name={this.props.name}
        labelClassNames={this.props.labelClassNames}
        formControlClassName={this.props.formControlClassName}
        helpText={this.props.helpText}
      >
        {this.props.mask ? (
          <InputMask
            id={this.props.id}
            name={this.props.name}
            placeholder={this.props.placeholder || this.props.label}
            mask={this.props.mask}
            value={this.getFormValue()}
            readonly={this.props.readonly}
            onChange={handleChange}
            onComplete={handleComplete}
            className="form-control"
          />
        ) : this.props.isTextArea ? (
          <InputTextarea
            id={this.props.id}
            name={this.props.name}
            placeholder={this.props.placeholder || this.props.label}
            mask={this.props.mask}
            keyfilter={this.props.keyfilter}
            value={this.getFormValue()}
            readOnly={this.props.readonly}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
          />
        ) : (
          <InputText
            id={this.props.id}
            name={this.props.name}
            placeholder={this.props.placeholder || this.props.label}
            mask={this.props.mask}
            keyfilter={this.props.keyfilter}
            value={this.getFormValue()}
            readOnly={this.props.readonly}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            autoComplete="off"
          />
        )}
      </FormItem>
    );
  }

  private getFormValue(): any {
    if (this.props.value) {
      return this.props.value;
    }

    // Use name value for value retrieval
    if (this.props.form && this.props.name) {
      const parts = this.props.name.split('.');
      let value: any = this.props.form.values;
      for (const part of parts) {
        value = value[part];
      }
      return value;
    }

    return undefined;
  }
}

export default FormText;
