class Product {
    //class 맨 첫글자는 반드시 대문자로 할것
    //field
    title = 'DEFAULT';
    imageUrl;
    price;
    description;
    //method
    constructor(title, img, price, desc) {
        this.title = title;
        this.imageUrl = img;
        this.price = price;
        this.description = desc;
    }
}
class ShoppingCart {
    items = [];

    addProduct(product) {
        this.items.push(product);
        this.totalOutput.innerHTML = `<h2>Total : \$${1}</h2>`;
    }
    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
            <h2>Total : \$${0}</h2>
            <button>Order Now!</button>
        `;
        cartEl.className = 'cart';
        this.totalOutput = cartEl.querySelector('h2');
        return cartEl;
    }
}
class RenderSingleProd {
    constructor(product) {
        console.log('this in SingleProd', this);
        this.product = product;
    }
    addToCart() {
        App.addProductToCart(this.product)
        console.log('this in add to Cart', this.product);
        //console.log('adding product to Cart.');
    }
    render() {
        const prodEL = document.createElement('li');
        prodEL.className = 'product-list';
        prodEL.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}">
                <div class = "product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
        const addCartBtn = prodEL.querySelector('button');
        console.log('this in render ', this);
        addCartBtn.addEventListener('click', this.addToCart.bind(this));
        return prodEL;
    }
}
class ProductList {
    products = [
        new Product(
            'A pillow',
            'https://www.ikea.com/kr/ko/images/products/dvala-pillowcase-black__0605348_pe681720_s5.jpg?f=s',
            19.99,
            'SOFT',
        ),
        new Product(
            'A Carpet',
            'https://thecarpetier.sg/cdn/shop/products/s-4898-scandinavian-carpetcar-cash-4898-120-592627.webp?v=1690186755&width=1946',
            89.99,
            'A carpet which you might like - or not',
        ),
    ];
    constructor() {}
    render() {
        const productList = document.createElement('ul');
        productList.className = 'product-list';
        console.log('1', this);
        for (const prod of this.products) {
            const product = new RenderSingleProd(prod);
            const prodEL = product.render();
            productList.append(prodEL);
        }
        return productList;
        //renderHook.append(productList);
    }
}
class Shop {
    render() {
        console.log("Shop in this", this)
        const renderHook = document.getElementById('app');
        this.cart = new ShoppingCart();
        const cartEl = this.cart.render();
        const productList = new ProductList();
        const productListEl = productList.render();
        renderHook.append(cartEl);
        renderHook.append(productListEl);
    }
}


// const shop = new Shop();
// shop.render();

class App {
    static cart;
    
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart=shop.cart
        console.log("App in this", this)
    }
    static addProductToCart(product) { 
        this.cart.addProduct(product);
    }
}
App.init()
