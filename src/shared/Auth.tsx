import React from 'react';

import { DeepPartial } from 'ts-essentials';

import { useGetMyQuery, My } from '../generated/graphql';

export enum Roles {
  Beoordelaar = 'Beoordelaar',
  Boekhouder = 'Boekhouder',
  Examinator = 'Examinator',
  Hoogleraar = 'Hoogleraar',
  Inspecteur = 'Inspecteur',
  Rector = 'Rector',
  Student = 'Student',
  HoogleraarOrExaminator = 'HoogleraarOrExaminator',
}

export const UserContext = React.createContext<DeepPartial<My> | undefined>(undefined);

export const useAuth = (): {
  loading: boolean;
  error: boolean;
  authenticated: boolean;
  my?: DeepPartial<My>;
} => {
  const { loading, error, data } = useGetMyQuery({
    variables: { input: true },
    fetchPolicy: 'no-cache',
  });

  let authenticated = false;
  let hasError = false;

  if (error) {
    // Check if it's an authentication error
    if (error.graphQLErrors) {
      for (const err of error.graphQLErrors) {
        if (!err.extensions || err.extensions.code !== 'UNAUTHENTICATED') {
          hasError = true;
        }
      }
    }
  } else if (data && data.my && data.my.Roles) {
    authenticated = true;
  }

  return { loading, error: hasError, authenticated, my: data?.my };
};

export const hasRole = (role: Roles, currentRoles?: string[]): boolean =>
  currentRoles ? currentRoles.includes(role) : false;

export const hasOneOfRoles = (roles: Roles[], currentRoles?: string | string[]): boolean =>
  currentRoles ? roles.some((role: Roles) => currentRoles.includes(role)) : false;

export const hasAllRoles = (roles: Roles[], currentRoles?: string[]): boolean =>
  currentRoles ? roles.every((role: Roles) => currentRoles.includes(role)) : false;

export const hasRectorRole = (roles?: string[]): boolean => hasRole(Roles.Rector, roles);

export const hasHoogleraarRole = (roles?: string[]): boolean => hasRole(Roles.Hoogleraar, roles);

export const hasExaminatorRole = (roles?: string[]): boolean => hasRole(Roles.Examinator, roles);

export const hasBeoordelaarRole = (roles?: string[]): boolean => hasRole(Roles.Beoordelaar, roles);

export const hasStudentRole = (roles?: string[]): boolean => hasRole(Roles.Student, roles);

export const hasBoekhouderRole = (roles?: string[]): boolean => hasRole(Roles.Boekhouder, roles);

export const hasInspecteurRole = (roles?: string[]): boolean => hasRole(Roles.Inspecteur, roles);
