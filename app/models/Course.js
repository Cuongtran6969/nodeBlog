//tao ra cac schma (giong voi dtuong trong sql)
const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema

const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, maxLength: 255 },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String, require: true },
  },
  {
    _id: false,
    timestamps: true,
  }
)

//Add plugins
Course.plugin(AutoIncrement);

mongoose.plugin(slug)

Course.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true
});

module.exports = mongoose.model('Course', Course)
