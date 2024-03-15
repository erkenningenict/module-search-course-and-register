import React from 'react';
import { Alert } from '@erkenningen/ui/components/alert';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { useGetSearchSpecialtiesQuery } from '../../generated/graphql';
import { toDutchMoney } from '@erkenningen/ui';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Link } from 'react-router-dom';

interface OnlineCoursesTableProps {
  searchData: {
    licenseId: string;
    knowledgeAreaId: string;
    themeId: string;
    isOnlineCourse: boolean;
  };
}

const OnlineCoursesTable: React.FC<OnlineCoursesTableProps> = (props) => {
  const searchData = props.searchData && {
    ...props.searchData,
    licenseId: parseInt(props.searchData.licenseId, 10),
    knowledgeAreaId: parseInt(props.searchData.knowledgeAreaId, 10),
    themeId: parseInt(props.searchData.themeId, 10),
    isOnlineCourse: props.searchData.isOnlineCourse,
  };
  // eslint-disable-next-line
  const { licenseId, ...searchInput } = searchData;

  const { loading, data, error } = useGetSearchSpecialtiesQuery({
    variables: {
      input: searchInput,
    },
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return (
      <PanelBody key="1">
        <Spinner />
      </PanelBody>
    );
  }

  if (error) {
    return (
      <PanelBody key="2">
        <Alert type="danger" key="1">
          Er is een fout opgetreden, probeer het later opnieuw.
        </Alert>
      </PanelBody>
    );
  }

  return (
    <DataTable
      value={data?.SearchSpecialties}
      dataKey="SpecialtyId"
      emptyMessage="Geen bijeenkomsten gevonden. Pas uw zoekcriteria aan."
      loading={loading}
      paginator
      responsiveLayout={'stack'}
      stripedRows
      rows={25}
      rowsPerPageOptions={[10, 25, 50, 100]}
      totalRecords={data?.SearchSpecialties?.length}
      currentPageReportTemplate="{first} tot {last} van {totalRecords}"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    >
      <Column
        field="Title"
        header="Titel"
        body={(row) => (
          <Link
            to={`/bijeenkomsten-zoeken/online/informatie-en-aanmelden/${row.SpecialtyId}${location.search}`}
            title="Bekijk meer informatie en aanmelden"
          >
            {row.Title}
          </Link>
        )}
        sortable={true}
      />
      <Column
        field="Organizer"
        header="Organisator"
        sortable={true}
        body={(row) => <span>{row.Organizer}</span>}
      />

      <Column
        field="Price"
        header="Prijs (excl. btw)"
        bodyStyle={{ textAlign: 'right' }}
        sortable={true}
        body={(row) => toDutchMoney(row.Price, { euroPrefix: true })}
      />
    </DataTable>
  );
};

export default OnlineCoursesTable;
