const Spoiler = require("../model/spoiler");

exports.findOne = (request, response, next) => {

    const id = request.params.id;

    Spoiler.findById(id)
    .then(spoiler =>{
        if (spoiler){
            response.send(spoiler);
        }else{
            response.status(404).send();
        }
    }).catch(error => next(error));

};

exports.findAll = (request, response, next ) => {
    let limite = parseInt(request.query.limite || 0);
    let pagina = parseInt(request.query.pagina || 0);

    if(!Number.isInteger(limite) || !Number.isInteger(pagina)){
        response.status(400).send();
    }
    const ITENS_PORT_PAGINA = 10;

    Spoiler.findAll({ limite: limite, offset: pagina })
    .then(spoilers =>{
        response.send(spoilers);
    }).catch(error => next(error)); 

};

exports.criar = (request, response, next)=> {
    const titulo = request.body.titulo
    const espoliador = request.body.espoliador
    const descricao = request.body.descricao

    Spoiler.create({
        titulo: titulo,
        espoliador: espoliador,
        descricao: descricao
    }).then(() => {
        response.status(201).send();
        response.location("https://${hostname}:${port}/api/spoilers/{id}").send();
    }).catch((error) => next(error))

}

exports.update = (request, response, next) => {

    const id = request.params.id;

    const titulo = request.body.titulo
    const espoliador = request.body.espoliador
    const descricao = request.body.descricao

    Spoiler.findById(id)
    .then(spoiler => {
        if (spoiler){
            Spoiler.update(
                {
                    titulo: titulo,
                    espoliador: espoliador,
                    descricao: descricao
                },
                {
                    where: {id: id }
                }
            )
            .then(() => {
                response.status(204).send();
            })
            .catch(error => next(error));
        } else {
            response.status(404).send();
        }
    })
    .catch(error => next(error));
}

exports.delete = (request, response, next) => {

    const id = request.params.id;

    Spoiler.findById(id)
        .then(spoiler => {
            if (spoiler){
                Spoiler.destroy({
                    where: {id: id}
                })
                .then(() =>{
                    response.status(202).send();
                })
                .catch(error => next(error));
            }else{
                response.status(404).send();
            }
        })
    .catch(error => next(error));
}