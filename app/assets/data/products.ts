export type Product = {
    id: number
    name: string
    price: number
    image: string
    description?: string
    tags?: string[]
}

export const products: Product[] = [
    { id: 1, name: 'Eternal Gold Band', price: 199, image: '/images/ring-1.jpg' },
  { id: 2, name: 'Diamond Halo Ring', price: 299, image: '/images/ring-2.jpg' },
  { id: 3, name: 'Rose Gold Promise', price: 249, image: '/images/ring-3.jpg' },
  { id: 4, name: 'Platinum Classic', price: 349, image: '/images/ring-4.jpg' }
]