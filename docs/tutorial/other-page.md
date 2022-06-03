# Tích hợp Other Page API
## Chúng ta cần làm những gì?
- Đựa vào response của API để định nghĩa Type (TypeScript).
- Thêm module mới sử dụng Vuex.
- Thêm composable cho Other page.
- Thêm route sử dụng Vue router.
- Thêm một page để render trên theme.

## Định nghĩa Type
Với mỗi Other Page, chúng ta sẽ có response API như sau:

```json
{
  "code": 0,
  "messages": null,
  "result": {
    "page": {
      "body_html": "<p>HOW DO I PLACE MY ORDER?&nbsp;</p>\n<p>Choose the item(s) you want to buy on the product page, then click the “Add To Cart/Buy Now” button and proceed to the checkout page to complete your order(s).</p>\n<p>We’ll handle your order and let you know the shipping time!</p>\n<p>----</p>\n<p>HOW MUCH DOES SHIPPING COST?&nbsp;</p>\n<p>The shipping fee varies depending on the shipping destination and the number of items you purchase. You can check the estimated shipping fee by adding items to your cart, proceeding to checkout, entering your email address and shipping address. The exact shipping fee will be automatically updated and displayed on the checkout page.</p>\n<p>You can refer to the shipping fee below, however, please note that it is not a flat fee:</p>\n<ul><li>USA: from 4.99 USD</li><li>International: from 6.99 USD<ul><li>Australia: additionally increase from 1 USD&nbsp;</li><li>Canada, Mexico: additionally increase from 2 USD&nbsp;</li></ul></li></ul>\n<p>----</p>\n\n<p>HOW LONG WILL IT TAKE TO SHIP MY ORDER?</p>\n<p>The actual shipping time and delivery date may vary depending on the local postal service in your area. You can refer to the standard shipping time below:</p>\n<ul><li>On average, orders usually ship after 1-7 business days from the date the production started.&nbsp;</li><li>US orders may arrive approximately 3-10 business days after being shipped.</li><li>International orders may arrive in your country 1-3 weeks after being shipped.</li></ul>\n<p>Please note:</p>\n<ul><li>We use different shipping partners, but the final carrier is usually your local postal service (In the US, it may be USPS/DHL)</li><li>Due to the COVID-19 pandemic impact and extremely high order demand, carrier services might need additional 7-15 business days to ship packages anywhere.</li></ul>\n<p>----&nbsp;</p>\n\n<p>MY TRACKING NUMBER ISN’T WORKING.</p>\n<p>Tracking numbers can take 1-2 days to show up in the shipping carrier's system. If the tracking number is still not working within a few days, please contact us.</p>\n<p>----</p>\n<p>I NEED HELP WITH A LATE ORDER.</p>\n<p>If your order has not arrived after 30 business days (domestic) and 45 business days (international), please contact our customer service.</p>\n<p>----</p>\n<p>WHAT SHOULD I DO IF I MADE A MISTAKE WITH MY ORDERS?</p>\n<p>First off, please try not to!</p>\n<p>However, you can still update your order information (including changing size, color, quantity, or shipping address) if your request is submitted within 6 hours after the order is placed. Please immediately contact us and our team will gladly resolve all of your concerns!</p>\n<p>----</p>\n<p>CAN I CANCEL AN ORDER?&nbsp;</p>\n<p>You can cancel an order within 06 hours from the moment you finish your checkout process. After this time, your order will be immediately sent into production.</p>\n<p>Please contact us with your order details. We will cancel your order and provide a full refund.</p>\n<p>We cannot cancel orders once the printing process has begun.</p>\n<p>----</p>\n<p>PAYMENT</p>\n\n<ul><li>What type of payments do you accept?</li></ul>\n<p>We accept Visa, Mastercard, and Paypal.</p>\n\n<ul><li>When will my card be charged?</li></ul>\n<p>Right after you have successfully placed your order.</p>\n<p>----</p>\n<p>HOW IS THE QUALITY ASSURANCE PROCESS?</p>\n<p>We work with top manufacturers who can guarantee the high quality of each package by considering everything and do a last-minute check before sending the complete order to you.</p>\n<p>Based on the known issues and properties of each product, our QA specialists have listed detailed criteria we want to test for the product:</p>\n\n<ul><li>Product type (shoes, bags, ...)</li><li>Origin - workshop, testing date, ...</li><li>Variant</li><li>Colors</li><li>Material - use the trial product and describe it</li><li>Size</li><li>Use - use the trial product and describe it</li><li>Smell - use the trial product and score it</li></ul>\n<p>After that, we put these criteria into the testing form, each element will be scaled on a level from 1 to 5 (low-quality to excellent quality) and take note.</p>\n<p>Every single product will have to go through this whole testing process and each one needs to reach the minimum score of 80 before being packed and shipped to you.</p>\n<p>----</p>\n<p>HOW SECURE IS MY PERSONAL INFORMATION?</p>\n<p>We adhere to the highest security standards to protect your personal information when you enter the checkout page and purchase from our online store.</p>\n<p>When purchasing online using your credit card, all of your information is entered into an SSL secure web page. Your information is then SSL-encrypted and sent directly to our credit card provider's network, where your card and transaction are authorized and approved. Your credit card information is not stored on our servers.</p>",
      "created_at": "",
      "handle": "faq",
      "id": 42409726310,
      "meta_description": "",
      "meta_title": "",
      "published_at": "2019-11-23T08:53:50+00:00",
      "shop_id": 10055716,
      "template": "",
      "title": "FAQs",
      "updated_at": "2021-08-10T08:06:47+00:00"
    }
  }
}
```
Do sử dụng Vuex, nên chúng ta sẽ định nghĩa cho State dựa trên response API.

### Định nghĩa cho state
```typescript
// packages/types/states/page.ts
export type Page = {
  id: number;
  handle: string;
  title: string;
  body_html: string;
  meta_title: string;
  meta_description: string;
  template: string;
  published_at: string;
};
```

### Định nghĩa cho module
Mỗi một module có thể có một hoặc nhiều state. Tùy vào từng trường hợp chúng ta
định nghĩa cho phù hợp.
```typescript
// packages/types/states/page.ts
export type PageState = {
  page: Page;
};
```

## Thêm một module mới
Sau khi đã định nghĩa Type của state, chúng ta sẽ bắt đầu tạo một module mới. Với yêu cầu tích hợp từ API nên chắc chắn sẽ phải có actions và mutations để có thể
update vào state.

### Định nghĩa mutations
Định nghĩa Type
```typescript
export type Mutations = {
  [MutationTypes.SET_PAGE](state: PageState, payload: Page): void;
};
```

Do sử dụng lại và dễ kiểm soát khi commit, chúng ta sẽ định nghĩa thêm MutationTypes
```typescript
export enum MutationTypes {
  SET_PAGE = 'setPage',
}
```

Và cuối cùng là implement những phần trên
```typescript
const mutations: MutationTree<PageState> & Mutations = {
  [MutationTypes.SET_PAGE](state: PageState, payload: Page) {
    state.page = payload;
  },
};
```

### Định nghĩa actions
Tương tự như mutations, chúng ta sẽ làm các bước như trên
```typescript
// Định nghĩa Type
export interface Actions {
  [Types.FETCH]({ commit }: AugmentedActionContext, payload: string): void;
}

// Thêm một enum khi dispath
export enum Types {
  FETCH = 'fetch',
}

// Viết actions để handle request tới API
const actions: ActionTree<PageState, RootState> & Actions = {
  async [Types.FETCH](this: Store<RootState>, { commit }, handle: string) {
    try {
      const response = await this.$http.get<Response<{ page: Page }>>(`/pages/next/${handle}.json`);
      if (response.data) {
        commit(MutationTypes.SET_PAGE, response.data.result.page);
      }

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
```

### Định nghĩa module
Do Storefront sử dụng SSR và ShopBase là một platform. Mỗi request sẽ đều phải khởi tạo lại state để tránh việc
ảnh hưởng đến nhau.

```typescript
export default function (): Module<PageState, RootState> {
  return {
    namespaced: true,
    state: {
      page: {} as Page,
    } as PageState,
    mutations,
    actions,
  };
}
```
### Khai báo ở Root store
Sau khi đã định nghĩa, chúng ta cần import module page và khai báo ở Root store để sử dụng.

```typescript
import page from './page';

export function createStore(): Store<RootState> {
  return baseCreateStore({
    strict: true,
    state: {
      layout: 'default',
    } as RootState,
    actions,
    mutations,
    getters,
    modules: {
      ...
      page(),
      ...
    }
  })
}
```

## Thêm một composable
Để hạn chế DRY và dễ dàng reuse, chúng ta sẽ không sử dụng trực tiếp actions, state ở Component. 
Mà sẽ định nghĩa composable. Việc áp dụng pattern này sẽ hạn chế sự phụ thuộc vào Vuex nếu chúng ta muốn dùng Composition API để thay thế.


```typescript
import { computed } from 'vue';
import { UsePage } from '@shopbase/types';
import { useStore } from '@/store';
import { useAsync } from '@shopbase/composition';
import { Types } from '@/store/page';

export const usePage = (): UsePage => {
  const store = useStore();
  const [fetch, { loading, error }] = useAsync((params: string) =>
    store.dispatch(`page/${Types.FETCH}`, params)
  );

  return {
    fetch,
    loading,
    error,
    page: computed(() => store.state.page.page),
  };
};
```

## Thêm một route mới
Để có thêm một page mới, chúng ta cần định nghĩa một route mới

### Định nghĩa route component
Để dispatch tới action đã định nghĩa ở trên, chúng ta sẽ xử lý ở component này.

```vue
<template>
  <PageOther :page="page"></PageOther>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Context } from '@shopbase/types';
import { Types } from '@/store/page';
import { usePage } from '@/composables';

export default defineComponent({
  setup() {
    const { page } = usePage();
    return {
      page,
    };
  },
  async asyncData({ route, store }: Context) {
    return store.dispatch(`page/${Types.FETCH}`, route.params.handle);
  },
});
</script>
```
Chúng ta sử dụng 2 hooks:
- `asyncData`: Sử dụng để prefetch trước khi navigate tới route.
- `setup`: Composition của Vue3.

### Định nghĩa route
```typescript
// packages/app/src/router/index.ts
[
  ...
  {
    name: 'other-page',
    path: '/pages/:handle',
    component: () => import('../views/pages/OtherPage.vue'),
    meta: {
      component: 'Other',
    },
  },
  ...
]
```
## Thêm page render trên Theme
Component chúng ta định nghĩa phía trên, ở template có sử dụng một global component là `PageOther`.
Đây chính là component chúng ta cần định nghĩa ở Theme. Lý do sử dụng global component
bởi vì Storefront cần support multiple theme. Tùy theo mỗi shop mà có một theme khác nhau.

### Định nghĩa component
Chúng ta chỉ cần định nghĩa một component để render dựa theo props được từ component của route.

```vue
// packages/themes/inside/src/pages/OtherPages.vue

<template>
  <section id="online-store-page" class="other-page">
    <div v-if="page.title" class="container-page mb48">
      <div class="row">
        <div class="col-12 col-lg-8 offset-lg-2">
          <h1 class="text-align-center my32">
            {{ page.title }}
          </h1>
          <div class="other-page-content" v-html="page.body_html"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OnlineStorePage',
  inheritAttrs: false,
  props: {
    page: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
```

### Đăng ký global component
Sau khi đã định nghĩa component để render, chúng ta cần định nghĩa thành global component.

```js
// packages/themes/inside/src/plugin.js
...
app.component(
  'PageOther',
  defineAsyncComponent(() => import('./pages/OtherPages.vue'))
);
...
```

## Test
Sau khi đã thêm các store, route, component xong.
Chúng ta có thể chạy thử bằng cách:

Start dev server
```bash
yarn dev
```

Start dev theme server
```bash
yarn serve:theme inside
```
