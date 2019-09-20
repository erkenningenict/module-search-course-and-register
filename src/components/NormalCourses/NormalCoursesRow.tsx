import { toDutchDate, toDutchMoney } from '@erkenningen/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';

interface INormalCourseRow {
  row: INormalCourseDetails;
  showDistance: boolean;
}

export function NormalCoursesRow(props: INormalCourseRow) {
  const { row, showDistance } = props;
  return (
    <>
      <tr key={row.CourseId}>
        <td>
          <Link
            to={`/bijeenkomsten-zoeken/op-locatie/informatie-en-aanmelden/${row.CourseId}`}
            title="Bekijk meer informatie en aanmelden"
          >
            {row.Title}
          </Link>
        </td>
        <td>{toDutchDate(row.Date)}</td>
        <td>
          {row.StartTime} - {row.EndTime}
        </td>
        <td>{`${row.Organizer} - ${row.LocationAddress.City}`}</td>
        {showDistance && <td>{Math.round(row.Distance / 1000)}</td>}
        <td className="text-right">{toDutchMoney(row.Price, { euroPrefix: true })}</td>
      </tr>
    </>
  );
}
