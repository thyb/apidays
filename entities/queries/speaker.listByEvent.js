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
        attributes: ['id', 'name'],
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
            //console.log(t)
            t.slug = t.events[0].slug
            t.order = t.events[0].event_speaker.order
            delete t.events
            return t;
        }).sort(sortSpeakers)
        //console.log(res);
        return Promise.resolve(res)
    })
    
}