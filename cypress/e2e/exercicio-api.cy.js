/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import contrato from '../contracts/usuarios.contracts'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
  })
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
      failOnStatusCode: false
  })

  it('Deve editar um usuário previamente cadastrado', () => {

    let useremail = `${faker.internet.email()}`
    cy.cadastrarUsuarios('Fulano da Silva', faker.internet.email(), 'teste', 'true')
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          body:
          {
            "nome": 'Fulano da Silva',
            "email": faker.internet.email(),
            "password": 'teste',
            "administrador": 'true'
          }
        }).then(response => {
          expect(response.body.message).to.equal('Registro alterado com sucesso')
          expect(response.status).equal(200)
        })
      })
  });

  it('Deve exibir mensagem de erro, email já cadastrado', () => {

    cy.cadastrarUsuarios('Fulano da Silva', faker.internet.email(), 'teste', 'true')
      .then(response => {
        let id = '0uxuPY0cbmQhpEz1'

        cy.request({
          method: 'PUT',
          url: `usuarios/${'0uxuPY0cbmQhpEz1'}`,
          body:
          {
            "nome": 'Fulano da Silva',
            "email": 'beltrano@qa.com.br',
            "password": 'teste',
            "administrador": 'true'
          }
        }).then(response => {
            expect(response.body.message).to.equal('Este email já está sendo usado')
            expect(response.status).equal(400)
          })
      })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
    let useremail = `${faker.internet.email()}`
    cy.cadastrarUsuarios('Fulano da Silva', faker.internet.email(), 'teste', 'true')
      .then(response => {
        let id = response.body._id

        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,

          body:
          {
            "nome": 'Fulano da Silva',
            "email": faker.internet.email(),
            "password": 'teste',
            "administrador": 'true'
          }
        }).then(response => {
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).equal(200)
        })
      })
  });
});



