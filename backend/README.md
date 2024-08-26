## API 문서

### 개요
이 API는 상품 목록을 관리하고 쿼리할 수 있는 엔드포인트를 제공합니다. 필터링, 페이징, 개별 상품 세부 정보 조회를 지원합니다.

### 기본 URL
http://localhost:3030

### 실행 방법
```bash
# 1.모듈 설치
npm install

# 2. 서버 실행
npm start
```
- 서버가 실행되었다면 `서버가 http://localhost:${port}에서 실행 중입니다.` 가 터미널에 출력됩니다.

### API 사용
API 엔드포인트에 대해 아래와 같이 요청을 보낼 수 있습니다.
#### 1. 상품 목록 조회
- **엔드포인트**: `/products`
- **메소드**: `GET`
- **설명**: 페이지네이션된 상품 목록을 조회하며, 여러 필터링 기준으로 제품을 필터링할 수 있습니다.
- **요청 예시**:
  ```bash
    curl "http://localhost:3030/products?page=1&size=10&category=Shoes&minPrice=100&maxPrice=1000&productType=boutique&vintageGrade[]=A&deliveryType[]=express"
    ```

#### 2. 상품 개수 조회
- **엔드포인트**: `/products/count`
- **메소드**: `GET`
- **설명**: 제공된 필터와 일치하는 제품의 개수를 조회합니다.
- **요청 예시**:
  ```bash
    curl "http://localhost:3030/products/count?category=electronics&minPrice=100&maxPrice=1000&productType=gadget&vintageGrade[]=A&deliveryType[]=express"
    ```

#### 3. 특정 상품 조회
- **엔드포인트**: `/products/:productNo`
- **메소드**: `GET`
- **설명**: 제품 번호로 특정 제품의 세부 정보를 조회합니다.
- **요청 예시**:
  ```bash
    curl "http://localhost:3030/products/1"
    ```

### 참고 사항
- 서버는 기본적으로 포트 3030에서 실행됩니다. 포트를 변경하려면 코드의 port 변수를 수정하십시오.
- 오류 응답과 로그는 콘솔에서 확인할 수 있습니다.