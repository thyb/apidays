module.exports = (model, req, app) => {
    return model.findAll().then(res => {
        /*
        let res = []
        res.forEach((row, i) => {
            res.push(model.update({
                order: i + 1
            }, {
                where: {
                    slug_event: row.slug_event,
                    id_speaker: row.id_speaker
                }
            }))
        })
        Promise.resolve(Promise.all(res))
        */
        Promise.resolve(res)
    })
}