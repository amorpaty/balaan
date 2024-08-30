## Setup

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

### 구현 Step 별 설명

## 1. 상품 목록 기능

1.1 페이지 로드 시, [GET] /products API를 호출하여 상품 데이터 표출 - ProductItem Component를 생성하여 mounted 될 때 데이터를 API 통해 조회하여 products 배열 변수에 담아 바인딩하여 v-for로 돌려 표출

1.2 상품 목록은 30개씩 노출되도록 페이징 기능을 구현

- 한 페이지에 표출될 항목수와 현재 페이지 정보를 담을 변수, 표출된 페이지 수 이렇게 세가지를 변수로 설정한 후
  데이터를 API를 통해 가지고 올때 전체 갯수도 가져오기 때문에 전체갯수를 한 페이지에 표출될 항목수로 나누어 전체 페이지 수를 구해서
  v-for를 통해 버튼 표출

  1.3 상품 필터를 변경할 경우, [GET] /products API를 호출하여 필터에 맞는 상품 데이터 표출 - 각 필터에 해당하는 변수를 설정하여 필터 값을 선택하면 selectFilter 메소드를 통헤 변수에 값을 셋팅하고 적용버튼을 클릭 할 때
  this.$emit() 을 사용하여 부모 Component에 있는 메소드에 값을 전달하여 최종적으로 PruductItm Component로 filterData를 넘기고
  watch를 통해 filterData의 값 변경을 감지하여 상품 데이터 조회 메소드(fetchProducts)를 실행하여 필터에 맞는 상품 데이터 표출

### 상품 필터 기능

1.1 상품 목록 페이지에서 필터를 활성화한 상태라면 기본 값으로 설정 - 필터에서 선택한 값을 filterData에 담아 this.$emit() 을 사용하여 부모 Component에 있는 메소드에 값을 전달하여 :class 에 조건을 넣어
조건에 부합할 경우 active 클래스 css가 적용될 수 있게 함

1.2 필터 팝업에서 필터 값을 선택할 경우, 필터 적용 시 확인할 수 있는 상품 개수를 표시

- 필터 값 선택 시 selectFilter를 호출하여 값을 전달 fetchProductCount 호출 API를 통해 상품 갯수 조회 후 표출

  1.3 필터값이 초기화 - 각 변수를 초기화 시켜 필터 초기화 함

  1.4 상품 보기 버튼을 클릭하면 필터가 적용된 상품 목록이 표시

- 상품 목록 기능 1.3에 기술한 내용과 동일
- 팝업이 닫힐때는 filterData값의 변동없이 팝업 표출 여부 변수만 값 변경

## 선택 구현

1.  속성의 위치로 스크롤

- 메인에서 필터 버튼 클릭시 filterType변수에 값을 담고 v-bind:로 데이터를 전달
  필터 팝업에서 각 필터항목에 ref 설정을 한 후 created를 탈때(팝업이 켜질때)
  scrollToFilter() 메소드가 실행되어 filterType값으로 element를 찾아 scrollIntoView 함

## 과제 수행 중 어려움

- Header 부분이 어디까지 말하는 건지 잘 인지가 안되서 Header 컴포넌트는 제외하고 작업을 했습니다.;;
  그 외 어려움은 없었습니다.
