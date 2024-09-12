import {test, expect, context } from "@playwright/test"
import { BookStore } from '../pages/bookStore.page';

test('Search book with multiple results', async ({page})=>{
    const bookStore =  new BookStore(page);
    const keyWord = "design";
    await bookStore.goToBookStore();
    await bookStore.searchByKeywords(keyWord);
    expect( await bookStore.verifyAllBookTiltleContainKeyword(keyWord)).toEqual(true);
});
