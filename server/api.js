const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let data = [                              // eslint-disable-line prefer-const
  {
    name: 'Pusheen',
    time: new Date('May 4, 2017 11:13:00'),
    content: 'Hi~ I\'m pusheen the cat.',
    replies: [
      {
        name: 'Howard',
        time: new Date('May 4, 2017 11:15:00'),
        content: '>////<',
      },
    ],
  },
];

router.get('/comments', (req, res) => {
  res.json(data);
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/comments', (req, res) => {
  data.push(req.body);
  res.send('comment added');
});

router.post('/comments/:id', (req, res) => {
  data[req.params.id].replies.push(req.body);
  res.send('reply added');
});

module.exports = router;
