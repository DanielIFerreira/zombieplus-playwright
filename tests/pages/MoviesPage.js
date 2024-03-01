// @ts-check
const { expect } = require('@playwright/test');


export class Movies {
    constructor(page) {
        this.page = page
    }
    async isLoggedIn() {
        //const logoutLink = this.page.locator('a[href="/logout"]')
        //await expect(logoutLink).toBeVisible()
        //aguarda todo o processo de requisição de rede 
        await this.page.waitForLoadState('networkidle')
        //valida o link a pagina
        await expect(this.page).toHaveURL(/.*admin.*movies/)
    }

    async create (title, overview, company, release_year) {
        await this.page.locator('a[href$="register"]').click()
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)
        await this.page.locator('#select_company_id').click()
        await this.page.locator('.react-select__option').filter({hasText: company}).click()
        await this.page.locator('#select_year .react-select__indicator').click()      
        await this.page.locator('.react-select__option').filter({hasText: release_year}).click()
        await this.page.getByRole('button', {name:'Cadastrar'}).click()

    }
}