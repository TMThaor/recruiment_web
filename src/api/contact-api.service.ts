import { APIServiceBase } from "./api-service-base";

export class ContactApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/contact`;

  getAllContacts = async (): any => {
    return this._get(this.root);
  };

  getContactById = async (id: string): any => {
    return this._get(`${this.root}/${id}`);
  };

  deleteContact = async (id: string): any => {
    return this._delete(`${this.root}/${id}`);
  };

  markAsRead = async (id: string): any => {
    return this._patch(`${this.root}/${id}`, {});
  };

  replyToContact = async (id: string, answer: string): any => {
    return this._patch(`${this.root}/reply/${id}`, { answer });
  };
}

export const contactApiService = new ContactApiService();
