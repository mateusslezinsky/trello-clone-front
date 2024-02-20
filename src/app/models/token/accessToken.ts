export class AccessTokenPayload{
  constructor(public exp: number, public iss: string, public name: string, public sub: string) {
  }
}
