export type ProductType = {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
}

const Products : ProductType[] = [
    {
        id: 1,
        name: 'Tシャツ',
        description: 'シンプルで着心地のよいTシャツ。',
        price: 2500,
        category: "Tops",
        image: '/images/tshirt.png'
    },
    {
        id: 2,
        name: 'キャップ',
        description: 'カジュアルに使える定番キャップ。',
        price: 1800,
        category: "Cap",
        image: '/images/cap.png'
    },
    {
        id: 3,
        name: 'ボトムス',
        description: 'スタイリッシュに映えるボトムス。',
        price: 2300,
        category: "Bottoms",
        image: '/images/bottoms.png'
    },
    {
        id: 4,
        name: 'シューズ',
        description: '軽い履き心地のシューズ。',
        price: 3000,
        category: "Shoes",
        image: '/images/shoes.png'
    }
];

export default Products;
