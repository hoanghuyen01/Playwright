import { BaseService } from "./baseService";
import { LoginService } from "./loginService";

export class BookStoreService extends BaseService {
   static ADD_BOOK_URL = "https://demoqa.com/BookStore/v1/Books";
   
    async addBookToCollection(user, bookisbn){
      const loginService = new LoginService();
      const data ={};
      data['userId'] = user.userID;
      const isbnList = {"isbn": bookisbn};
      data['collectionOfIsbns'] = [isbnList];
      const token = await loginService.getTokenLogin(user.username, user.password);
      const headers ={
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      };
      const response = await this.fetchAPI(BookStoreService.ADD_BOOK_URL,"POST",headers,JSON.stringify(data));
      return response;
     }
    }