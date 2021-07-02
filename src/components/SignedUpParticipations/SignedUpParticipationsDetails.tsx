import React from 'react';
import { Alert } from '@erkenningen/ui/components/alert';
import { Button } from '@erkenningen/ui/components/button';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  useGetCursusDeelnameDetailsQuery,
  useUnRegisterForCourseMutation,
} from '../../generated/graphql';
import { NormalCourseDetailsCursusDeelnameDetails } from './NormalCourseDetailsCursusDeelnameDetailsQuery';
import { OnlineCourseDetailsCursusDeelnameDetails } from './OnlineCourseDetailsCursusDeelnameDetails';

export function SignedUpParticipationDetails(props: RouteComponentProps<any>) {
  const returnToListLink = <Link to={`/waar-ben-ik-aangemeld${props.location.search}`}>Terug</Link>;
  const { loading, data, error } = useGetCursusDeelnameDetailsQuery({
    variables: {
      participationId: parseInt(props.match.params.participationId, 10),
    },
    fetchPolicy: 'network-only',
  });

  const [
    unRegisterCourse,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useUnRegisterForCourseMutation();

  if (mutationLoading || loading) {
    return (
      <PanelBody>
        <Spinner />
      </PanelBody>
    );
  }

  if (error || mutationError) {
    return (
      <PanelBody>
        <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
      </PanelBody>
    );
  }
  if (!data) {
    return null;
  }

  if (data && data.CursusDeelnameDetails === null) {
    return (
      <PanelBody>
        <Alert type="warning">Gegevens van de bijeenkomst zijn niet gevonden.</Alert>
        <Link to={`/waar-ben-ik-aangemeld${props.location.search}`}>Terug naar de lijst</Link>
      </PanelBody>
    );
  }

  const unregisterFragment = (
    <PanelBody>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          label="Afmelden"
          icon="pi pi-check"
          onClick={() => {
            const participationId: number = parseInt(props.match.params.participationId, 10);
            unRegisterCourse({
              variables: { CursusDeelnameID: participationId },
            });
          }}
        />
        {returnToListLink}
      </div>
    </PanelBody>
  );

  if (mutationData && mutationData.unRegisterForCourse.success) {
    return (
      <PanelBody>
        <Alert type="success">{mutationData.unRegisterForCourse.message}</Alert>
        <div style={{ display: 'flex', alignItems: 'center' }}>{returnToListLink}</div>
      </PanelBody>
    );
  }
  if (mutationData && !mutationData.unRegisterForCourse.success) {
    return (
      <PanelBody>
        <Alert type="warning">{mutationData.unRegisterForCourse.message}</Alert>
        <div style={{ display: 'flex', alignItems: 'center' }}>{returnToListLink}</div>
      </PanelBody>
    );
  }

  if (!data?.CursusDeelnameDetails?.Cursus.Vak.DigitaalAanbod) {
    return (
      <>
        <NormalCourseDetailsCursusDeelnameDetails details={data} />
        {!mutationData && unregisterFragment}
      </>
    );
  } else {
    return (
      <>
        <OnlineCourseDetailsCursusDeelnameDetails details={data} />
        {!mutationData && unregisterFragment}
      </>
    );
  }
}
