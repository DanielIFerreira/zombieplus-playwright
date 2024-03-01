const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

let leadName
let leadEmail
//Serve para ser criada uma a cada novo inicio de teste
test.beforeEach(async({page}) => {
  await page.landing.visit()
})

//Serve para ser criada uma unica vez e deve ser usada para ambos os testes
test.beforeAll(async() =>{
  leadName = faker.person.fullName()
  leadEmail = faker.internet.email()
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  // visit acessar a pagina principal
  //await ladingPage.visit()
  //open LeadModal (Abre a Modal de Lead)
  await page.landing.openLeadModal()

  // submitLeadForm(submete o formulario)
  await page.landing.submitLeadFrom(faker.person.fullName(),faker.internet.email())
  
  // toastHaveText (Tem o texto no toast)
  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await page.toast.containText(message)

  //await expect(page.locator('//span[text()="Email incorreto"]')).toBeVisible()
});

test('não deve cadastrar um lead quando o email ja existe', async ({ page, request }) => {
  // await ladingPage.visit()
  // await ladingPage.openLeadModal()
  // await ladingPage.submitLeadFrom(leadName, leadEmail)
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadFrom(leadName, leadEmail)
  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."
  await page.toast.containText(message)

  //await expect(page.locator('//span[text()="Email incorreto"]')).toBeVisible()
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  //await ladingPage.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadFrom(faker.person.fullName(), faker.animal.crocodilia())
  
  await page.landing.alertHaveText('Email incorreto')
});

test('não deve cadastrar com email vazio', async ({ page }) => {
  //await ladingPage.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadFrom(faker.person.fullName(),'')

  await page.landing.alertHaveText('Campo obrigatório')
});

test('não devo conseguir cadastrar, caso o campo nome esteja vazio', async ({ page }) => {
  //await ladingPage.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadFrom('', faker.internet.email())

  await page.landing.alertHaveText('Campo obrigatório')
});

test('não devo conseguir cadastrar, caso nehmum campo é preenchido', async ({ page }) => {
  //await ladingPage.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadFrom('', '')

  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])  
});