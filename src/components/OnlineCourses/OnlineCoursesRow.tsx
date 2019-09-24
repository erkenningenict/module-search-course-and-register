import { toDutchMoney } from '@erkenningen/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';

interface IOnlineCourseRow {
  row: IOnlineCourseDetails;
}

export function OnlineCoursesRow(props: IOnlineCourseRow) {
  const { row } = props;
  return (
    <>
      <tr key={row.SpecialtyId}>
        <td>
          <Link
            to={`/bijeenkomsten-zoeken/online/informatie-en-aanmelden/${row.SpecialtyId}`}
            title="Bekijk meer informatie en aanmelden"
          >
            {row.Title}
          </Link>
        </td>
        <td>{row.Organizer}</td>
        <td className="text-right">{toDutchMoney(row.Price, { euroPrefix: true })}</td>
      </tr>
    </>
  );
}
