# Tổng quan

## Vấn đề
Trước khi Storefront Next được ra đời, thì chúng tôi gặp các vấn đề:

- Cấu trúc phức tạp, không định nghĩa rõ ràng, mỗi nơi viết một kiểu.
- Nhiều repositories, khó quản lý.
- Điểm PageSpeed rất thấp.
- Quá trình deploy chậm, không được tối ưu, khó rollback nếu có lỗi.
- Mọi thứ ở theme đều phụ thuộc vào core, dẫn tới core luôn chứa những
functions, utils mà không phải themes nào cũng cần.
- Chậm và ngốn RAM khi dev.
- Code không tối ưu, khó đọc, tốn thời gian khi maintain và trace lỗi.

## Giải pháp

- Sử dụng **Vite** thay cho **Webpack** để giảm thời gian compile và chạy ở dev.
- Sử dụng **Vue 3** và **TypeScript** để tăng chất lượng code và khả năng mở rông với `Composition API`.
- Cấu trúc repository theo hướng monorepo bằng **Lerna**. Tách app thành nhiều packages khác nhau. Mỗi package có nhiệm
  vụ riêng, không phụ thuộc vào nhau.
- Chỉ import / load các resource được dùng khi cần. Giảm thiểu `Bundle size`.
- Viết lại các plugins để sử dụng đúng các tính năng cần thiết.
- Viết unit test cho các package để đảm bảo các chức năng hoạt động chính xác.

> Team #front có organization [Front Official Labs](https://github.com/FrontLabsOfficial) trên Github được các thành viên
> viết các packages khi rảnh rỗi. Chúng tôi luôn welcome bạn contribute.

## Các package

- types: định nghĩa các typescript interface/types được sử dụng xuyên suốt quá trình phát triển ứng dụng
- composition: là package cung cấp các reusable logic đã được chúng tôi xây dựng sẵn,
  [dựa trên composition API của Vue 3](https://v3.vuejs.org/api/composition-api.html#composition-api)
- services: chứa các package như http, logger, storage,... hỗ trợ cho node server
- shared:  chứa các utils hữu ích.
- app: main Vue application.
- themes: chứa các built-in themes: Inside, Roller, Bassy.
- third-party-apps: chứa các built-in apps: UpSell, Review, Copt
- server: node server render ra Storefront

## Triển khai
- Các packages được tách riêng, khi deploy sẽ chỉ cần deploy đúng package cần thiết thay vì tất cả mọi thứ.
- App được đóng gói thành `Docker image`, dễ dàng rollback nếu có lỗi.
- Cache static files trên browser lâu hơn do chỉ khi `deploy` mới cần `purge cache`

:::tip
Shared packages là concept quan trọng nhất giúp Storefront Next flexible và scale dễ dàng.
:::

## Định nghĩa chung

1. Core: bao gồm app, router, store.
2. Shared packages: Các packages được dùng ở nhiều nơi khác nhau.
3. Themes & Third party apps: Các packages kết hợp với core để render ra Storefront.
