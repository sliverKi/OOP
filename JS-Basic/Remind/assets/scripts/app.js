class Product { 
    
    constructor(title, img, price, desc) { 
        this.title = title
        this.imageUrl = img
        this.price = price
        this.description = desc
    }
}

class ShoppingCart { 
    constructor() { }
    items = []//click되어진 상품을 담을 배열

    get totalAmount() { 
        const sum = this.items.reduce((prev, cur) => prev + cur.price, 0)
        return sum 
    }

    addProduct(product) { 
        this.items.push(product)
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`;
    }

    render() { //<render cart section>
        const cartEl = document.createElement('section')
        cartEl.className = 'cart'
        cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
        this.totalOutput=cartEl.querySelector('h2')
        return cartEl
    }
}

class ProductItem { //단일 상품에 대한 아웃 소싱

    constructor(product) { 
        console.log("h")
        this.product = product
    }

    addToCart() { 
        // console.log("I'm clicked");
        // console.log(this.product)
        App.addProductToCart(this.product)
        // cart.addProduct()//Error: cart is not defined. ~> cart변수는 외부 클래스 변수에 존재하기 때문에 ProductItem class에서 사용할 수 없음~~>해결방법: 정적 메서드 이용하기 
    }
    render() { 
        console.log("kk")
        const prodEl = document.createElement('li')
        prodEl.className='product-item'
        prodEl.innerHTML = `
        <div>
            <img src=${this.product.imageUrl} alt=${this.product.title} />
            <div class="prod-item__container">
                <h2>${this.product.title}</h2>
                <p>${this.product.price}</p>
                <h3>${this.product.description}</h3>
                <button>Add to Cart </button>
            </div>
        </div>
        `;
        const addCartBtn = prodEl.querySelector('button')
        addCartBtn.addEventListener('click', this.addToCart.bind(this))
        return prodEl
    }
}

class ProductList { 
    products = [
        new Product(
            "apple",
            "https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxNDY1MzcxMTkxMTY0/different-types-of-apples-jpg.jpg",
            10000,
            "9 bunch apples",
        ),  
        new Product(
            "green apple",
            "https://imagecdn.skstoa.com/goods/527/28338527_g.jpg",
            10000,
            "9 bunch of green apples",
        )   
    ]

    render() { //render method
        const prodList = document.createElement("ul")
        prodList.className = 'product-list'
        for (const prod of this.products) { 
            const prodItem = new ProductItem(prod)//단일 상품 아웃소싱
            const prodEl = prodItem.render()
            prodList.append(prodEl)
        }
        return prodList
        // renderHook.append(prodList)
    }
}

class Shop { 
    render() { 
        const renderHook = document.getElementById('app')
        this.cart = new ShoppingCart()
        const cartEl = this.cart.render()
        const productList = new ProductList()
        const productListEl = productList.render()

        renderHook.append(cartEl)
        renderHook.append(productListEl)

    }
}
class App { 
    static cart
    static init() { 
        const shop = new Shop()
        shop.render()
        this.cart = shop.cart

    }
    static addProductToCart(product) { 
        this.cart.addProduct(product)
    }
}
App.init()


