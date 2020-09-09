const express = require('express');
const Posts = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been nuked' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = res.params;
  Posts.findById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        next({ code: 404, message: 'invalid post id' })
      }
    })
    .catch(err => {
      console.log(err);
      next({ code: 500, message: 'failed to process', err });
    })
}
module.exports = router;