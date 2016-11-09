var Sequelize = require('sequelize')

module.exports = (model, req, app) => {
    let eventSlug = req.slug || req.params.slug || req.body.slug
    let organizerCompany = req.company || req.params.company || req.body.company
    let order = req.new_order || req.body.new_order

    let orderMin, orderMax, inc;
    return app.entities.get('event_organizers').model.findOne({
        where: {
            slug_event: eventSlug,
            company_organizer: organizerCompany
        }
    }).then(res => {
        let oldOrder = res.get('order')
        if (oldOrder == order) {
            return Promise.reject('order has not changed')
        }
        else if (order < oldOrder) {
            orderMin = order
            orderMax = oldOrder
            inc = '+1'
        }
        else {
            orderMin = oldOrder
            orderMax = order
            inc = '-1'
        }
        return app.entities.get('event_organizers').model.update({
            order: app.database.sequelize.literal('`order`' + inc)
        }, {
            where: {
                order: {
                    $gte: orderMin,
                    $lte: orderMax
                },
                
                slug_event: eventSlug,
            }
        })
    }).then(res => {
        return app.entities.get('event_organizers').model.update({
            order: order
        }, {
            where: {
                slug_event: eventSlug,
                company_organizer: organizerCompany
            }
        })
    })
    /*.then(res => {
        console.log(res);
        return app.entities.get('speaker').getQuery('reorderSpeakersByEvent').run({
            slug: eventSlug
        })
    })*/
    .then(res => {
        return app.entities.get('organizer').getQuery('listByEvent').run({
            slug: eventSlug
        })
    })
}