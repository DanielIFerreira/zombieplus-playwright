const { expect } = require('@playwright/test');


export class Login {
    constructor(page) {
        this.page = page
    }
    async do(email, password, username) {
        await this.visit()
        await this.submit(email, password, username)
        await this.isLoggedIn(username)
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

    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }
    
    async isLoggedIn(username) {
        //const logoutLink = this.page.locator('a[href="/logout"]')
        //await expect(logoutLink).toBeVisible()
        //aguarda todo o processo de requisição de rede 
        //await this.page.waitForLoadState('networkidle')
        //valida o link a pagina
        //await expect(this.page).toHaveURL(/.*admin.*movies/)

        const loggerdUser = this.page.locator('.logged-user')
        await expect(loggerdUser).toHaveText(`Olá, ${username}`)
    }

}