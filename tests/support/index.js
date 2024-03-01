const { test: base, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')
const { LandingPage } = require('../pages/LandingPage')
const { Movies } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')

const test = base.extend({ 
    page: async ({page}, use) =>{
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new Movies(page),
            toast: new Toast(page)
        })
    }
})

export {test, expect}
