function sortSpeakers(a, b) {
    if (a.order > b.order) {
        return 1
    }
    if (a.order < b.order) {
        return -1
    }
    return 0
}

module.exports = (model, req, app) => {
    return model.findAll({
        attributes: ['company'],
        include: [
            {
                attributes: ['slug'],
                model: app.entities.get('event').model,
                through: {
                    attributes: ['order']
                },
                
                where: {
                    slug: req.slug || req.params.slug
                }
            }
        ],
    }).then(res => {
        res = res.map(row => {
            let t = row.get({plain: true})
            t.slug = t.events[0].slug
            t.order = t.events[0].event_organizers.order
            delete t.events
            return t;
        }).sort(sortSpeakers)
        return Promise.resolve(res)
    })
    
}