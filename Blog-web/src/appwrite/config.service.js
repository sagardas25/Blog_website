import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conft";

export class Service {
  client = new Client();
  Databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, feturedImage, status, userId }) {
    try {
      const post = this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          feturedImage,
          status,
          userId,
        }
      );

      return post;
    } catch (error) {
      console.log("appwrite service :: post creation :: error : " + error);
    }
  }

  async updatePost(slug, { title, content, status, feturedImage }) {
    try {
      const result = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          feturedImage,
          status,
        }
      );

      return result;
    } catch (error) {
      console.log("appwrite service :: post update :: error : " + error);
    }
  }
  async deletePost(slug) {
    try {
      const result = await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      console.log(result);

      return true;
    } catch (error) {
      console.log("appwrite service :: post delete :: error : " + error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return post;
    } catch (error) {
      console.log("appwrite service :: post get :: error : " + error);
      throw error;
    }
  }
  async getPosts() {
    try {
      const post = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", "active")]
      );

      return post;
    } catch (error) {
      console.log("appwrite service :: post list :: error : " + error);
      return false;
    }
  }
  async uploadFiles(files) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        files
      );
    } catch (error) {
      console.log("appwrite service :: upload file :: error : " + error);
      return false;
    }
  }
  async deleteFiles(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);

      return true;
    } catch (error) {
      console.log("appwrite service :: delete file :: error : " + error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
