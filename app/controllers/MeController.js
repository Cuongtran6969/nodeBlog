const Course = require('../models/Course')
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require('../../util/mongoose')

class MeController {
  //[GET] me/store/courses
  storedCourses(req, res, next) {
    // res.json(res.locals._sort)
    let requestCourse = Course.find({})

    if (req.query.hasOwnProperty('_sort')) {
      requestCourse = requestCourse.sort({
        [req.query.column]: req.query.type
      })
    }

    Promise.all([requestCourse, Course.countDocumentsWithDeleted({ deleted: true })])
      .then(([courses, deleteCount]) => {
        res.render('me/stored-courses', {
          deleteCount,
          courses: multipleMongooseToObject(courses)
        })
      })
      .catch(next)
  }

  //[GET] me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) => {
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        })
      })
      .catch(next)
  }
}





module.exports = new MeController()
