const { expect } = require('@playwright/test');


export class LoginPage {
    constructor(page) {
        this.page = page
    }
    async visit(){
        await this.page.goto('http://localhost:3000/admin/login')
        const logForm = this.page.locator('.login-form')
        await expect(logForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)

        //await this.page.locator('//button[text()="Entrar"]').click()
        await this.page.getByText('Entrar').click()
    }

    async HaveText(message) {
        const toast = this.page.locator('.toast')
    
            await expect(toast).toHaveText(message)
            await expect(toast).not.toBeVisible({timeout: 6000})
    }

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }
    
}