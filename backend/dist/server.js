"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3030;
// Mock 데이터 파일 경로
const dataFilePath = path_1.default.join(__dirname, '../MockProductItems.json');
let productItems = [];
// 데이터 로드
const loadProductItems = async () => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        productItems = JSON.parse(data);
    }
    catch (error) {
        console.error('Error loading product items:', error);
    }
};
loadProductItems();
// 필터링 함수
const filterProducts = (products, filters) => {
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
app.get('/products', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const size = parseInt(req.query.size, 10) || 10;
    const filters = {
        category: req.query.category,
        minPrice: parseInt(req.query.minPrice, 10) || 0,
        maxPrice: parseInt(req.query.maxPrice, 10) || 3000000,
        productType: req.query.productType,
        vintageGrade: req.query.vintageGrade ? (req.query.vintageGrade) : [],
        deliveryType: req.query.deliveryType ? (req.query.deliveryType) : []
    };
    const filteredProducts = filterProducts(productItems, filters);
    const paginatedProducts = filteredProducts.slice((page - 1) * size, page * size);
    res.json({
        totalCount: filteredProducts.length,
        list: paginatedProducts
    });
});
// 제품 개수 조회
app.get('/products/count', (req, res) => {
    const filters = {
        category: req.query.category,
        minPrice: parseInt(req.query.minPrice, 10) || 0,
        maxPrice: parseInt(req.query.maxPrice, 10) || 3000000,
        productType: req.query.productType,
        vintageGrade: req.query.vintageGrade ? (req.query.vintageGrade) : [],
        deliveryType: req.query.deliveryType ? (req.query.deliveryType) : []
    };
    const filteredProducts = filterProducts(productItems, filters);
    res.json({ count: filteredProducts.length });
});
// 특정 제품 조회
app.get('/products/:productNo', (req, res) => {
    const productNo = parseInt(req.params.productNo, 10);
    const product = productItems.find((p) => p.productNo === productNo);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ error: 'Product not found' });
    }
});
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
