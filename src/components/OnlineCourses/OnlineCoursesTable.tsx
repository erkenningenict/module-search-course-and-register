import {Alert} from '@erkenningen/ui/components/alert';
import {Spinner} from '@erkenningen/ui/components/spinner';
import {PanelBody} from '@erkenningen/ui/layout/panel';
import {TableResponsive} from '@erkenningen/ui/layout/table';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGetSearchSpecialtiesQuery } from '../../generated/graphql';
import { OnlineCoursesRow } from './OnlineCoursesRow';

interface IOnlineCoursesTable extends RouteComponentProps {
  searchData: {
    licenseId: string;
    knowledgeAreaId: string;
    themeId: string;
    isOnlineCourse: boolean;
  };
}

export function OnlineCoursesTable(props: IOnlineCoursesTable) {
  const searchData = props.searchData && {
    ...props.searchData,
    licenseId: parseInt(props.searchData.licenseId, 10),
    knowledgeAreaId: parseInt(props.searchData.knowledgeAreaId, 10),
    themeId: parseInt(props.searchData.themeId, 10),
    isOnlineCourse: props.searchData.isOnlineCourse,
  };
  // eslint-disable-next-line
  const {licenseId, ...searchInput} = searchData;

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

  if (!data) {
    return null;
  }

  return (
    <TableResponsive>
      <table className="table table-striped" key="table">
        <thead>
          <tr key="headerRow">
            <th>Titel</th>
            <th>Organisator</th>
            <th className="text-right">Prijs (excl. btw)</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.SearchSpecialties &&
            data?.SearchSpecialties?.map((item) => {
              return <OnlineCoursesRow {...props} key={item.Code} row={item} />;
            })}
          {!data || data?.SearchSpecialties?.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <Alert type="info">Geen bijeenkomsten gevonden. Pas uw zoekcriteria aan.</Alert>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </TableResponsive>
  );
}
