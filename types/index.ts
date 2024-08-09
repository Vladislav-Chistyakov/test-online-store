export type Color = {
    id: Number,
    title: String,
    code: String
}

export type Product = {
    id: number,
    title: String,
    slug: String,
    image: {
        file: {
            url: String,
            name: String,
            originalName: String,
            extension: String,
            size: String
        }
    },
    price: Number,
    colors: Array<Color>
}
