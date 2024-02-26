class Product { 
    
    constructor(title, img, price, desc) { 
        this.title = title
        this.imageUrl = img
        this.price = price
        this.description = desc
    }
}

class ProductItem { //단일 상품에 대한 아웃 소싱

    constructor(product) { 
        console.log("h")
        this.product = product
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
        const renderHook = document.getElementById('app')
        const prodList = document.createElement("ul")
        prodList.className = 'product-list'
        for (const prod of this.products) { 
            const prodItem = new ProductItem(prod)//단일 상품 아웃소싱
            const prodEl = prodItem.render()
            prodList.append(prodEl)
        }
        renderHook.append(prodList)
    }
}

const prodList = new ProductList()
prodList.render()


