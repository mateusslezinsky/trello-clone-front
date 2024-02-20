export class User {
  constructor(
    public name: string,
    public email: string,
    private readonly _token: string,
    private readonly _tokenExpirationDate: Date) {
  }

  get token(): string | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) return null;

    return this._token;
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }

}
