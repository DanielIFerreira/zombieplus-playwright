const { test, expect } = require('../support/index')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/dataBase')


test('deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({page}) =>{
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.login.isLoggedIn('Admin')
    await page.movies.goForm()

    await page.movies.submit()
    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})