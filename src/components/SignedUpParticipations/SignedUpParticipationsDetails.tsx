import { useMutation, useQuery } from '@apollo/react-hooks';
import { Alert, Button, PanelBody, Spinner } from '@erkenningen/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { UNREGISTER } from '../../shared/Mutations';
import { GET_PARTICIPATION_DETAILS, IParticipationDetails } from '../../shared/Queries';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';
import { NormalCourseDetails } from '../NormalCourses/NormalCourseDetails';
import { OnlineCourseDetails } from '../OnlineCourses/OnlineCourseDetails';

export function SignedUpParticipationDetails(props: any) {
  const returnToListLink = <Link to="/waar-ben-ik-aangemeld">Terug</Link>;
  const { loading, data, error } = useQuery<
    { CursusDeelnameDetails: IParticipationDetails },
    { participationId: number }
  >(GET_PARTICIPATION_DETAILS, {
    variables: {
      participationId: parseInt(props.match.params.participationId, 10),
    },
    fetchPolicy: 'network-only',
  });

  const [
    unRegisterCourse,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation<
    { unRegisterForCourse: { success: boolean; message: string } },
    { CursusDeelnameID: number }
  >(UNREGISTER);

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
        <Alert>Gegevens van de bijeenkomst zijn niet gevonden.</Alert>
        <Link to="/waar-ben-ik-aangemeld">Terug naar de lijst</Link>
      </PanelBody>
    );
  }

  const unregisterFragment = (
    <PanelBody>
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
    </PanelBody>
  );

  if (mutationData && mutationData.unRegisterForCourse.success) {
    return (
      <PanelBody>
        <Alert type="success">{mutationData.unRegisterForCourse.message}</Alert>
        {returnToListLink}
      </PanelBody>
    );
  }
  if (mutationData && !mutationData.unRegisterForCourse.success) {
    return (
      <PanelBody>
        <Alert type="warning">{mutationData.unRegisterForCourse.message}</Alert>
        {returnToListLink}
      </PanelBody>
    );
  }
  const d = data.CursusDeelnameDetails;
  const organizerData = d.Cursus.Vak.VakgroepID
    ? d.Cursus.Vak.Vakgroep
    : d.Cursus.Vak.Exameninstelling;

  if (!data.CursusDeelnameDetails.Cursus.Vak.DigitaalAanbod) {
    const details: INormalCourseDetails = {
      Distance: 0,
      RegisteredDate: null,
      CanUnRegister: true,
      CourseId: d.Cursus.CursusID,
      CourseCode: d.Cursus.CursusCode,
      Date: d.Cursus.Sessies[0].Datum,
      StartTime: new Date(d.Cursus.Sessies[0].Begintijd).toISOString().substr(11, 5),
      EndTime: new Date(d.Cursus.Sessies[0].Eindtijd).toISOString().substr(11, 5),
      LocationName: d.Cursus.Sessies[0].Lokatie.Naam,
      LocationAddress: {
        ContactDataId: 0,
        Street: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Adresregel1,
        HouseNr: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Huisnummer,
        HouseNrExtension: d.Cursus.Sessies[0].Lokatie.Contactgegevens.HuisnummerToevoeging,
        Zipcode: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Postcode,
        City: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Woonplaats,
        Phone: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Telefoon,
        Email: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Email,
        EmailEmployer: '',
        Website: d.Cursus.Sessies[0].Lokatie.Contactgegevens.Straat,
      },
      Remarks: null,
      SpecialtyId: 1,
      Title: d.Cursus.Titel.length === 0 ? d.Cursus.Vak.Titel : d.Cursus.Titel,
      Theme: d.Cursus.Vak.Themas[0].Naam,
      Competence: d.Cursus.Vak.Competenties[0].Naam,
      PromoText:
        d.Cursus.Promotietekst.length === 0 ? d.Cursus.Vak.Promotietekst : d.Cursus.Promotietekst,
      Price: d.Cursus.Prijs === 0 ? d.Cursus.Vak.Kosten : d.Cursus.Prijs,
      Organizer: organizerData.Naam,
      OrganizerPhone: organizerData.Contactgegevens.Telefoon,
      OrganizerEmail: organizerData.Contactgegevens.Email,
      OrganizerWebsite: organizerData.Contactgegevens.Website,
    };
    // return <NormalCourseDetails details={details} />;
    return (
      <>
        <NormalCourseDetails details={details} />
        {!mutationData && unregisterFragment}
      </>
    );
  } else {
    const onlineDetails: IOnlineCourseDetails = {
      Code: d.Cursus.Vak.VakID,
      SpecialtyId: d.Cursus.Vak.VakID,
      Title: d.Cursus.Titel.length === 0 ? d.Cursus.Vak.Titel : d.Cursus.Titel,
      Theme: d.Cursus.Vak.Themas[0].Naam,
      Competence: d.Cursus.Vak.Competenties[0].Naam,
      PromoText:
        d.Cursus.Promotietekst.length === 0 ? d.Cursus.Vak.Promotietekst : d.Cursus.Promotietekst,
      Price: d.Cursus.Prijs === 0 ? d.Cursus.Vak.Kosten : d.Cursus.Prijs,
      Organizer: organizerData.Naam,
      OrganizerPhone: organizerData.Contactgegevens.Telefoon,
      OrganizerEmail: organizerData.Contactgegevens.Email,
      OrganizerWebsite: organizerData.Contactgegevens.Website,
    };
    return (
      <>
        <OnlineCourseDetails details={onlineDetails} />
        {!mutationData && unregisterFragment}
      </>
    );
  }
}
