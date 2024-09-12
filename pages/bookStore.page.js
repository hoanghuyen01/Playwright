import { BasePage } from "./basePage";

export class BookStore extends BasePage{
    constructor(page){
        super(page);
        this.searchBox= '[id=searchBox]';
        this.seachIcon = "//span[@id='basic-addon2']";
        this.listBook = "//div[@role='rowgroup']//div[2]//span";
        this.okeToDeleteBtn = "#closeSmallModal-ok";
    }
    async goToBookStore(){
        await this.page.goto('https://demoqa.com/books',{waitUntil: 'domcontentloaded'});
    }
    
    async searchByKeywords(keyWord){
        await this.page.locator(this.searchBox).fill(keyWord);
        await this.page.locator(this.seachIcon).click();
    }
    async verifyAllBookTiltleContainKeyword(keyWord){
        let isAllListContainKey = true;
        const bookList = await this.page.$$(this.listBook);
        const regex = new RegExp(keyWord, "i");
        for(let i = 0; i< bookList.length; i++){
        let nameBook = await bookList[i].innerText();
        if(nameBook.trim().length!= 0){
            if(!regex.test(nameBook)){
                return false; 
            }
        }
    }
        return isAllListContainKey;
    }
    async deleteBookFromCollection(title){
        const xpathDeleteIcon = "//a[text()='"+ title+ "']/ancestor::div[@role='row']//span[@id='delete-record-undefined']";
        await this.page.locator(xpathDeleteIcon).click();
    }

    async clickAcceptToDeleteBook(){
        await this.page.locator("#closeSmallModal-ok").click();
    }
    async verifyBookNotExistByTitle(title){
        const bookList = await this.page.$$(this.listBook);
        for(let i = 0; i< bookList.length; i++){
        let nameBook = await bookList[i].innerText();
        if(nameBook.trim().length!= 0){
            console.log(nameBook);
            if(nameBook == title){
                console.log(nameBook);
                return false; 
            }
        }
    }
        return true;
    }
}
