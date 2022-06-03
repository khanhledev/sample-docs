# Middleware

`middleware` được sử dụng để giảm sự phụ thuộc và phức tạm khi xử lý logic giữa các thành
phần khác nhau. Thay vì dùng `Event Bus`, `Watch` hoặc logic tập trung, chúng ta
có thể tách nhỏ và chỉ định nghĩa khi cần thiết.

Mỗi `middleware` có hai tính năng:

1. Khai báo `callback function` sử dụng `middleware`.
1. Trigger các `callback function` khi diễn ra một **event**.

## Khởi tạo một middleware

Để tạo một `middleware` bạn chỉ cần gọi function `createMiddlewarePipeline`. Chúng tôi
đã khai báo `MiddlewareEvents` để quản lý theo các **events** tốt hơn.

```typescript
export const middleware: MiddlewareEvents = {
  beforeAddToCart: createMiddlewarePipeline(),
  afterAddToCart: createMiddlewarePipeline(),
  afterCartChange: createMiddlewarePipeline(),
  trackingAddToCart: createMiddlewarePipeline(),
};
```

## Sử dụng middleware
Sử dụng `use` để khai báo function callback cho middleware khi diễn ra một event. Có
thể khai báo nhiều function callback cho mỗi middleware.

Ví dụ cần lấy danh sách các sản phẩm cho UpSell khi `beforeAddToCart`

```typescript
const handleBeforeAddToCart = async (
  context: AddCartItemsParams,
  next: NextFunction
) => {
  if (isIgnorePrePurchase(context, route)) {
    return next();
  }

  const { variant_id } = context.cartItems[0];
  const product = await getProduct(variant_id);
  if (!product) {
    return next();
  }

  if (!promise.value) {
    setPromise(fetchPrePurchase(product));
  }
};

$middleware.beforeAddToCart.use(handleBeforeAddToCart)
```
:::warning
Luôn đảm bảo function `next` được gọi trong mỗi callback function.
:::

## Thực thi một middleware
Khi event của một middleware được diễn ra, chúng cần được `execute` các
callback function đã được đăng ký. Callback function nào đăng ký trước thì sẽ được execute trước.
Khi function `next` được gọi, callback function tiếp theo được `execute`

```typescript
middleware.beforeAddToCart.execute(payload);
```
