const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    create(req, res, next) {
        res.render('courses/create');
    }
    //[PUT] /courses/:slug
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});
    }
    //[GET] /courses/:slug/edit
    edit(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    //[PUT] /courses/:slug
    update(req, res, next) {
        Course.updateOne({ slug: req.params.slug }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    //[DELETE] /courses/:slug
    destroy(req, res, next) {
        Course.delete({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] /courses/:slug/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH] /courses/:slug/restore
    restore(req, res, next) {
        Course.restore({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[POST] /courses/handleFormAction
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ slug: { $in: req.body.courseSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Unknown action' });
        }
    }
}
module.exports = new CourseController();
