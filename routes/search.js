var express = require('express');
var router = express.Router();

const pageTitle = 'Salle du SWAPI'

/* GET search page. */
router.get('/', async (req, res, next) => {
	try {
		// Get all attributes
		const axios = require('axios');
		var url = 'https://swapi.dev/api/'
		console.log('[API GET METHOD] : '+url );
		const apiAttributes = await axios.get(url)
		const attributesList = Object.keys(apiAttributes.data)
		let attributesContent = {}

		// Fill attributesContent
		for (var i = 0; i < attributesList.length; i++) {
			const attribute = attributesList[i]
			const urlForOneAttribute = apiAttributes.data[attribute]
			const content = await axios.get(urlForOneAttribute)
			attributesContent[attribute] = content.data
		}
		res.render('search', {title:pageTitle, apiData:null, attributesContent:attributesContent });
	} catch (error) {
	    // Passes errors into the error handler
	    return next(error)
 	}
});

module.exports = router;
router.get('/:attribute/:id', async (req, res, next) => {
	try {
		const axios = require('axios');
		var url = 'https://swapi.dev/api/'+req.params.attribute+'/'+req.params.id
		console.log('[API GET METHOD] : '+url );
		const api = await axios.get(url)
		res.render('search', {title:pageTitle, apiData:api.data, attributesContent:null});
	} catch (error) {
	    // Passes errors into the error handler
	    return next(error)
 	}
});