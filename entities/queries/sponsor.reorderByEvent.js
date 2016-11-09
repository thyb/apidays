function sortSponsors(a, b) {
    if (a.event_sponsor.order > b.event_sponsor.order) {
        return 1
    }
    if (a.event_sponsor.order < b.event_sponsor.order) {
        return -1
    }
    return 0
}

module.exports = (model, req, app) => {
    let r = []
    return app.entities.get('event').model.findOne({
        include: [
            {
                model: model,
                through: {
                    attributes: ['order']
                }
            }
        ],
        where: {
            slug: req.slug || req.params.slug
        }
    }).then(event => {
        if ( ! event ) {
            return Promise.reject({ok: false, message: 'The slug is not valid'})
        }
        let promises = []
        let e = event.get({plain: true})
        e.sponsors.sort(sortSponsors)

        e.sponsors.forEach((sponsor, order) => {
            promises.push(app.entities.get('event_sponsor').model.update({
                order: order + 1
            }, {
                where: {
                    id_sponsor: sponsor.id,
                    slug_event: event.slug
                }
            }))
        })
        return Promise.all(promises).then(res => {
            return Promise.resolve({ok: true})
        }).catch(err => {
            return Promise.reject(err)
        })
    })
}