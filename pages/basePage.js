export class BasePage{
    constructor(page){
        this.page = page;
    }
    async handleConfirmDialog(action, expectedMessage){
        this.page.on('dialog', async (dialog) => {
        const dialogMessage = dialog.message();
        expect(dialogMessage).toBe(expectedMessage);
        if(action == "accept"){
            await dialog.accept();
        }
      });
    }
    async getMessageFromAlert(){
        this.page.waitForEvent('dialog', async (dialog) => {
            const dialogMessage = dialog.message();
           console.log(dialogMessage);
          });
        }
}