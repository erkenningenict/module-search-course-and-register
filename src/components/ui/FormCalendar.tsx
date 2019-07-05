import { Datepicker } from '@erkenningen/ui';
import { FormikProps } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { validateField } from '../../shared/Form';
import FormItem from './FormItem';

interface IFormCalendarProps {
  id: string;
  label: string;
  name?: string;
  value?: any;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  form?: FormikProps<any>;
  labelClassNames?: string;
  formControlClassName?: string;
}

class FormCalendar extends React.Component<IFormCalendarProps, {}> {
  public render() {
    const handleChange = (event: any) => {
      if (this.props.form && this.props.name) {
        this.props.form.setFieldValue(this.props.name, event.originalEvent.target.value);
      }

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };

    const handleBlur = (event: any) => {
      if (this.props.form) {
        this.props.form.handleBlur(event);

        // Trigger validation
        if (this.props.name) {
          const value = this.getFormValue();
          // Parse date
          const parsedDate = moment(value, 'DD-MM-YYYY').toDate();
          if (parsedDate instanceof Date && !isNaN(parsedDate as any)) {
            this.props.form.setFieldValue(this.props.name, parsedDate);
            validateField(this.props.form, this.props.name, parsedDate);
          } else {
            validateField(this.props.form, this.props.name, value);
          }
        }
      }

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    };

    const handleSelect = (event: any) => {
      if (this.props.form && this.props.name) {
        this.props.form.setFieldValue(this.props.name, event.value);
        validateField(this.props.form, this.props.name, event.value);
      }
    };

    return (
      <FormItem
        label={this.props.label}
        for={this.props.id}
        form={this.props.form}
        name={this.props.name}
        labelClassNames={this.props.labelClassNames}
        formControlClassName={this.props.formControlClassName}
      >
        <Datepicker
          id={this.props.id}
          dateFormat="dd-mm-yy"
          value={this.getFormValue()}
          disabled={this.props.readonly}
          onChange={handleChange}
          onSelect={handleSelect}
          onBlur={handleBlur}
          placeholder={this.props.placeholder}
          showIcon={true}
          showWeek={true}
        />
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

export default FormCalendar;
