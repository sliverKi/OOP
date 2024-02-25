class Product {
    //객체 틀 담당 class
    // class를 기반으로 객체를 생성할 경우,
    // 모든 필드가 그 객체의 속성으로 변하게 된다.
    // title="class";
    // imageUrl;
    // price;
    // description;

    constructor(title, image, desc, price) {
        //생성자 함수
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class ElementAttribute { 
    constructor(attrName, attrValue) { 
        this.name = attrName
        this.value = attrValue
    }
}
class Component { 
    constructor(renederHookId) {
        console.log("Called")
        this.hookId = renederHookId
    }
    createRootElement(tag, cssClasses, attributes) { 
        const rootElement = document.createElement(tag);
        if (cssClasses) { 
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) { 
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement)
        return rootElement
    }
}
class ShoppingCart extends Component{
    items = [];
    set cartItems(value) {//value = cartItems의 배열=> 즉, 기존의 items 배열을 cartItmes배열로 덮어씀
        this.items = value;
        this.totalOutPut.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`; // 새로운 cartItmes를 설정할때 마다, 
                                                                              // totalAmount를 계산하고 HTML code를 업데이트 함. +)toFixed:부동 소수점
     }
    get totalAmount() {
        const sum = this.items.reduce(
            (prevValue, curItem) => prevValue + curItem.price,
            0,
        );
        return sum;
    }

    addProduct(product) {
        //this.items.push(product);
        const updatedItems = [...this.items]//본 배열인 items의 사본 배열을 만들고
        updatedItems.push(product)//사본 배열에 상품을 추가한다음
        this.cartItems = updatedItems//setter에 트리거 할 수 있도록 전달하여 setter에서는 가격을 계산하여 출력을 업데이트 한다.
    }

    constructor(renederHookId) { 
        super(renederHookId); //자식 클래스에서 생성자를 호출시 먼저 부모클래스의 생성자를 먼저 호출 해야 함 
    }
    
    render() {
        //상속 전 코드 : const cartEl = document.createElement('section');//상속 구현~> extends 키워드 추가 
        const cartEl = this.createRootElement('section', 'cart')//상속 후 코드 :
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        //상속 전 코드 :cartEl.className = 'cart';
        this.totalOutPut = cartEl.querySelector('h2');
        return cartEl;
    }
}

class ProductItem extends Component{
    // 단일 상품 rednering 담당 class
    constructor(product, renederHookId) {
        //console.log("Called///")
        super(renederHookId);
        this.product = product;
    }
    addToCart() {
        App.addProductToCart(this.product);
    }
    render() {
        //상속 전 코드 : const prodEl = document.createElement('li');
        //상속 전 코드 :  prodEl.className = 'product-item';
        const prodEl = this.createRootElement('li', 'product-item')//상속 구현
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}", alt="${this.product.title}">
                <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <p>${this.product.description}</p>
                <h3>${this.product.price}</h3>
                <button>Add to Cart</button>
                </div>
            </div>
        `;
        const addCartButton = prodEl.querySelector('button'); //1. queryselector로 요소 접근
        addCartButton.addEventListener('click', this.addToCart.bind(this)); //2. 접근하였다면, 클릭 이벤트 등록
        //return prodEl; -> 상속으로 인해 더이상 필요하지 않게 됨
    }
}
class ProductList extends Component{
    products = [
        new Product(
            'Apple',
            'https://www.outdoornews.co.kr/news/photo/202009/32077_90504_551.jpg',
            'envy Apple',
            80.99,
        ),
        new Product(
            'Mango',
            'https://i.namu.wiki/i/IQFw-3D_TnH6a1CjO-gOGPkHYBn6YhyazdQkFzUIhJp1yGRoJf-rtpxZL-4O944EZElq5VCFRtGJVH2RS_JPNQ.webp',
            'envy Mango',
            90.99,
        ),
    ];

    constructor(renederHookId) { 
        console.log("h")
        super(renederHookId)
    }
    render() {
        // 모든 상품 rednering 담당 class
        //const renederHook = document.getElementById('app')
        // const prodList = document.createElement('ul');//상속 구현 
        // prodList.className = 'product-list';
        const prodList = this.createRootElement('ul', 'product-list', [new ElementAttribute('id','prod-list')]);
        //상속으로 인해 더이상 필요 없음 : prodList.id = 'prod-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod, 'prod-list');
            productItem.render();
            
        }
        
    }
}

class Shop {
    render() {
        this.cart = new ShoppingCart('app');//상속 후 코드 shoppingCart class의 생성자 함수에서 renderHookId를 매개변수로 받기 때문에 전달 
        //this.cart.render();//render()에 대해서 method-overriding 할거임 왜냐면 수동으로 호출하는게 아니라 자동으로 생성 과정에 호출되길 원함.
        new ProductList('app');
        //productList.render();
       
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();
        //shop.render(); 수동으로 호출하는게 아니라 자동으로 생성 과정에 호출되길 원함.
        this.cart = shop.cart;
    }
    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}
//const app = new App()
// 을 할 필요가 없음-> App class는 정적 클래스이기 때문에 클래스 자체에 엑세스 가능
App.init();
