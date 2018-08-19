import { Permission } from './permission';

export class Role {
  roleID: number;
  roleName: string;
  roleToken: string;
  permissionsRead: Permission [];
  permissionsWrite: Permission [];

}
