export type Color = {
    id: number,
    title: string,
    code: string
}

export type Product = {
    id: number,
    title: string,
    slug: string,
    image: {
        file: {
            url: string,
            name: string,
            originalName: string,
            extension: string,
            size: string
        }
    },
    price: number,
    colors: Array<Color>
}

export type CardProduct = {
    id: number,
    title: string,
    slug: string,
    image: {
        file: {
            url: string,
            name: string,
            originalName: string,
            extension: string,
            size: string
        }
    },
        price: number,
        colors: Array<Color>,
        category: {
            id: number,
            title: string,
            slug: string
    },
    content: string
}

export type ItemsInCart = Array<ProductForBasket>

export type ProductForBasket = {
    id: number,
    color: string,
    price: number,
    totalPrice: number,
    productQuantity: number,
    totalAmount: number,
    name: string,
    category: string,
    urlImage: string
}
