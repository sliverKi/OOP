class Product {//객체의 청사진 => class 
    title;
    imageUrl;
    price;
    description;

    constructor(title, imageUrl, price, desc) {
        //객체 설계도
        console.log(this); //this:: class Product
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = desc;
    }
}
class ElementAttribute { 
    constructor(attrName, attrValue) { 
        this.name = attrName
        this.value = attrValue
    }
}
class Component { 
    constructor(renderHookId) { 
        //console.log(renderHookId)
        this.hookId = renderHookId
        this.render()
    }

    render() { }
    createRootElement(tag, cssClasses, attributes) { 
        const rootElement = document.createElement(tag)
        if (cssClasses) { 
            rootElement.className = cssClasses
        } if (attributes && attributes.length > 0) { 
            for (const attr of attributes) { 
                rootElement.setAttribute(attr.name, attr.value)
            }
        }
        //console.log(this)
        document.getElementById(this.hookId).append(rootElement)
        return rootElement
    }
}


class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `
            <h2>total:\$${this.totalPrice.toFixed(2)}</h2>
        `; //totalPrice변수에 해당 하는 부분을 업데이트
    }
    get totalPrice() {
        const sum = this.items.reduce((preItem, curItem) => {
            return preItem + curItem.price;
        }, 0);
        return sum;
    }

    constructor(renderHookId) { 
        super(renderHookId);
    }
    addItem(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product)
        this.cartItems = updatedItems
        //console.log(this.items)
    }
    render() {
        //const cartEl = document.createElement('section');~> Component class 에서 상속받은 것 사용
        const cartEl = this.createRootElement('section', 'cart')
        
        cartEl.innerHTML = `
            <h2>total:\$${0}</h2>
            <button>Order NOW </button>
        `;
        //cartEl.className = 'cart';~> 상속으로 인해 필요없는 코드가 됌
        this.totalOutput = cartEl.querySelector('h2'); //1.cart의 innerHtml 의 h2부분을 totalPrice변수에 저장함
        return cartEl;
    }
}

class SingleProdItem extends Component{
    constructor(product, renderHookId) {
        super(renderHookId)
        this.product = product;
    }
    addToCart() {
        //ShoppingCart class내에 존재하는 addItem method를 가져오기~> 정적 메서드 이용
        App.addProductToCart(this.product);
        //console.log(this.product);
    }
    render() {
        //const prodEl = document.createElement('li');
        const prodEl = this.createRootElement('li', 'product-item')
        //prodEl.className = 'product-item';
        prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}">
                    <div class='product-item__content'>
                        <h2>${this.product.title}</h2>
                        <h3>$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to Cart </button>    
                    </div>
                </div>
            `;
        const addBtn = prodEl.querySelector('button');
        addBtn.addEventListener('click', this.addToCart.bind(this));
        //return prodEl;
    }
}

class ProductList extends Component{
    products = [
        new Product( //'new'keyword를 이용하여 객체를 만들겠다.
            'Apple',
            'https://freshindiaorganics.com/cdn/shop/products/Apples_grande.jpg?v=1686739530',
            20.99,
            'Apple Good',
        ),
        new Product(
            'Mango',
            'https://i.namu.wiki/i/IQFw-3D_TnH6a1CjO-gOGPkHYBn6YhyazdQkFzUIhJp1yGRoJf-rtpxZL-4O944EZElq5VCFRtGJVH2RS_JPNQ.webp',
            30.99,
            'Mango Good',
        ),
    ];
    constructor(renderHookId) {
        super(renderHookId)
        
       
    }
    //constructor() { }
    render() {
        //const prodList = document.createElement('ul');
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')])
        //prodList.id = 'prod-list'
        //prodList.className = 'product-list';
        for (const prod of this.products) {
            new SingleProdItem(prod, 'prod-list');
            //productItem.render();
            //prodList.append(prodEl);
        }
        //return prodList;
    }

    
}

class Shop extends Component{
    constructor() { 
        //console.log(renderHookId)
        super()
    }
    render() {
        //const renderHook = document.getElementById('app');

        this.cart = new ShoppingCart('app');
        //this.cart.render();
        new ProductList('app');
        //productList.render();
        //renderHook.append(cartEl);
        //renderHook.append(prodListEl);
    }
}

class App {
    static cart;
    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
        // shop.render();
    }
    static addProductToCart(product) {
        this.cart.addItem(product);
    }
}
App.init();
