const express = require('express')
const { Sequelize, DataTypes, Model, Op } = require('sequelize');

const app = express()
const port = 3001

const matter = require( './routes/matter');
const matterType = require( './routes/matterType');
const matterTypeReferrence = require( './routes/matterTypeReferrence');
app.use('/api', matter)
app.use('/api', matterType);
app.use('/api', matterTypeReferrence);


const sequelize = new Sequelize('test_db', 'root', 'abc123@', {
    host: 'localhost',
    dialect: 'mysql'
  });


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



app.get('/authenticate', async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        res.send('userCreate done!')
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.send('Unable to connect to the database')
      }
  })



  class Animal extends Model {}
  Animal.init({
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Animal' // We need to choose the model name
  });


  app.get('/animalCreate', async (req, res) => {
    await Animal.sync({ force: true});
    const animal = await Animal.create({
      firstName : 'lion',
      lastName : 'ants'
    });
    const rows = await sequelize.query('select * from Animals');
    console.log(rows);
  });

  app.get('/animalAdd', async (req, res) => {
    // await Animal.sync({ force: true});
    const animal = await Animal.create({
      firstName : 'elephant',
      lastName : 'aaaa'
    });
    const rows = await sequelize.query('select * from Animals');
    console.log(rows);
  });


  app.get('/animalSelectAll', async (req, res) => {

    const animals = await Animal.findAll({
        attributes: [ 'lastName']
      });
    console.log(animals.every(animal => animal instanceof Animal)); // true
    console.log("All animals:", JSON.stringify(animals, null, 2));
    res.json(animals);
  })


  app.get('/animalfindWhere', async (req, res) => {

    const elephants = await Animal.findAll({
        where: {
        [Op.and]: [
            { firstName: 'elephant' },
            { lastName: 'ants' }
        ]
        }
    })
    console.log("elephants", elephants)
    res.json(elephants);
  })


app.get('/userCreate', async (req, res) => {

  const User = sequelize.define('User', {
    firstName : {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName : {
      type: DataTypes.STRING
    }
  }, {
  });
  (async()=>{
    await User.sync({ force: true});
    const user = await User.create({
      firstName : 'alice',
      lastName : 'husigi'
    });
    const rows = await sequelize.query('select * from Users');
    console.log(rows);
  })();
})