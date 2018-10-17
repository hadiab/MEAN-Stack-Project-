import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Person from './models/Person';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/persons');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/persons').get((req, res) => {
    Person.find((err, persons) => {
        if (err)
            console.log(err);
        else
            res.json(persons);
    });
});

router.route('/persons/:id').get((req, res) => {
    Person.findById(req.params.id, (err, Person) => {
        if (err)
            console.log(err);
        else
            res.json(Person);
    });
});

router.route('/persons/add').post((req, res) => {
    let person = new Person(req.body);
    person.save()
        .then(person => {
            res.status(200).json({'Person': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/persons/update/:id').post((req, res) => {
    Person.findById(req.params.id, (err, Person) => {
        if (!Person)
            return next(new Error('Could not load document'));
        else {
            Person.name = req.body.name;
            Person.email = req.body.email;
            Person.gender = req.body.gender;
            Person.phone = req.body.phone;

            Person.save().then(Person => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/persons/delete/:id').get((req, res) => {
    Person.findByIdAndRemove({_id: req.params.id}, (err, Person) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));