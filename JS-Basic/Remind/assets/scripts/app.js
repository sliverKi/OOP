// 현재 . 이 코드는 상품 수가 만개 오만개가 될때까지 일일이 data를 products 배열에 입력해야 하는 단점이 존재하고
// 이에따라 css style이 지속적으로 변경해야하는 번거로움이 존재함. 

const productList = {

    products : [//productList 배열 생성 --> [{객체1}, {객체2}, {개개체3}..{객체4}]
        {  
            title: "apple",
            imageUrl: "https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxNDY1MzcxMTkxMTY0/different-types-of-apples-jpg.jpg",
            price: 10000,
            description: "9 bunch apples",
        },
        {
            title: "green apple",
            imageUrl: "https://imagecdn.skstoa.com/goods/527/28338527_g.jpg",
            price: 10000,
            description: "9 bunch of green apples",
        }
    ],

    render() { //render method
        console.log("say huio: ", this)
        const renderHook = document.getElementById('app')
        const prodList = document.createElement("ul")
        prodList.className = 'product-list'
        for (const prod of this.products) { 
            const prodEl = document.createElement('li')
            prodEl.className='product-item'
            prodEl.innerHTML = `
            <div>
                <img src=${prod.imageUrl} alt=${prod.title} />
                <div class="prod-item__container">
                    <h2>${prod.title}</h2>
                    <p>${prod.price}</p>
                    <h3>${prod.description}</h3>
                    <button>Add to Cart </button>
                </div>
            </div>
            `;
            prodList.append(prodEl)
        }
        renderHook.append(prodList)
    }
}

productList.render()


