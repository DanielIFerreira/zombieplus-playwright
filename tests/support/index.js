const { test: base, expect } = require('@playwright/test')

const { Login } = require('./actions/Login')
const { Leads } = require('./actions/Leads')
const { Movies } = require('./actions/Movies')
const { Toast } = require('./actions/Components')
const { Api } = require('./api/index')
const test = base.extend({ 
    page: async ({page}, use) =>{

        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['toast'] = new Toast(page)

        await use(context)
    },
    request: async({ request }, use) => {
        const context = request
        context['api'] = new Api(request)

        await use(context)
    }
})

export {test, expect}
