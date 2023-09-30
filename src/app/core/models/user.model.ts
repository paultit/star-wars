export interface User {
  exp: number;
  name: string;
  permissions?: string[]; // 'delete' | 'edit' | 'read'
}
