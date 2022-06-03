# Composable
Một trong những tính năng mới của **Vue 3** là [Composition API](https://v3.vuejs.org/api/composition-api.html#composition-api).
Chúng tôi sử dụng chúng để có thể đóng gói và chia sẻ các `function` bằng tập hợp các composable của các modules khác nhau.
Ngoài ra chúng cho phép quản lý `State` và tái sử dụng code.

Chúng ta có thể thấy được các ưu điểm như sau:

1. Quản lý theo module
2. Dễ dàng sử dụng và share với `Theme`, `Third party apps` thông qua `useContext`
3. Khi bỏ `Vuex` cũng không ảnh hưởng tới toàn bộ application.

## Khởi tạo một composable
Khai báo một composable cho module product. Nếu sử dụng cách thông thường
chúng ta sẽ phải tự xử lý `Request api`, `Handle error` và `Fetching state`.
Thông qua `Composition API`, mọi việc rất đơn giản và không lặp đi, lặp lại.

```typescript
import { computed } from 'vue';
import { useAsync } from '@shopbase/composition';
import {
  ProductParams,
  UseProduct,
  Products,
  Product,
} from '@shopbase/types';
import { useStore } from '@/store';
import { Types, GettersTypes } from '@/store/product';

export const useProduct = (): UseProduct => {
  const store = useStore();

  const [fetch, { loading, error }] = useAsync((params: ProductParams) => {
    return store.dispatch(`product/${Types.FETCH}`, params);
  });

  const getProductByHandle = (handle: string): Product | undefined => {
    return store.getters[`product/${GettersTypes.GET_PRODUCT_BY_HANDLE}`](handle);
  };

  const getProductByVariantId = (variantId: number): Product | undefined => {
    return store.getters[`product/${GettersTypes.GET_PRODUCT_BY_VARIANT_ID}`](variantId);
  };

  return {
    fetch,
    getProductByHandle,
    getProductByVariantId,
    loading,
    error,
    product: computed(() => store.state.product.product),
    productPersonalize: computed(() => store.state.product.productPersonalize),
    loadedProduct: computed(() => store.state.product.loadedProduct),
  };
};
```

## Sử dụng composable
Khi đã khai báo một composable, bạn có thể `import` hoặc sử dụng thông qua
`useContext` và call ở `setup`.

### import
Nếu code nằm ở `packages/app`. Bạn có thể import composable và sử dụng như sau.

```typescript
import { useProduct, useTheme } from '@/composables';

export default defineComponent({
  name: 'Product',
  setup() {
    const { product } = useProduct();
  }
});
```

### useContext
Nếu code nằm ở `Themes` hoặc `Third party apps` thì bạn phải dùng qua `useContext` khi chúng được khai báo.

```typescript
import { useContext } from '@shopbase/composition';

export default defineComponent({
  name: 'Product',
  setup() {
    const { useProduct } = useContext();
  }
});
```

:::tip
Ngoài sử dụng cho một module để quản lý state, nó được dùng để tái sử dụng code hiệu quả hơn.
Bạn có thể tham khảo tại `packages/compostion`, `packages/themes` hoặc `packages/third-party-apps`
:::
