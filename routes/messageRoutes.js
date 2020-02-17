const router = require("express").Router();
const db = require("../models");

router.post("", (req, res) => {
  db.Message.create(req.body).then(messageData => {
    res.json(messageData);
  });
});

router.get("/all", (req, res) => {
  db.Message.findAll()
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  db.Message.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(message => res.json(message))
    .catch(err => res.status(500).json(err));
});

router.get("/sender/:id", (req, res) => {
  db.Message.findAll({
    where: {
      senderId: req.params.id
    }
  })
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json(err));
});

router.get("/receiver/:id", (req, res) => {
  db.Message.findAll({
    where: {
      receiverId: req.params.id
    }
  })
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json(err));
});

router.put("/update/:id", (req, res) => {
  db.Message.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(count => {
      if (count > 0) {
        res.json("updated");
      } else {
        res.json("not updated");
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/delete/:id", (req, res) => {
  db.Message.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(count => {
      if (count > 0) {
        res.json("deleted");
      } else {
        res.json("not deleted");
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
