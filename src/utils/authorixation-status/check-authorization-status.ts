import { AuthorizationStatus } from '../../components/const';

export const checkAuthorizationStatus = (status: AuthorizationStatus): boolean => status === AuthorizationStatus.NoAuth;
