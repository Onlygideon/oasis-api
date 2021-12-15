const express = require('express');
const router = express.Router();
const request = require('request-promise');
const dotenv = require('dotenv');
const { response } = require('express');


dotenv.config({ path: '.env' });

//const apiKey = process.env.API_KEY;

const generateUrlKey = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`


//  API Mini README
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: [{
            name: 'Oasis API',
            about: 'This is an e-commerce Public API that can easily be integrated into web applications.',
            version: 1.0
        }]
    })
})


// GET Product Search Results
router.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateUrlKey(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`)

        res.status(200).json({
            success: true,
            count: response.length,
            data: [JSON.parse(response)]
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            data: err.message
        })
    }
})


// GET Product Infos
router.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateUrlKey(apiKey)}&url=https://www.amazon.com/dp/${productId}`)

        res.status(200).json({
            success: true,
            count: response.length,
            data: [JSON.parse(response)]
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            data: err.message
        })
    }
})


// GET Product Reviews
router.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateUrlKey(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`)

        res.status(200).json({
            success: true,
            count: response.length,
            data: [JSON.parse(response)]
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            data: err.message
        })
    }
})


// GET Product Offers
router.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateUrlKey(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

        res.status(200).json({
            success: true,
            count: response.length,
            data: [JSON.parse(response)]
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            data: err.message
        })
    }
})




module.exports = router;