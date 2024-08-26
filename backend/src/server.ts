import express, { Request, Response } from 'express';
import * as fs from 'fs/promises';
import path from 'path';
// @ts-ignore
import { ProductItem, CategoryType, ProductType, VintageGrade, DeliveryType } from '@shared/product';


const app = express();
const port = 3030;

// Mock 데이터 파일 경로
const dataFilePath = path.join(__dirname, '../MockProductItems.json');
let productItems: ProductItem[] = [];

// 데이터 로드
const loadProductItems = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    productItems = JSON.parse(data);
  } catch (error) {
    console.error('Error loading product items:', error);
  }
};

loadProductItems();

type ReqFilter = {
    minPrice: number,
    maxPrice: number,
    category?: CategoryType,
    productType?: ProductType,
    vintageGrade?: VintageGrade[],
    deliveryType?: DeliveryType[]
}

// 필터링 함수
const filterProducts = (products: ProductItem[], filters: ReqFilter) => {
  return products.filter((product) => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const matchesProductType = !filters.productType || product.productType === filters.productType;
    const matchesVintageGrade = !filters.vintageGrade || !filters.vintageGrade.length || filters.vintageGrade.includes(product.vintageGrade);
    const matchesDeliveryType = !filters.deliveryType || !filters.deliveryType.length || !!filters.deliveryType.find((deliveryType) => product.deliveryType.includes(deliveryType));

    return matchesCategory && matchesPrice && matchesProductType && matchesVintageGrade && matchesDeliveryType;
  });
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 모든 도메인에서 접근 허용
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 허용할 HTTP 메서드
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // 허용할 헤더

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// 제품 목록 조회 (페이징 및 필터링)
app.get('/products', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const size = parseInt(req.query.size as string, 10) || 10;
  const filters: ReqFilter = {
    category: req.query.category as CategoryType,
    minPrice: parseInt(req.query.minPrice as string, 10) || 0,
    maxPrice: parseInt(req.query.maxPrice as string, 10) || 3000000,
    productType: req.query.productType as ProductType,
    vintageGrade: req.query.vintageGrade ? (req.query.vintageGrade) as VintageGrade[] : [],
    deliveryType: req.query.deliveryType ? (req.query.deliveryType) as DeliveryType[] : []
  };

  const filteredProducts = filterProducts(productItems, filters);
  const paginatedProducts = filteredProducts.slice((page - 1) * size, page * size);

  res.json({
    totalCount: filteredProducts.length,
    list: paginatedProducts
  });
});

// 제품 개수 조회
app.get('/products/count', (req: Request, res: Response) => {
    const filters: ReqFilter = {
        category: req.query.category as CategoryType,
        minPrice: parseInt(req.query.minPrice as string, 10) || 0,
        maxPrice: parseInt(req.query.maxPrice as string, 10) || 3000000,
        productType: req.query.productType as ProductType,
        vintageGrade: req.query.vintageGrade ? (req.query.vintageGrade) as VintageGrade[] : [],
        deliveryType: req.query.deliveryType ? (req.query.deliveryType) as DeliveryType[] : []
    };

  const filteredProducts = filterProducts(productItems, filters);
  res.json({ count: filteredProducts.length });
});

// 특정 제품 조회
app.get('/products/:productNo', (req: Request, res: Response) => {
  const productNo = parseInt(req.params.productNo, 10);
  const product = productItems.find((p) => p.productNo === productNo);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
