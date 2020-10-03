import {
    getData
} from './getData.js';


const cartList = [{
        id: 'idd015',
        count: 3
    },
    {
        id: 'idd018',
        count: 2
    },
    {
        id: 'idd055',
        count: 1
    },
];

export const loadData = () => {

    

    if (location.pathname.includes('cart')) {
        getData.cart(cartList, (data) => console.log(data));
    }
};