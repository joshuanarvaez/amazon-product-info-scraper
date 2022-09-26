const express = require('express'); // to use express, we require it
const request = require('request-promise'); // using to make api requests

const app = express(); // Initialize application

const PORT = process.env.PORT || 5000; // Create our port


// function that requires users of our scraper API to get their own scraper API key
const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json()); // Allows our app to parse JSON input - call the function inside of app.use

// ** ENDPOINTS ** //

// First endpoint - just a message to let us know our server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Product Info API. Your server is running.');
});

// GET product details - colon in path states that productID will be dynamic

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response)); //res.json gives data but we parse it before response to increase readability.
    } catch (error) {
        res.json(error);
    }
})

// GET product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response)); //res.json gives data but we parse it before response to increase readability.
    } catch (error) {
        res.json(error);
    }
})

// GET product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response)); //res.json gives data but we parse it before response to increase readability.
    } catch (error) {
        res.json(error);
    }
})

// GET search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response)); //res.json gives data but we parse it before response to increase readability.
    } catch (error) {
        res.json(error);
    }
})

// Last thing to get server running is to tell it to listen on a specific port. Express has callback function which executes when
// we run the app. We use it to console.log our port in a template string.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));