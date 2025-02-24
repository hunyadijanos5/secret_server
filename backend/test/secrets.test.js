const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Secret = require('../models/Secret');

let server = require('../app')
let hash;
describe('Secret API', () => {
    it('should create a new secret with redeemLeft and password', async () => {
        const response = await request(app)
            .post('/api/secrets')
            .send({
                secret: 'my secret',
                redeemLeft: 5,
                password: 'mypassword'
            });

        expect(response.status).toBe(201);
        expect(response.body.hash).toBeDefined();
        hash = response.body.hash
    });

    it('should retrieve a secret by hash with correct password', async () => {
        const secret = new Secret({
            hash: 'testhash',
            secret: 'my secret',
            redeemLeft: 5,
            password: 'mypassword'
        });
        await secret.save();

        const response = await request(app).get('/api/secrets/testhash').query({
            password: 'mypassword'
        });

        expect(response.status).toBe(200);
        expect(response.body.secret).toBe('my secret');
        expect(response.body.redeemLeft).toBe(4);
    });

    it('should not retrieve a secret with incorrect password', async () => {
        const secret = new Secret({
            hash: 'wrongpasswordhash',
            secret: 'my secret',
            redeemLeft: 5,
            password: 'mypassword'
        });
        await secret.save();

        const response = await request(app).get('/api/secrets/wrongpasswordhash').query({
            password: 'wrongpassword'
        });

        expect(response.status).toBe(403);
    });

    it('should not retrieve a secret if redeemLeft is 0', async () => {
        const secret = new Secret({
            hash: 'noredeemhash',
            secret: 'my secret',
            redeemLeft: 0,
            password: 'mypassword'
        });
        await secret.save();

        const response = await request(app).get('/api/secrets/noredeemhash').query({
            password: 'mypassword'
        });

        expect(response.status).toBe(404);
    });

    it('should retrieve a secret by hash', async () => {
        const secret = new Secret({
            hash: 'testhash2',
            secret: 'my secret2'
        });
        await secret.save();

        const response = await request(app).get('/api/secrets/testhash2');

        expect(response.status).toBe(200);
        expect(response.body.secret).toBe('my secret2');
    });

    it('should update a non-existing secret', async () => {
        const response = await request(app)
            .put('/api/secrets/testhash2')
            .send({
                secret: 'new secret updated'
            });

        expect(response.status).toBe(404);
    });

    it('should delete all existing secret', async () => {
        const deletedSecret = await Secret.deleteMany({
            hash: {
                $in: ["testhash", "testhash2", "wrongpasswordhash", "noredeemhash", hash]
            }
        });
        expect(deletedSecret.ok).toBe(1);
    });

    it('should redeem until not available', async () => {
        let response
        for (let i = 0; i < 10; i++) {
            response = await request(app).get(`/api/secrets/${hash}`);
        }

        expect(response.status).toBe(404);
    });
});