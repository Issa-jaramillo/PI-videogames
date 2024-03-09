/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogames, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  image: 'URL_DE_LA_IMAGEN',
  description: 'Descripción del juego',
  platforms: ['Plataforma1', 'Plataforma2'],
};

describe('Videogame routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  beforeEach(() =>
    Videogames.sync({ force: true }).then(() => Videogames.create(videogame))
  );

  describe('GET /videogames', () => {
    it('should get 200', function (done) {
      this.timeout(5000); // Aumenta el tiempo de espera a 5 segundos
      agent.get('/videogames').expect(200, done);
    });
  });
});
