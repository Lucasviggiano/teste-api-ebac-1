/// <reference types="cypress" />

describe('teste da funcionalidade carrinho', () => {

    it('deve listar carrinhos cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'carrinhos'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('carrinhos')
        })
    })
});
