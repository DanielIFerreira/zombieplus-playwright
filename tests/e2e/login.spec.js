const { test, expect } = require('../support')

test.beforeEach(async({page}) => {
    await page.login.visit()
})

test('deve logar como administrador', async({page}) =>{
    //await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('não deve logar com senha incorreta', async({page}) =>{
    //await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123654')
    const menssage = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await page.toast.containText(menssage) 
})

test('não deve logar quando o email é incorreto', async({page}) =>{
    //await page.login.visit()
    await page.login.submit('emailincorreto.com', 'pwd123654')
    await page.login.alertHaveText('Email incorreto')
})

test('não deve logar quando o email não é preenchido', async({page}) =>{
    //await page.login.visit()
    await page.login.submit('', 'pwd123654')
    await page.login.alertHaveText('Campo obrigatório')
})


test('não deve logar quando a senha não é preenchido', async({page}) =>{
    //await page.login.visit()
    await page.login.submit('Teste@teste.com', '')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando nenhum campo não é preenchido', async({page}) =>{
    //await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})

