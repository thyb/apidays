var Sequelize = require('sequelize')

module.exports = (model, req, app) => {
    let eventSlug = req.slug || req.params.slug || req.body.slug
    let speakerId = req.speaker_id || req.params.speaker_id || req.body.speaker_id
    let order = req.new_order || req.body.new_order

    let orderMin, orderMax, inc;
    return app.entities.get('event_speaker').model.findOne({
        where: {
            slug_event: eventSlug,
            id_speaker: speakerId
        }
    }).then(res => {
        if (res.order == order) {
            return Promise.reject('order has not changed')
        }
        else if (order < res.order) {
            orderMin = order
            orderMax = res.order
            inc = '+1'
        }
        else {
            orderMin = res.order
            orderMax = order
            inc = '-1'
        }
        return app.entities.get('event_speaker').model.update({
            order: app.database.sequelize.literal('"order"' + inc)
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
        return app.entities.get('event_speaker').model.update({
            order: order
        }, {
            where: {
                slug_event: eventSlug,
                id_speaker: speakerId
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
        return app.entities.get('speaker').getQuery('listByEvent').run({
            slug: eventSlug
        })
    })
}