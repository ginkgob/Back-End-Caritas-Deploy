import { getUsers } from './users.controller';
import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('GET /users', () => {
    test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/').send();
            expect(response.statusCode).toBe(200);
    });
});