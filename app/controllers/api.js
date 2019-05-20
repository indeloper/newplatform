const ObjectID = require('mongodb').ObjectID;

module.exports.get = (req, res) => {
    const gid = { 'gid': req.params.gid };
    const pid = { '_id': new ObjectID(req.params.pid) };
    req.app.locals.client.db("database").collection('platforms').findOne(gid, (err, item) => {
        if (!item) {
            res.send({ 'error': 'You haven`t premission, i`am sorry'});
        } else {
            // req.app.locals.client.db("database").collection('users').findOne(pid, (err, item) => {
            req.app.locals.collectionUsers.findOne(pid, (err1, item1) => {
                if (err1) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send(item1);            
                }
            });
        }
    })
}
module.exports.delete = (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    req.app.locals.collectionUsers.remove(details, (err, item) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send('Note ' + id + ' deleted!');
        } 
    });
}
module.exports.post = (req, res) => {
        const note = { login: req.body.login, password: req.body.password };
        req.app.locals.collectionUsers.insertOne(note, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
}
module.exports.put = (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { login: req.body.login, password: req.body.password };
    req.app.locals.collectionUsers.update(details, note, (err, result) => {
        if (err) {
                res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        } 
    });
}