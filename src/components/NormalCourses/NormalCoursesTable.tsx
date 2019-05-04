import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { toDutchMoney } from '../../helpers/number-utils';
import { IFindNormalCoursesRow } from '../../types/IFindNormalCoursesRow';
import Spinner from '../ui/Spinner';
import { toDutchDate } from './../../helpers/date-utils';
import { NormalCourseDetails } from './NormalCourseDetails';

const useDataApi = (initialUrl: string, initialData: any, postBody: {}) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.post(url, postBody);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url, postBody]);

  const doFetch = (urlString: string) => {
    setUrl(urlString);
  };

  return { data, isLoading, isError, doFetch };
};
export function NormalCoursesTable(props: any) {
  const {
    data,
    isLoading,
    isError,
  }: { data: IFindNormalCoursesRow[]; isLoading: boolean; isError: boolean } = useDataApi(
    `${process.env.REACT_APP_DNN_WEB_API}/Course/FindCourses`,
    [],
    props.searchData,
  );
  const [details, setDetails] = useState();
  let rows: any[] = [];
  if (data && !isLoading) {
    rows = data.map((row: IFindNormalCoursesRow) => (
      <tr key={row.CourseId}>
        <td>
          <Link
            to={`/bijeenkomsten-zoeken/op-locatie/informatie-en-aanmelden/${row.CourseId}`}
            title="Bekijk meer informatie en aanmelden"
            onClick={() => setDetails(row)}
          >
            {row.Title}
          </Link>
        </td>
        <td>{toDutchDate(row.Date)}</td>
        <td>
          {row.StartTime} - {row.EndTime}
        </td>
        <td>{`${row.Organizer} - ${row.LocationAddress.City}`}</td>
        <td>{toDutchMoney(row.Price)}</td>
      </tr>
    ));
  }
  if (isLoading) {
    rows.push(
      <tr key="loading">
        <td colSpan={5}>
          <Spinner />
        </td>
      </tr>,
    );
  }
  const back = (routerProps: any) => {
    // e.stopPropagation();
    setDetails(undefined);
    routerProps.history.goBack();
    // props.history.goBack();
  };

  return isError ? (
    <div>Er is een probleem opgetreden. Probeer het later opnieuw.</div>
  ) : (
    <>
      <table className="table table-striped" key="table">
        <thead>
          <tr key="headerRow">
            <th>Titel</th>
            <th style={{ width: '88px' }}>Datum</th>
            <th style={{ width: '97px' }}>Van - tot</th>
            <th>Locatie</th>
            <th>Prijs (incl. btw)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Route
        path="/bijeenkomsten-zoeken/op-locatie/informatie-en-aanmelden/:courseId"
        render={(routerProps: any) => {
          return (
            <NormalCourseDetails
              details={details}
              visible={details ? true : false}
              hideDialog={(e: any) => back(routerProps)}
            />
          );
        }}
      />
    </>
  );
}
