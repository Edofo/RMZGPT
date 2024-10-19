export class User {
  id: string;
  username: string;
  email: string;
  password: string;

  constructor(
    id: string | null,
    username: string,
    email: string,
    password: string,
  ) {
    this.id = id ?? "";
    this.username = username;
    this.email = email;
    this.password = password;
  }
}