const request = require('supertest');
const express = require('express');
const app = require('../app'); 

describe('GET /', () => {
  it('should return 200 and contain homepage content', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Space & Science Explorer');
  });
});

describe('GET /apod', () => {
  it('should return 200 for the APOD page', async () => {
    const response = await request(app).get('/apod');
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/Astronomy Picture of the Day/i);
  });
});

describe('GET /launches', () => {
  it('should return 200 for the launches page', async () => {
    const response = await request(app).get('/launches');
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/SpaceX Launches/i);
  });
});
