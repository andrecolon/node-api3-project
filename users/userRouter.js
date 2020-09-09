const express = require('express');
const Users = require('./userDb')
const router = express.Router();

router.post('/', (req, res) => {
  Users.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.post('/:id/posts', validatePost, (req, res) => {
  Users.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    });
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
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

router.get('/:id/posts', validatePost, (req, res) => {
  Users.getUserPosts(req.params.id)//Adjust this logic
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

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
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

router.put('/:id', validateUserId, (req, res) => {
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

//custom middleware

function validateUserId(req, res, next) {
  const { id } = res.params;
  Users.findById(id)
    .then(user => {
      if (user) {
        req.user = user;
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

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;