import React from 'react';
import { Alert } from '@erkenningen/ui/components/alert';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { useGetCursusSessiesQuery } from '../../generated/graphql';
import { toDutchDate, toDutchMoney } from '@erkenningen/ui/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link, useLocation } from 'react-router-dom';

interface NormalCoursesTableProps {
  searchData: {
    licenseId: string;
    knowledgeAreaId: string;
    themeId: string;
    competenceId: string;
    zipcodeNumbers: string;
    distanceRadius: number;
    from: Date | null;
    to: Date | null;
    isOnlineCourse: boolean;
  };
}

const NormalCoursesTable: React.FC<NormalCoursesTableProps> = (props) => {
  const location = useLocation();
  const searchData = props.searchData && {
    ...props.searchData,
    licenseId: parseInt(props.searchData.licenseId, 10),
    knowledgeAreaId: parseInt(props.searchData.knowledgeAreaId, 10),
    competenceId: parseInt(props.searchData.competenceId, 10),
    themeId: parseInt(props.searchData.themeId, 10),
    zipcodeNumbers: parseInt(props.searchData.zipcodeNumbers, 10) || undefined,
    to: props.searchData.to ? props.searchData.to.toISOString() : null,
    from: props.searchData.from ? props.searchData.from.toISOString() : null,
    isOnlineCourse: props.searchData.isOnlineCourse,
  };
  // eslint-disable-next-line
  const { licenseId, ...searchInput } = searchData;

  const { loading, data, error } = useGetCursusSessiesQuery({
    variables: {
      input: searchInput,
    },
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return (
      <PanelBody>
        <Spinner />
      </PanelBody>
    );
  }

  if (error) {
    return (
      <PanelBody>
        <Alert type="danger">Er is een fout opgetreden, probeer het later opnieuw.</Alert>
      </PanelBody>
    );
  }
  if (!data) {
    return null;
  }

  return (
    <DataTable
      value={data?.CursusSessies}
      dataKey="CursusCode"
      emptyMessage="Geen bijeenkomsten gevonden. Pas uw zoekcriteria aan."
      autoLayout={true}
      loading={loading}
      paginator
      stripedRows
      responsiveLayout={'stack'}
      rows={10}
      rowsPerPageOptions={[10, 25, 50, 100]}
      totalRecords={data?.CursusSessies?.length}
      currentPageReportTemplate="{first} tot {last} van {totalRecords}"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    >
      <Column
        field="Title"
        header={'Title'}
        body={(row) => (
          <Link
            to={`/bijeenkomsten-zoeken/op-locatie/informatie-en-aanmelden/${row.CourseId}${location.search}`}
            title="Bekijk meer informatie en aanmelden"
          >
            {row.Title}
          </Link>
        )}
        sortable={true}
      />
      <Column
        field="Date"
        header="Datum"
        sortable={true}
        body={(row) => <span>{toDutchDate(row.Date)}</span>}
      />
      <Column
        field="StartTime"
        header="Van - tot"
        sortable={true}
        body={(row) => (
          <span>
            {row.StartTime} - {row.EndTime}
          </span>
        )}
      />
      <Column
        field="LocationAddress.City"
        header="Locatie"
        sortable={true}
        body={(row) => <span>{`${row.Organizer} - ${row?.LocationAddress?.City}`}</span>}
      />

      {searchData.distanceRadius !== 0 && (
        <Column
          field="Distance"
          header="Afstand (~ in km)"
          body={(row) => (
            <span>{row?.Distance ? Math.round(row?.Distance / 1000) : 'onbekend'}</span>
          )}
        ></Column>
      )}
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

export default NormalCoursesTable;
