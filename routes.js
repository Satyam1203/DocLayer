const router = require("express").Router();
const Document = require("./models/document");

router.route("/save").post(async (req, res) => {
  // save to db
  try {
    const document = await Document.create(req.body);
    if (document) {
      res.json({
        success: true,
        document,
      });
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.route("/find/all").post(async (req, res) => {
  // find by email
  try {
    const documents = await Document.find({ ...req.body, active: true });
    if (documents) {
      res.json({
        success: true,
        documents,
      });
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.route("/find").post(async (req, res) => {
  // find by file name and email
  try {
    const documents = await Document.findOne({
      email: req.body.email,
      active: true,
    });
    if (documents) {
      res.json({
        success: true,
        documents,
      });
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.route("/update").post(async (req, res) => {
  // update a file
  try {
    const updated = await Document.updateOne(
      { email: req.body.email, fileName: req.body.fileName },
      { content: req.body.fileName }
    );
    if (updated.modifiedCount) {
      res.json({
        success: true,
      });
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.route("/remove").post(async (req, res) => {
  // delete a file
  try {
    const updated = await Document.updateOne(
      { email: req.body.email, fileName: req.body.fileName },
      { active: false }
    );
    if (updated.modifiedCount) {
      res.json({
        success: true,
      });
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.route("/").get((req, res) => res.send("Hello from Doc Layer"));

module.exports = router;
