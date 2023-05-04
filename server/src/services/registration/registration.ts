import { IRegistrationResponse } from '../../interfaces/response';

export interface IRegistrationStrategy {
  registration(successMessage?: string): Promise<IRegistrationResponse>;
}

class RegistrationStrategy {
  private strategy: IRegistrationStrategy;
  private _successMessage: string = '';

  constructor(strategy: IRegistrationStrategy) {
    this.strategy = strategy;
  }

  get successMessage(): string {
    return this._successMessage;
  }

  set successMessage(value: string) {
    this._successMessage = value;
  }

  public setStrategy(strategy: IRegistrationStrategy) {
    this.strategy = strategy;
  }

  async registration() {
    const response = await this.strategy.registration(this._successMessage);
    return response;
  }
}

export default RegistrationStrategy;
