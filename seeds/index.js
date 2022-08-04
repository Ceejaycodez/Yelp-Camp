const mongoose = require('mongoose');
const Campground = require('../models/campground '); // "../" bacause we are looking at the capmgrpound from the models directory while we are in a separate directroy
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database Connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000) + 1;
		const price = Math.floor(Math.random() * 30) + 10;
		const camp = new Campground({
			// YOUR USER ID
			author: '62e053929a1dfb3446f78287',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)}, ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ducimus architecto pariatur maxime quos id, est laborum incidunt, corrupti quas iusto perspiciatis magni iure, ipsa illum sed modi deserunt dolorum.',
			price,
			geometry: {
				type: 'Point',
				coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
			},
			images: [
				{
					url:
						'https://res.cloudinary.com/dhvclwvr0/image/upload/v1659240655/YelpCamp/geiderlmkxxhzh67gvns.jpg',
					filename: 'YelpCamp/geiderlmkxxhzh67gvns'
				},
				{
					url:
						'https://res.cloudinary.com/dhvclwvr0/image/upload/v1659240669/YelpCamp/psfhczazbivqc27wrqys.jpg',
					filename: 'YelpCamp/psfhczazbivqc27wrqys'
				},
				{
					url:
						'https://res.cloudinary.com/dhvclwvr0/image/upload/v1659240673/YelpCamp/kyr7mjptt3smm8mua4hx.jpg',
					filename: 'YelpCamp/kyr7mjptt3smm8mua4hx'
				}
			]
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
