// 카테고리
export enum CategoryType {
    Clothes = 'Clothes',
    Shoes = 'Shoes',
    Accessories = 'Accessories',
    Bag = 'Bag'
}
// 상품유형
export enum ProductType {
    Luxuary = 'luxuary',
    Boutique = 'boutique',
    Vintage = 'vintage'
}
// 빈티지 등급
export enum VintageGrade {
    Splus= 'S+',
    S= 'S',
    Aplus= 'A+',
    A= 'A',
    Bplus= 'B+'
}
// 배송
export enum DeliveryType {
    Express= 'express', // 익스프레스
    Domestic= 'domestic', // 국내배송
    Abroad= 'abroad' // 해외배송
}
// 최소금액
export const minPrice = 0
// 최대금액
export const maxPrice = 3000000
// 상품
export interface ProductItem {
  productNo: number
  category: CategoryType
  productName: string
  productType: ProductType
  price: number
  vintageGrade: VintageGrade
  deliveryType: Array<DeliveryType>
  image: string
}