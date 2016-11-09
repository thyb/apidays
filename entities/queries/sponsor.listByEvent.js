function sortCategory(a, b) {
    let value = {
        gold: 3,
        silver: 2,
        bronze: 1
    }
    
    if (value[a.category] > value[b.category]) {
        return 1
    }
    if (value[a.category] < value[b.category]) {
        return -1
    }
    return 0
}
function sortSponsors(a, b) {
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
        attributes: ['id', 'company'],
        include: [
            {
                attributes: ['slug'],
                model: app.entities.get('event').model,
                through: {
                    attributes: ['order', 'category']
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
            t.order = t.events[0].event_sponsor.order
            t.category = t.events[0].event_sponsor.category
            delete t.events
            return t;
        }).sort(sortCategory).sort(sortSponsors)
        //console.log(res);
        return Promise.resolve(res)
    })
    
}