process.env.NODE_ENV = "test"

const request = require("supertest")

const app = require("../app")
let items = require("../fakeDB")

let itemList = [{"name": "popsicle", "price": 1.45}, {"name":"cheerios", "price": 3.40}]

beforeEach(function(){
    items.push(itemList[0])
    items.push(itemList[1])
})

afterEach(function(){
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        const res  = await request(app).get("/items")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(itemList)
    })
})

describe("POST /items", () => {
    test("Create a item", async () => {
        const res  = await request(app).post("/items").send({
            "name": "testItem",
            "price": 2.00
        })
        expect(res.statusCode).toBe(200)
        expect(items).toEqual([
        {"name": "popsicle", "price": 1.45}, 
        {"name":"cheerios", "price": 3.40}, 
        {"name": "testItem","price": 2.00}
        ])
    })
})

describe("GET /items/:name", () => {
    test("Get one item", async () => {
        const res  = await request(app).get("/items/cheerios")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"name": "cheerios", "price":3.40})
    })

    
})

describe("PATCH /items/:name", () => {
    test("Update one item", async () => {
        const res  = await request(app)
        .patch("/items/cheerios")
        .send({"name": "cheery's", "price": 1.00})
        expect(res.statusCode).toBe(200)
        expect({"updated": {
            "name": "cheery's", "price": 1.00
        }})
        
    })

    test("Responds with 404 for nonexisting item", async () => {
        const res  = await request(app)
        .patch("/items/cheers")
        .send({"name": "cheery's", "price": 1.00})
        expect(res.statusCode).toBe(404)

    })
})

describe("DELETE /items/:name", () => {
    test("Delete one item", async () => {
        const res  = await request(app).delete("/items/cheerios")
        expect(res.statusCode).toBe(200)
        expect({message: "Deleted"})
    })
})
