const router = require('express').Router();
let Abstract = require('../models/abstracts.model');

router.route('/').get((req, res) => {
  Abstract.find()
    .then(abstract => res.json(abstract))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/count').get((req, res) => {
     Abstract.countDocuments({
        "tipo" : { "$exists" : false } 
        }, function (err, count) {
        res.json(count);
      });
});

router.route('/first/').get((req, res) => {
    Abstract.findOne({
        "tipo" : { "$exists" : false } 
     })
     .then(abstract => res.json(abstract))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const input_url = req.body.input_url;
    const titulo = req.body.titulo;
    const texto = req.body.texto;
    const tipo = "";
    const corriente = "";
    const newAbstract = new Abstract({
        input_url,
        titulo,        
        texto,
        tipo,
        corriente
    });
    newAbstract.save()
    .then(() => res.json('Abstract added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Abstract.findById(req.params.id)
      .then(abstract => res.json(abstract))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/delete/:id').get((req, res) => {
Abstract.findByIdAndDelete(req.params.id)
    .then(() => res.json('Abstract deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
Abstract.findById(req.params.id)
    .then(abstract => {
    abstract.input_url = req.body.input_url;
    abstract.titulo = req.body.titulo;
    abstract.texto = req.body.texto;
    abstract.tipo = req.body.tipo;
    abstract.corriente = req.body.corriente;
    abstract.save()
        .then(() => res.json('Abstract updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/anotar/:id').post((req, res) => {
    Abstract.findById(req.params.id)
        .then(abstract => {
        abstract.tipo = req.body.tipo;
        abstract.corriente = req.body.corriente;
        abstract.save()
            .then(() => res.json('Abstract anotated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/desanotar/:id').get((req, res) => {
    Abstract.findById(req.params.id)
        .then(abstract => {
        abstract.tipo = "";
        abstract.corriente = "";
        abstract.save()
            .then(() => res.json('Abstract desanotated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
    
module.exports = router;