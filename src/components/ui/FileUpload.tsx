import * as React from 'react';

import { FileUpload as PrimeFileUpload } from 'primereact/components/fileupload/FileUpload';

interface IFileUploadProps {
  id?: string;
  name?: string;
  onSelect?: (e: { originalEvent: Event; files: any }) => void;
}

class FileUpload extends React.Component<IFileUploadProps, {}> {
  public render() {
    return (
      <PrimeFileUpload
        id={this.props.id}
        name={this.props.name}
        chooseLabel="Selecteer een bestand"
        uploadLabel="Uploaden"
        cancelLabel="Annuleren"
        multiple={false}
        maxFileSize={20971520}
        mode="basic"
        onSelect={this.props.onSelect}
      />
    );
  }
}

export default FileUpload;
