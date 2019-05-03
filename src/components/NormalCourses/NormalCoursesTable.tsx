import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../ui/Spinner';
import { toDutchDate } from './../../helpers/date-utils';

interface IFindCoursesResponseItem {
  Distance: number;
  RegisteredDate: string | null;
  CanUnRegister: boolean;
  CourseId: number;
  CourseCode: string;
  Date: string;
  StartTime: string;
  EndTime: string;
  Remarks: string | null;
  LocationName: string;
  LocationAddress: ILocationAddress;
  SpecialtyId: number;
  Code: string | null;
  Title: string;
  Theme: string;
  Competence: string;
  Promotext: string;
  Price: number;
  OrganizerId: number;
  Organizer: string;
  OrganizerPhone: string;
  OrganizerEmail: string;
  OrganizerWebsite: string;
  OrganizerContactperson: string | null;
  OrganizerAddress: string | null;
}

interface ILocationAddress {
  ContactDataId: number;
  Street: string;
  HouseNr: string;
  HouseNrExtension: string;
  Zipcode: string;
  City: string;
  Phone: string;
  Email: string;
  EmailEmployer: string;
  Website: string;
}

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
  }: { data: IFindCoursesResponseItem[]; isLoading: boolean; isError: boolean } = useDataApi(
    `${process.env.REACT_APP_DNN_WEB_API}/Course/FindCourses`,
    [],
    props.searchData,
  );
  let rows: any[] = [];
  if (data && !isLoading) {
    rows = data.map((row: IFindCoursesResponseItem) => {
      return (
        <tr key={row.CourseId}>
          <th>&nbsp;</th>
          <td>{row.Title}</td>
          <td>{toDutchDate(row.Date)}</td>
          <td>{`${row.Organizer} - ${row.LocationAddress.City}`}</td>
          <td>{row.StartTime}</td>
          <td>{row.EndTime}</td>
          <td>{row.Price}</td>
          <td>
            <span>T</span>
          </td>
        </tr>
      );
    });
  }
  if (isLoading) {
    rows.push(
      <tr key="loading">
        <td colSpan={8}>
          <Spinner />
        </td>
      </tr>,
    );
  }
  return isError ? (
    <div>Er is een probleem opgetreden. Probeer het later opnieuw.</div>
  ) : (
    <table className="table table-striped" key="table">
      <thead>
        <tr key="headerRow">
          <th>&nbsp;</th>
          <th>Titel</th>
          <th>Datum</th>
          <th>Locatie</th>
          <th>Begintijd</th>
          <th>Eindtijd</th>
          <th>Prijs (incl. btw)</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
