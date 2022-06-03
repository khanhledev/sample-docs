# Router

Dựa trên [Vue Router](https://next.router.vuejs.org/), chúng tôi định nghĩa và sử dụng `Hooks` để tăng
trải nghiệm của `Buyer` và giảm `Bundle size` bởi vì:

1. `Dispatch` actions được nằm ở `asyncData`. Developer sẽ không phải `watch` route change và `dispatch`.
2. Khi điều hướng tới page (RouteView) sẽ chỉ cần render, không tạo cảm giác bị khó chịu vì phải loading.

## Routes

Các routes được định nghĩa từ trước, chúng tôi **KHÔNG** cho phép `Merchants` hoặc `Partners` tự định nghĩa routes.

```typescript
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/pages/Home.vue"),
    meta: {
      component: "Home",
      livePreview: true,
      customOption: true,
      uploadCropImage: true,
    },
  },
  {
    name: "product-with-collection",
    path: "/collections/:collectionHandle/products/:handle",
    component: () => import("../views/pages/Product.vue"),
    meta: {
      component: "Product",
      prefetch: [RoutePrefetch.Param],
      livePreview: true,
      customOption: true,
      uploadCropImage: true,
    },
  },
  {
    path: "/products/:handle",
    name: "product",
    component: () => import("../views/pages/Product.vue"),
    meta: {
      component: "Product",
      prefetch: [RoutePrefetch.Param],
      livePreview: true,
      customOption: true,
      uploadCropImage: true,
    },
  },
  {
    name: "password",
    path: "/password",
    component: () => import("../views/pages/Password.vue"),
    meta: {
      component: "Password",
    },
  },
  {
    name: "policies",
    path: "/policies/:handle",
    component: () => import("../views/pages/Policies.vue"),
    meta: {
      component: "Policies",
      prefetch: [RoutePrefetch.Param],
    },
  },
  {
    name: "form-dmca",
    path: "/policies/ip/form",
    component: () => import("../views/pages/Dmca.vue"),
    meta: {
      component: "Dmca",
    },
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../views/pages/Login.vue"),
    meta: {
      component: "Login",
    },
  },
  {
    name: "register",
    path: "/register",
    component: () => import("../views/pages/Register.vue"),
    meta: {
      component: "Register",
    },
  },
  {
    name: "collection",
    path: "/collections/:handle",
    component: () => import("../views/pages/Collection.vue"),
    meta: {
      component: "Collection",
      prefetch: [RoutePrefetch.Param, RoutePrefetch.Query],
      customOption: true,
      uploadCropImage: true,
    },
  },
  {
    name: "search",
    path: "/search",
    component: () => import("../views/pages/Search.vue"),
    meta: {
      component: "Search",
      customOption: true,
      uploadCropImage: true,
    },
  },
  {
    name: "activate-account",
    path: "/activate-account/:id?/:token?",
    component: () => import("../views/pages/ActivateAccount.vue"),
    meta: {
      component: "ActivateAccount",
    },
  },
  {
    name: "reset-password",
    path: "/reset-password/:id?/:token?",
    component: () => import("../views/pages/ResetPassword.vue"),
    meta: {
      component: "ResetPassword",
    },
  },
  {
    name: "my-account",
    path: "/my-account",
    component: () => import("../views/pages/MyAccount.vue"),
    meta: {
      component: "MyAccount",
    },
  },
  {
    name: "my-addresses",
    path: "/my-account/addresses",
    component: () => import("../views/pages/MyAccount.vue"),
    props: {
      component: "MyAccount",
      customerPage: "addresses",
    },
  },
  {
    name: "my-orders",
    path: "/my-account/orders",
    component: () => import("../views/pages/MyAccount.vue"),
    props: {
      component: "MyAccount",
      customerPage: "orders",
    },
  },
  {
    name: "my-order",
    path: "/my-account/orders/:id",
    component: () => import("../views/pages/MyAccount.vue"),
    props: {
      component: "MyAccount",
      customerPage: "order",
    },
  },
  {
    path: "/collections",
    name: "collections",
    component: () => import("../views/pages/Collections.vue"),
    meta: {
      component: "Collections",
      prefetch: [RoutePrefetch.Query],
    },
  },
  {
    path: "/products/vendors",
    name: "product-vendors",
    component: () => import("../views/pages/Collection.vue"),
    meta: {
      component: "Collection",
      prefetch: [RoutePrefetch.Query],
      customOption: true,
      uploadCropImage: true,
    },
  },
  {
    path: "/products/types",
    name: "product-types",
    component: () => import("../views/pages/Collection.vue"),
    meta: {
      component: "Collection",
      prefetch: [RoutePrefetch.Query],
      customOption: true,
      uploadCropImage: true,
    },
  },
  {
    path: "/products/tags",
    name: "product-tags",
    component: () => import("../views/pages/Collection.vue"),
    meta: {
      component: "Collection",
      prefetch: [RoutePrefetch.Query],
      customOption: true,
      uploadCropImage: true,
    },
  },
  {
    name: "cart",
    path: "/cart",
    component: () => import("../views/pages/Cart.vue"),
    meta: {
      component: "Cart",
      customOption: true,
    },
  },
  {
    name: "checkout",
    path: "/checkouts/:token/:recover?",
    component: () => import("../views/pages/CheckoutContainer.vue"),
    meta: { layout: "checkout", customOption: true },
  },
  {
    name: "order-status",
    path: "/orders/:token",
    component: () => import("../views/pages/OrderStatus.vue"),
    meta: { layout: "checkout", customOption: true },
  },
  {
    path: __SERVER__ ? "/page-not-found" : "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/pages/NotFound.vue"),
    meta: {
      component: "NotFound",
    },
  },
  {
    name: "error",
    path: "/error",
    component: () => import("../views/pages/Error.vue"),
    meta: {
      component: "Error",
    },
  },
  {
    name: "other-page",
    path: "/pages/:handle",
    component: () => import("../views/pages/OtherPage.vue"),
    meta: {
      component: "OtherPage",
    },
  },
];
```

## Meta

Để giảm sự phức tạp khi xử lý logic dựa vào route, bạn nên sử dụng `meta`.
Khi cần, chỉ cần check điều kiện theo `meta` mà cần quan tâm tới name hoặc path.
Hiện tại, Storefront Next sử dụng meta để:

1. Định nghĩa component name sử dụng cho `RouteView`
2. Prefetch khi route change.
3. Lazy load các modules như: Live preview, custom option, upload crop image

## Hooks

Chúng tôi sử dụng các hooks của Vue router như `beforeResolve`, `beforeEach`... để xử lý
trước khi truy cập vào một route.

### Prefetch

Thông thường truy cập vào một route, chúng ta phải `dispatch` tới một hoặc nhiều `actions`.
Việc phải lặp lại code hoặc watch route change gây nhàm chán, khó maintain... Ngoài ra còn tăng thêm
bundle size của application, vì vậy dựa theo định nghĩa của bạn ở `meta`. Khi route change `asyncData` sẽ được gọi.

#### Định nghĩa prefetch
Định nghĩa khi giá trị nào thay đổi thì sẽ gọi `asyncData`.

```typescript
[
  {
    path: '/products/:handle',
    name: 'product',
    component: () => import('../views/pages/Product.vue'),
    meta: {
      prefetch: [RoutePrefetch.Param],
    },
  },
]
```

#### Fetching
Khi route change sẽ gọi `asyncData` của các matched components.
Nếu có lỗi xảy ra, sẽ `setLayout` error.

```typescript
/**
 * Prefetch data
 * @param to
 * @param from
 * @param next
 */
async function prefetch(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const matched = to.matched;
  const components: Array<any> = [];
  const prefetch = (to.meta.prefetch || []) as Array<string>;

  prefetch.some((fetchType: string) => {
    if (fetchType === RoutePrefetch.Param) {
      routeChanged = isObjectDiff(to.params, from.params);
    }

    if (fetchType === RoutePrefetch.Query) {
      routeChanged = isObjectDiff(to.query, from.query);
    }

    return routeChanged;
  });

  matched.filter((c, i) => {
    if (routeChanged || (routeChanged = from.matched[i] !== c)) {
      components.push(...Object.values(c.components));
    }
  });

  if (components.length) {
    try {
      const context = Object.assign({}, app.context, { route: to });
      await Promise.all(components.map(({ asyncData }) => asyncData && asyncData(context)));
      resetError(app.context);
    } catch (err) {
      handleError(app.context, err);
    }
  } else {
    resetError(app.context);
  }

  await setLayoutForNextPage(to);

  next();
}
```


## Điều hướng

Để giảm sự phức tạp khi điều hướng giữa các pages, bạn nên sử dụng `path` thay
vì `route name` kết hợp với `query` hoặc `params`.

```vue
<router-link :to="`/products/${product.handle}`">
  {{ product.title }}
</router-link>
```
