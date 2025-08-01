import { Product, Clothing, Appliance } from '../../data/products.js'

describe('test suite: Productc class', () => {
    let product;
    
    beforeEach(() => {
            product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: [
                "socks",
                "sports",
                "apparel"
            ]
        });
    });


    it('check if Product class gets the correct property', () => {
        expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(product.rating).toEqual({
            stars: 4.5, 
            count: 87
        });
        expect(product.priceCents).toEqual(1090);
    });

    it('check getStarsUrl method', () => {
        expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
    });

    it('check getPrice method', () => {
        expect(product.getPrice()).toEqual('$10.90');
    });

    it('check for not render any extra info', () => {
        expect(product.extraInfoHTML()).toEqual('');
    });
});


describe('test suite: Appliance class', () => {
    let appliance;

    beforeEach(() => {
        appliance = new Appliance(    {
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ], 
            type: "appliances", 
            instructionsLink: "images/appliance-instructions.png", 
            warrantyLink: "images/appliance-warranty.png"
        });
    });

    it('check if Appliance class gets the correct property', () => {
        expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(appliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
        expect(appliance.name).toEqual('2 Slot Toaster - Black');
        expect(appliance.rating).toEqual({
            stars: 5, 
            count: 2197
        });
        expect(appliance.priceCents).toEqual(1899);
        expect(appliance.type).toEqual('appliances');
        expect(appliance.instructionsLink).toEqual('images/appliance-instructions.png');
        expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
    });

    it('check extra info for appliances rendering', () => {
        expect(appliance.extraInfoHTML()).toContain("images/appliance-instructions.png");
        expect(appliance.extraInfoHTML()).toContain("images/appliance-warranty.png");
    });
});


describe('test suite: Clothing class', () => {
    let clothing;

    beforeEach(() => {
            clothing = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        });
    });

    it('check if Clothing class gets the correct property', () => {
        expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(clothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
        expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
        expect(clothing.rating).toEqual({
            stars: 4.5, 
            count: 56
        });
        expect(clothing.priceCents).toEqual(799);
        expect(clothing.type).toEqual('clothing');
        expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
    });

    it('check extra info for clothing rendering', () => {
        expect(clothing.extraInfoHTML()).toContain("images/clothing-size-chart.png");
    });
});


