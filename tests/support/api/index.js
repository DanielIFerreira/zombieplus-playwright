const { test: base, expect } = require('@playwright/test')

export class Api{
    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken(){
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email:'admin@zombieplus.com',
                password: 'pwd123'
            }
        })
    
        expect(response.ok()).toBeTruthy()
        const body = JSON.parse(await response.text())
        this.token = 'Bearer ' + body.token
    }

    async postMovie(movie) {

        await this.setToken()

        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: '509eb6c0-3ac7-4da9-bdbf-5c3e4d1743cc',
                release_year: movie.release_year,
                featured: movie.featured
            }
        })
        expect(response.ok()).toBeTruthy()

    }
}