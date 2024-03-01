const { test: base, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')
const { LandingPage } = require('../pages/LandingPage')
const { Movies } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')

const test = base.extend({ 
    page: async ({page}, use) =>{

        const context = page

        context['landing'] = new LandingPage(page)
        context['login'] = new LoginPage(page)
        context['movies'] = new Movies(page)
        context['toast'] = new Toast(page)

        await use(context)
    }
})

export {test, expect}
