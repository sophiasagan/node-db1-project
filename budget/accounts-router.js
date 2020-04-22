const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    } catch (err) {
        next(err)
    }
})//working

router.get("/:id", async (req, res, next) => {
    try {
        // const account = await db.first("*").from("accounts").where("id", req.params.id)
        const account = await db("accounts").where("id", req.params.id).first()
        res.json(account)
    } catch (err) {
        next(err)
    }

})//working

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }
        //const account = await db("accounts").insert(payload)
        const [id] = await db("accounts").insert(payload)
        const account = await db("accounts").where("id", id).first()
        res.json(account)
    } catch (err) {
        next(err)
    }

})//working

router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }
        await db("accounts").where("id", req.params.id).update(payload)
        const updatedaccount = await db("accounts").where("id", req.params.id).first()
        res.json(updatedaccount)
    } catch (err) {
        next(err)
    }

})//working

router.delete("/:id", async (req, res, next) => {
    try {
        await db("accounts").where("id", req.params.id).del()
        res.status(204).end()
    } catch (err) {
        next(err)
    }

})//working

module.exports = router