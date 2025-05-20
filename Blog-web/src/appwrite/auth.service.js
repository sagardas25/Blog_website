import conf from "../conf/conft";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!user) {
        return user;
      } else {
        // call login
      }
    } catch (error) {
      console.log("the error in creating account - " + error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const loggedUser = await this.account.createEmailPasswordSession(
        email,
        password
      );

      return loggedUser;
    } catch (error) {
      console.log("the error in creating account - " + error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error in getting user : " + error);
    }

    return null;
  }
  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("error in log out user : " + error);
    }

    return null;
  }







}

const authService = new AuthService();

export default authService;
