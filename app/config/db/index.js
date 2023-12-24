const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tvc_education_dev')

    console.log('connect success')
  } catch (error) {
    console.log('Connect failure')
  }
}

module.exports = { connect }
