var express = require("express");
var router = express.Router();
var db = require("../public/javascripts/index");
var lib = require("../lib/lib.js");




router.post("/fetchtranrange", async (req, res) => {
  try {
    let { m, n } = req.body;
    const b = await db.fetchTran(m, n);
    return res.status(200).send({ message: b });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.post("/fetchaddress", async (req, res) => {
  try {
    let { address, m, n } = req.body;
    const b = await db.addressdetail(address, m, n);
    return res.status(200).send({ message: b });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.post("/txdetail", async (req, res) => {
  try {
    let { hash} = req.body;
    const b = await lib.txdetalil(hash);
    return res.status(200).send({ message: b });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
});










module.exports = router;
