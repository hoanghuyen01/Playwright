import { expect } from "@playwright/test";
import { BaseService } from "./baseService";

export class LoginService extends BaseService {
    static GENERATE_TOKEN_URL = 'https://demoqa.com/Account/v1/GenerateToken';
    
    async getTokenLogin(username, password){
        const data= JSON.stringify({
            "userName": username,
            "password": password
          });
        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const response = await this.fetchAPI(LoginService.GENERATE_TOKEN_URL,"POST",headers,data);
        const message =  response.result;
        if(message != "User authorized successfully."){
            return null;
        }
        return await response.token;
    }
}