const {test, expect } = require ('@playwright/test');
const { LoginService } = require('../services/loginService');
const {BookStoreService} = require('../services/bookStoreService');
import { validUser } from "../data/user.json";
const book  = require('../data/book.json');
import {LoginPage} from '../pages/login.page';
import {BookStore} from '../pages/bookStore.page';

test('Delete book successfully',async ({page})=> {
    const bookStoreService = new BookStoreService();
    const specificBook = book.books.find(book => book.title === "Learning JavaScript Design Patterns");
    const result = await bookStoreService.addBookToCollection(validUser,specificBook.isbn);
    console.log(result);
    const loginPage =new LoginPage(page);
    const bookStore = new BookStore(page);
    const titleBook = "Learning JavaScript Design Patterns";
    loginPage.goToLoginPage();
    loginPage.inputUserNameAndPassword(validUser.username,validUser.password);
    await bookStore.searchByKeywords(titleBook);
    await bookStore.deleteBookFromCollection(titleBook);
    await bookStore.handleConfirmDialog("accept",'Book deleted.');
    await bookStore.clickAcceptToDeleteBook();
    await bookStore.handleConfirmDialog("accept",'Book deleted.');
    expect( await bookStore.verifyBookNotExistByTitle(titleBook)).toEqual(true);
})