import React from 'react';
import { toDutchMoney } from '@erkenningen/ui/utils';
import { Link, RouteComponentProps } from 'react-router-dom';

interface OnlineCourseRowProps extends RouteComponentProps {
  row: any;
}

export function OnlineCoursesRow(props: OnlineCourseRowProps) {
  const { row } = props;
  return (
    <>
      <tr key={row.SpecialtyId}>
        <td>
          <Link
            to={`/bijeenkomsten-zoeken/online/informatie-en-aanmelden/${row.SpecialtyId}${props.location.search}`}
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
