import { RESTDataSource } from "@apollo/datasource-rest";

export default class MessagesAPI extends RESTDataSource {
  baseURL = "http://localhost:3004/v1/";
  
  async getMessages() {
    return this.get("messages");
  }

  async addMessage(message) {
    return this.post("messages", { body: message });
  }

}
