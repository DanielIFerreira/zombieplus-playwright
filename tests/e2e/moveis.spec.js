const { test, expect } = require('../support/index')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/dataBase')


test('deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)
    
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
    await page.movies.create(movie.title,movie.overview,movie.company,movie.release_year)
    await page.toast.containText('Cadastro realizado com sucesso!')
})