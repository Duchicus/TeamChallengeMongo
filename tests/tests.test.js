const request = require("supertest");
const app = require("../index.js");
const User = require("../models/User.js")
let token
let userId

describe("testing", () => {
    const task = {
        title: "gorronea",
    };
    const user = {
        name: "memeo",
        email: "mpiernash@gmail.com",
        password: "123456",
    };
    test("Create a user", async () => {
        const res = await request(app)
            .post("/users")
            .send(user)
            .expect(201);
        expect(res.body.message).toBeDefined();
    })
    test("Login a user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send(user)
            .expect(200);
        token = res.body.token;
    });
    test("Task create", async () => {
        const res = await request(app)
            .post("/tasks/create")
            .send(task)
            .expect(201)
            .set({ Authorization: token })
        expect(res.body.message).toBeDefined()
    });
    test("Task get", async () => {
        const res = await request(app)
            .get("/tasks")
            .send(task)
            .expect(200)
        expect(res.body.message).toBeDefined()
    });
})
