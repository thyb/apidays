var Sequelize = require('sequelize')

module.exports = (model, req, app) => {
    let slug = req.slug || req.params.slug;

    return model.findOne({
        where: {
            slug: slug
        },
        include: [
            {
                model: app.entities.get('speaker').model,
                through: {
                    attributes: ['order'] 
                }
            },
            {
                model: app.entities.get('organizer').model,
                through: {
                    attributes: ['order']
                }
            },
            {
                model: app.entities.get('sponsor').model,
                through: {
                    attributes: ['order', 'category']
                }
            },
            {
                model: app.entities.get('partner').model
//                through: {
//                    attributes:
//                }
            },
            {
                model: app.entities.get('place').model
            }
        ]
    })
}