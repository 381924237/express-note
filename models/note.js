const Sequelize = require('sequelize')
const path = require('path')

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  storage: path.join(__dirname, '../database/database.sqlite')
})

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err)
//   })

const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  }
})

// Note.sync().then(() => {
//   Note.create({
//     text: 'yyyyyyy'
//   })
// }).then(() => {
//   Note.findAll().then(notes => {
//     console.log("All notes:", JSON.stringify(notes, null, 2))
//   })
// })

// Note.findAll({raw: true, where: {id: 2}}).then(note => {
//   console.log(note)
// })


Note.sync()

module.exports = Note
