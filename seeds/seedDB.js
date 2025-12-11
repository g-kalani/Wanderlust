require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Listing = require('../models/listing');
const Review = require('../models/review');
const { cloudinary } = require('../cloudConfig');

const MONGO_URL = process.env.ATLAS_DB || 'mongodb://127.0.0.1:27017/wanderlust';

async function seed() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to DB for seeding');

        // Clear existing data and delete Cloudinary assets for existing listings
        const existingListings = await Listing.find({});
        for (const l of existingListings) {
            if (l.image && l.image.filename) {
                try {
                    await cloudinary.uploader.destroy(l.image.filename);
                } catch (err) {
                    console.warn('Failed to delete cloudinary asset for', l._id, err);
                }
            }
        }
        await Review.deleteMany({});
        await Listing.deleteMany({});
        await User.deleteMany({});

        // Create users
        const user1 = new User({ username: 'alice', email: 'alice@example.com' });
        await User.register(user1, 'password1');

        const user2 = new User({ username: 'bob', email: 'bob@example.com' });
        await User.register(user2, 'password2');

        // Create initial listings and upload distinct images to Cloudinary
        const imageUrls = [
            'https://images.unsplash.com/photo-1639405791326-b1168dd7ad71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q296eSUyMExha2VzaWRlJTIwQ2FiaW58ZW58MHx8MHx8fDA%3D.unsplash.com/photo-1552728089-0f1d4a9b8f2b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1585793700745-c0013db81e7d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=https://images.unsplash.com/photo-1585793700745-c0013db81e7d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%3D%3D.unsplash.com/photo-1505691723518-36a40b7851d9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1701825299870-398fb12864bb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/photo-https://plus.unsplash.com/premium_photo-1683121837356-f458c940f0ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW91bnRhaW4lMjBSZXRyZWF0fGVufDB8fDB8fHww-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1660645907675-3f708a3d2ee6?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/premium_photo-1682285210821-5d1b5a406b97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmVhY2glMjBCdW5nYWxvd3xlbnwwfHwwfHx8MA%3D%3D.unsplash.com/photo-1501117716987-c8e6a6d7f1c4?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1719008546743-c6f4f4b3f7bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y291bnRyeXNpZGUlMjBjb3R0YWdlfGVufDB8fDB8fHwy://images.unsplash.com/photo-1719008546743-c6f4f4b3f7bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q291bnRyeXNpZGUlMjBDb3R0YWdlfGVufDB8fDB8fHww.com/photo-1505691723521-2c4b0b6f0b0b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1505692794403-3f2b5d7b6b6b?auto=format&fit=crop&w=1200&q=80'
        ];

        const listingData = [
            { title: 'Cozy Lakeside Cabin', description: 'A peaceful cabin by the lake with great views.', price: 120, location: 'Lakeview', country: 'USA' },
            { title: 'Downtown Apartment', description: 'Walkable to restaurants and nightlife.', price: 160, location: 'City Center', country: 'USA' },
            { title: 'Mountain Retreat', description: 'A rustic cabin in the mountains.', price: 140, location: 'Highlands', country: 'USA' },
            { title: 'Beach Bungalow', description: 'Steps from the sand and surf.', price: 200, location: 'Seaside', country: 'USA' },
            { title: 'Countryside Cottage', description: 'Charming cottage with garden views.', price: 95, location: 'Countryside', country: 'UK' },
            { title: 'Modern Studio', description: 'Compact studio with modern amenities.', price: 80, location: 'Uptown', country: 'Canada' },
            { title: 'Historic Townhouse', description: 'Elegant townhouse in historic district.', price: 180, location: 'Old Town', country: 'France' },
            { title: 'Desert Villa', description: 'Secluded villa with stunning desert views.', price: 220, location: 'Desert Edge', country: 'Morocco' },
            { title: 'Forest Cabin', description: 'Quiet cabin surrounded by forest trails.', price: 110, location: 'Pine Woods', country: 'Germany' },
        ];

        const createdListings = [];
        for (let i = 0; i < listingData.length; i++) {
            const data = listingData[i];
            // upload sample image to Cloudinary
            let uploaded;
            try {
                uploaded = await cloudinary.uploader.upload(imageUrls[i], { folder: 'wanderlust_DEV' });
            } catch (err) {
                console.warn('Cloudinary upload failed, using image URL directly:', err);
            }
            const listing = new Listing({
                title: data.title,
                description: data.description,
                price: data.price,
                location: data.location,
                country: data.country,
                owner: i % 2 === 0 ? user1._id : user2._id,
            });
            if (uploaded) {
                listing.image = { url: uploaded.secure_url, filename: uploaded.public_id };
            } else {
                // fallback to external image url and a made-up filename
                listing.image = { url: imageUrls[i], filename: `seed-${Date.now()}-${i}` };
            }
            await listing.save();
            createdListings.push(listing);
        }

        // Create reviews
        const review1 = new Review({
            comment: 'Amazing stay, highly recommend!',
            rating: 5,
            author: user2._id,
        });
        await review1.save();

        const review2 = new Review({
            comment: 'Nice location but a bit noisy at night.',
            rating: 3,
            author: user1._id,
        });
        await review2.save();

        // Attach reviews to listings
        if (createdListings.length >= 2) {
            createdListings[0].reviews.push(review1);
            await createdListings[0].save();

            createdListings[1].reviews.push(review2);
            await createdListings[1].save();
        }

        console.log('Seeding complete.');
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        await mongoose.connection.close();
        console.log('DB connection closed');
    }
}

seed();
