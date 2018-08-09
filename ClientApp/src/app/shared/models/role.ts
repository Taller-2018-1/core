import { Indicator } from './indicator';

export class Role {
  roleID: number;
  roleName: string;
  roleToken: string;
  permissionsRead: Indicator [];
  permissionsWrite: Indicator [];
}
