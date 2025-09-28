export class UserResponseDto {
  id: string;
  email: string;
  name?: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}
