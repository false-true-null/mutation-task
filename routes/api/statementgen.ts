const router      = require('express').Router();
const auth        = require('../auth');
const { generateUpdateStatement } = require('../../utils/updateStatement');


router.post('/mutations', auth.optional, async (req, res) => {
  const { body: { document, mutation } } = req;
  const result = generateUpdateStatement(document, mutation)
  return res.json({ result });
});

module.exports = router;