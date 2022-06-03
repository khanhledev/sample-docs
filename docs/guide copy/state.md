# State

## Vuex
Storefront Next sử dụng **Vuex 4** để quản lý state.
Trong tương lai, chúng tôi có kế hoạch sử dụng **Vuex 5** hoặc sử dụng `Composition API` của `Vue 3` để thay thế **Vuex**.
Vì vậy, để dễ dàng migrate sau này, bạn cần sử dụng theo đúng tài liệu.

> Vuex 5 có thể sẽ bỏ `mutation`. Bạn có thể [xem video này](https://www.youtube.com/watch?v=l1AkkVEa4ZM) để biết các idea của họ.

## Global
Muốn `Initial State` nhẹ thì cần phải giảm `Global state` không thật sự cần thiết. Vì vậy, chúng tôi
chỉ khai báo `Global state` cho `Bootstrap API`, các state khác không được khuyến khích. Khi bạn muốn khai báo thêm
các state khác hoặc cập nhật `Bootstrap API` cần báo với team **#front**.

## Module
Để giảm sự phức tạp và dễ dàng maintain, chúng tôi đã chia thành các module khác nhau. Tùy theo
mỗi `module` sẽ có mức độ ưu tiên khác nhau. Khi khai báo module mới, cần phải đảm bảo các tiêu chí sau:

- Tên của module phải rõ ràng, có nghĩa.
- Nắm được độ ưu tiên của module, có cần phải khai báo trong `Initial page` hay không.
- Nếu quá phức tạp, cần chia nhỏ thành các module nhỏ hơn. Ví dụ như module **checkout**.

:::tip Code Splitting
Nếu module của bạn cẩn phải khai báo trong `Initial page` thì hãy cố gắng tách nhỏ chúng ra để không
ảnh hưởng tới `PageSpeed`. Vì không phải `state`, `mutations` hay `actions` nào cũng cần phải sử dụng luôn.
:::

## TypeScript
Tất cả các state trong Storefront Next đều sử dụng `TypeScript` để định nghĩa **types**.
Mục đích là để nâng cao chất lượng code và tránh những bug không đáng có. Khi làm việc với state
bạn cần phải đảm bảo:

- Cần khai báo Type rõ ràng cho từng variable, property.
- Mỗi `property` trong một Object được response cần đúng ý nghĩa, dễ hiểu.
- Hạn chế tối đa việc sử dụng `any`.
- Types của state cần khai báo ở `packages/types`. Vì state được dùng ở `Theme` và `Third party apps`

```typescript
// packages/types/states/bootstrap.ts
export interface Bootstrap {
  shop: Shop;
  meta: Meta;
  currencies: Currencies;
  locales: Locales;
  script_tags: Array<ScriptTag>;
  cdn: Cdn;
  tracking: Tracking;
  navigation: Navigation;
  theme: Theme;
  checkout_settings: CheckoutSettings;
}
```

:::danger Response API
Storefront Next sẽ cho phép `Merchant`, `Partners` customize code và làm `Theme`. Khi đó, `State` khai báo sẽ rất khó có thể thay đổi. Vì vậy, bạn cần thống nhất với FS, BE và TL của team.
:::
