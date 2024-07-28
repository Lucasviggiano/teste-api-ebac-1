/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    //TODO: 
  });

  it('Deve listar usuários cadastrados', () => {
    //TODO: 
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).then((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
      
    })
  });


  it('Deve cadastrar um usuário com sucesso', () => {
    //TODO: 
    cy.cadastrarUsuarios(faker.person.fullName(), faker.internet.email(), 'teste', 'true')
      .then((response) => {

        expect(response.status).equal(201)
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')
      });

  });


  it('Deve validar um usuário com email inválido', () => {
    //TODO: 
    cy.cadastrarUsuarios(faker.person.fullName(), 'Pierre_Hills@yahoo.com', 'teste', 'true')
      .then((response) => {
        expect(response.status).equal(400)
        expect(response.body.message).to.equal('Este email já está sendo usado')
      });


    it('Deve editar um usuário previamente cadastrado', () => {
      //TODO: 


    });

    it('Deve deletar um usuário previamente cadastrado', () => {
      //TODO: 







    });

  })

})
