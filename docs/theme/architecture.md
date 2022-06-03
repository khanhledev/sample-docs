# Theme architecture
Theme code được tổ chức với một [standard directory structure](#theme-directories) gồm các file dành riêng ShopBase themes.

## Markup and features

![theme-components](/images/theme-components.png)

| Number      | Component            | Description     |
| ---         |    ---               |       ---       |
| 1           | Layout      | Sử dụng layout để lưu trữ các elements lặp lại của theme như headers and footers. |
| 2           | Page         | Kiểm soát những gì được hiển thị trên một page. Mỗi theme nên bao gồm các loại page khác nhau để hiển thị các loại nội dung khác nhau, chẳng hạn như home page và products.      |
| 3           | Sections được hiển thị trong page | Các section có thể được sử dụng lại, tùy chỉnh mà bạn có thể thêm vào JSON templates. |
| 4           | Blocks trong các sections | Các block có thể được sử dụng lại, tùy chỉnh, thêm vào các section, page |

## Theme directories
Themes có structure cụ thể, chứa các thư mục sau:

```
src/
  ├── assets/
  |   ├── images/
  |   |   ├── error.svg
  |   |   └── ...
  |   └── styles/
  |   |   ├── base/
  |   |   |   ├── _helpers.scss
  |   |   |   ├── _minireset.scss
  |   |   |   └── ...
  |   |   ├── elements/
  |   |   |   ├── _button.scss
  |   |   |   ├── _form.scss
  |   |   |   ├── _modal.scss
  |   |   |   └── ...
  |   |   ├── grid/
  |   |   ├── layout/
  |   |   |   ├── _default.scss
  |   |   |   ├── _header.scss
  |   |   |   └── _footer.scss
  |   |   ├── page/
  |   |   |   ├── _home.scss
  |   |   |   ├── _product.scss
  |   |   |   └── ...
  |   |   ├── utilities/
  |   |   |   ├── _animations.scss
  |   |   |   ├── _mixins.scss
  |   |   |   ├── _variables.scss
  |   |   |   └── ...
  |   |   ├── vendors/
  |   |   |   ├── _carousel.scss
  |   |   |   └── _progress.scss
  |   |   ├── _generated-variable.scss
  |   |   ├── style.scss
  |   |   └── variable.scss.template
  ├── components/
  |   ├── BaseInput.vue
  |   ├── BaseCheckbox.vue
  |   └── ...
  ├── composables/
  |   └── useNotification.js
  |   └── ...
  ├── config/
  |   ├── pbase-data.json
  |   ├── pbase-schema.json
  |   ├── settings-data.json
  |   └── settings-schema.json
  ├── layouts/
  |   ├── Default.vue
  |   ├── DefaultHeader.vue
  |   ├── DefaultFooter.vue
  |   ├── Blank.vue
  |   └── Error.vue
  ├── locales/
  |   ├── en.default.json
  |   ├── af.json
  |   └── ...
  ├── pages/
  |   ├── Home.vue
  |   ├── Product.vue
  |   └── ...
  ├── sections/
  |   ├── Slideshow.vue
  |   ├── CollectionList.vue
  |   └── ...
  ├── snippets/
  |   ├── ProductCard.vue
  |   ├── ProductImagesCarousel.vue
  |   ├── HeaderLogo.vue
  |   └── ...
  ├── templates/
  |   ├── PageDefault.vue
  |   ├── PageContact.vue
  |   ├── CustomerProfile.vue
  |   └── ...
  ├── plugin.js
  └── index.js
```

Nhìn vào cấu trúc thư mục trên bạn cũng phần nào hiểu được chức năng của từng folder là gì nên mình chỉ giải thích
qua những file mà chúng tôi nghĩ có thể bạn sẽ không hiểu chức năng của nó làm gì trong theme. Ok let's go

### `plugin.js`
Như đã giải thích ở [The solution](./concepts#the-solutions) thì mỗi theme sẽ được hiểu như 1 plugin của Vue. Thì file
`plugin.js` này là nơi để sử dụng các package của npm mà theme muốn dùng, đồng thời cũng là nơi đăng ký global component
để sử dụng cho component mà routes bên core đã define

```js
export const ShopBaseThemePlugin = {
  install: (app) => {
    // Use package
    app.use(VueLazyload, {
      attempt: 2,
      preLoad: 1,
    });

    // Register layout and pages
    app.component(
      'LayoutDefault',
      defineAsyncComponent(() => import('./layouts/Default.vue'))
    );
  }
}
```

### `assets`
Nhìn qua tên thư mục các bạn cũng hiểu nơi này là nơi lưu các file như image và scss để thỏa thích phát triển UI. Ở đây
bạn lưu ý cho chúng tôi khi bạn update UI ở 1 page hoặc 1 component nào đó thì hãy update scss ở đúng file, đúng thư mục
đã được chia theo chức năng của nó.
- `vendors`: Các file trong thư mục này chính là scss của các package mà bạn sử dụng.
- `_generated-variable.scss` & `variable.scss.template`: Chắc hẳn tôi đoán bạn sẽ thắc mắc 2 file này có tác dụng gì trong
assets? Đơn giản thôi, như bạn biết trong mỗi store có thể tạo được nhiều theme, mỗi theme ShopBase cho phép merchant
thoải mái sáng tạo theo những gì mình muốn. Ví dụ shop bán đồ thể thao muốn tông màu tối, font chữ phải cứng cáp còn bán
đồ trẻ em thì cần tông màu sáng, font chữ mềm mại... thì file `variable.scss.template` chính là nơi define các variable
color & font của theme theo setting trong [theme editor](./editor).

```template
$color_input: {{color_input}};
$color_body_background: {{color_body_background}};
$type_base_family: {{{type_base_family}}};
$type_base_size: {{type_base_size}};
```

sau khi merchant thoải mái setting color & font thì sẽ save lại setting thì lúc này theme editor sẽ gọi đến 1 api được
 build bằng [nodejs](https://nodejs.org/en/docs/) có tên là [theme server](./server), Công việc của theme server là sẽ
 đọc file `variable.scss.template` sau đó để merge key variables scss với value là setting từ theme editor ghi ra file
 `_generated-variable.scss`

```scss
$color_input: #ffffff;
$color_body_background: #ffffff;
$type_base_family: muli,sans-serif;
$type_base_size: 16px;
```
cuối variables này sẽ apply tất cả những nơi dùng đến nó.

## `config`
Config files có liên quan đến [theme settings](./editor). Có hai tệp config:
- [settings_data.json](./settings-data) - File này lưu trữ các giá trị đã cài đặt từ `settings_schema.json`.
- [settings_schema.json](./settings-schema) - File này cấu tạo lên các section và settings được hiển thị trong theme editor
để merchant có thể tùy chọn theo ý muốn.
- **pbase-data.json** - File này lưu trữ các giá trị đã cài đặt từ `pbase-schema.json` sẽ override
`settings_data.json` dành cho store PrintBase
- **pbase-schema.json** - Khi bạn muốn ẩn section nào đó hoặc thêm setting trong section mà chỉ áp dụng cho store PrintBase
thì file này sinh ra để làm việc đó, nó sẽ merge vào file `settings_schema.json` và ưu tiên lấy `pbase-schema.json` nếu
có json giống nhau.

**Lưu ý**: Một số theme có thể có nhiều version. Ví dụ như roller thì structure folder config có dạng như sau:
```
├── config/
  |   ├── 1/
  |   |   ├── pbase-data.json
  |   |   ├── pbase-schema.json
  |   |   ├── settings-data.json
  |   |   └── settings-schema.json
  |   └── 2/
  |   |   ├── pbase-data.json
  |   |   ├── pbase-schema.json
  |   |   ├── settings-data.json
  |   |   └── settings-schema.json
```
Folder `1` & `2` tương đương với version của theme roller.

Cuối cùng sau khi build theme các file trong `config` sẽ được sync lên database table `sb_theme_version`, do vậy nếu bạn
muốn thêm, sửa hoặc xóa section settings trong theme editor thì cần update file trong folder `config`

### `snippets`
Thư mục lưu trữ các file vue template có đoạn code nhỏ hơn page & sections để có thể tái sử dụng

### `composables`
Sẽ có các file javascript có đoạn code [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api)
để dùng trong [single-file component](https://v3.vuejs.org/guide/single-file-component.html)
