const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:slug/edit', courseController.edit);
router.put('/:slug', courseController.update);
router.patch('/:slug/restore', courseController.restore);
router.delete('/:slug', courseController.destroy);
router.delete('/:slug/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);

module.exports = router;
