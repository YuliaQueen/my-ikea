import {
    getData
} from './getData.js';

const COUNTER = 6;
const wishlist = ['idd005', 'idd085', 'idd096'];


const generateGoodsPage = () => {
    const mainHeader = document.querySelector('.main-header');
    const goodsList = document.querySelector('.goods-list');

    const generateCards = (data) => {
        goodsList.textContent = '';
        if (!data.length) {
            const goods = document.querySelector('.goods');
            goods.textContent = location.search === '?wishlist' ?
                'Список желаний пуст' :
                'По вашему запросу ничего не найдено.';
                return;
        }
        data.forEach(item => {

            const { //деструктуризация объекта
                name: itemName,
                count,
                id,
                description,
                img,
                price
            } = item;

            goodsList.insertAdjacentHTML('afterbegin', `
            <li class="goods-list__item">
				<a class="goods-item__link" href="card.html#${id}">
					<article class="goods-item">
						<div class="goods-item__img">
							<img src=${img[0]}
								${img[1] ? `data-second-image=${img[1]}` : ''}
								alt="${itemName}">
                        </div>
                        ${count > COUNTER ? `<p class="goods-item__new">Новинка</p>` : ''}
                        ${!count ? `<p class="goods-item__new">Нет в наличии</p>` : ''}
						<h3 class="goods-item__header">${itemName}</h3>
						<p class="goods-item__description">${description}</p>
						<p class="goods-item__price">
							<span class="goods-item__price-value">${price}</span>
							<span class="goods-item__currency"> ₽</span>
                        </p>
                        ${count ? `<button class="btn btn-add-card" aria-label="Добравить в корзину"
							data-idd="${id}"></button>` : ''}						
					</article>
				</a>
			</li>
            `);
        });
    };

    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].slice(1);
        const value = search.split('=')[1];

        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;
        } else if (prop === 'wishlist') {
            getData.wishlist(wishlist, generateCards);
            mainHeader.textContent = `Список желаний`;
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }
};

export default generateGoodsPage;