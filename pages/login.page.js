export class LoginPage {
    constructor(page){
        this.url = "";
        this.userName = '#userName';
        this.password = '#password';
        this.loginBtn = '#login';
        this.userNameAfterLogin = '#userName-value'; 
        this.page = page;
    }
    async goToLoginPage(){
        await this.page.goto("https://demoqa.com/login", {waitUntil: 'domcontentloaded'});
    }
    
    async inputUserNameAndPassword(userName, password){
        await this.page.locator(this.userName).fill(userName);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.loginBtn).click();
    }
}