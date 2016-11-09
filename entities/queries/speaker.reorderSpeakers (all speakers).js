function sortSpeakers(a, b) {
    console.log('sorting', a, b)
    if (a.event_speaker.order > b.event_speaker.order) {
        return 1
    }
    if (a.event_speaker.order < b.event_speaker.order) {
        return -1
    }
    return 0
}

module.exports = (model, req, app) => {
    let r = []
    return app.entities.get('event').model.findAll({
        include: [
            {
                model: model,
                through: {
                    attributes: ['order']
                }
            }
        ]
    }).then(res => {
        if ( ! res ) {
            return Promise.reject('There isn\'t any event yet.')
        }
        let promises = []
        res.forEach(event => {
            let e = event.get({plain: true})
            e.speakers.sort(sortSpeakers)

            e.speakers.forEach((speaker, order) => {
                promises.push(app.entities.get('event_speaker').model.update({
                    order: order + 1
                }, {
                    where: {
                        id_speaker: speaker.id,
                        slug_event: event.slug
                    }
                }))
            })
        })
        return Promise.all(promises).then(res => {
            return Promise.resolve({ok: true})
        }).catch(err => {
            return Promise.reject(err)
        })
    })
}