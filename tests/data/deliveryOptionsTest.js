import { getDeliveryOption, calculateDeliveryDate } from '../../client/data/deliveryOptions.js';


describe('test suite: deliveryOptions related', () => {
    let option; 

    beforeEach(() => {
        option = [{
            id: '1',
            deliveryDays: 7, 
            priceCents: 0 
        }, {
            id: '2', 
            deliveryDays: 3, 
            priceCents: 499
        }, {
            id: '3', 
            deliveryDays: 1, 
            priceCents: 999
        }];
    });

    it('check getDeliveryOption and calculate delivery date', () => {
        const deliveryOption = getDeliveryOption('3');
        const deliveryDate = calculateDeliveryDate(deliveryOption);
        const dayOfWeek = deliveryDate.format();

        expect(deliveryOption.id).toEqual('3');
        expect(dayOfWeek).not.toEqual('Saturday');
        expect(dayOfWeek).not.toEqual('Sunday');
    });
});

