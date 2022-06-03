<script setup>
import Example from '../.vitepress/theme/Example.vue'
</script>

# Theme Styling
Trong quá trình phát triển theme trên SF-Next, chúng tôi cần các bạn hãy theo quy tắc chung để thống nhất một chuẩn.

## Quy tắc đặt tên class
Hiện tại các theme đang cố gắng đặt tên class theo quy tắc BEM. Vậy tại sao chúng ta phải áp dụng quy tắc của BEM?
Câu trả lời là BEM giúp cho việc code Frontend dễ đọc và dễ hiểu hơn, dễ làm việc và dễ mở rộng cũng như bảo trì khi làm việc với CSS.
Việc đặt tên theo chuẩn giúp các lập trình viên frontend hiểu được đoạn code đó có ý nghĩa gì, nó thực hiện nhiệm vụ gì.
Tham khảo thêm [tại đây](http://getbem.com/introduction/)

<Example type="bad">

```html
<button class="button">
  Normal button
</button>
<button class="button button-success">
  Success button
</button>
<button class="button button-danger">
  Danger button
</button>
```
```scss
.button {
  background-color: transparent;
}
.button-success {
  background-color: blue;
}
.button-danger {
  background-color: red;
}
```

</Example>

<Example>

```html
<button class="button">
  Normal button
</button>
<button class="button button--state-success">
  Success button
</button>
<button class="button button--state-danger">
  Danger button
</button>
```
```scss
.button {
  background-color: transparent;
  &--state-success {
    background-color: blue;
  }
  &--state-danger {
    background-color: red;
  }
}
```

</Example>

## Ưu tiên dùng class base đã được define
Trong quá trình phát triển UI theme thì những thuộc tính css dùng đi dùng lại nhiều thì thường được define 1 class base
và thường được viết trong file _heplers.scss, chúng ta nên chủ động search xem thuộc tính đã được define ở base chưa để
dùng. Ví dụ như flex, align-center...

:::tip
Có thể tìm class base đã được define ở theme theo file sau:
- Bassy/Inside: _helpers.scss, _animations.scss, _transitions.scss, _images.scss
- Roller: _helpers.scss, _border.scss, _color.scss, _layout.scss, _padding.scss, _margin.scss, _animations.scss, _transitions.scss, _images.scss
:::

<Example type="bad">

```html
<div class="custom-class">
  Custom class
</div>
```
```scss
.custom-class {
  display: flex;
  width: 100%;
}
```

</Example>

<Example>

```html
<div class="flex w-100 custom-class">
  Custom class
</div>
```

</Example>

Như vậy chúng ta có thể tiết kiệm được nhiều thời gian code cũng deploy khi phải build cả job compile vue và job compile scss.
Còn giảm được số lượng scss duplicate làm file css nặng lên và load chậm khiến trải nghiệm người dùng không tốt

## Trình tự class
Khi sử dụng class base lẫn class để selector style scss thì nên define class base trước sau đó mới tới class style, mục
đích là muốn nhìn vào sẽ dễ nhận biết hơn

<Example type="bad">

```html
<div class="custom-class flex custom-class--modifier">
  Custom class
</div>
```

</Example>

<Example>

```html
<div class="flex w-100 custom-class custom-class--modifier">
  Custom class
</div>
```

</Example>

## ID selectors
Mặc dù id vẫn có thể dùng để selector khi style nhưng dùng id là tuyệt đối và độ ưu tiên cao nên khó reusable.
Thảo khảo [tại đây](https://github.com/airbnb/css#id-selectors)

<Example type="bad">

```scss
#custom-id {
  color: red;
}
```

</Example>

<Example>

```scss
.custom-class{
  color: red;
}
// Or
[id="custom-id"] {
  color: red;
}
```

</Example>

## SASS
SASS (Syntactically Awesome StyleSheets) là một CSS Preprocessor giúp bạn viết CSS nhanh hơn và có cấu trúc rõ ràng hơn.
Với SASS, bạn có thể viết CSS theo thứ tự rõ ràng, quản lý các biến đã được định nghĩa sẵn, các class dùng chung hay có
thể tự động nén tập tin CSS lại để bạn tiết kiệm dung lượng. Tham khảo thêm docs [SASS](https://sass-lang.com/documentation)
trước khi đi vào styling để tận dùng tối đa thế mạnh của nó.

## Trình tự sử dụng `@include`
Trong `scss` nhóm `@include` nên để ở cuối để dễ đọc toàn bộ selector hơn. [Chi tiết](https://github.com/airbnb/css#ordering-of-property-declarations)

<Example type="bad">

```scss
.btn-green {
  background: green;
  @include transition(background 0.5s ease);
  font-weight: bold;
  // ...
}
```

</Example>

<Example>

```scss
.btn-green {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);
  // ...
}
```

</Example>

## Variables scss
Những mã hex hoặc các value scss mà dùng lại nhiều thì nên đặt vào variable. Tên variable nên để dash-cased
(e.g. `$my-variable`) thay vì camelCased or snake_cased. Nếu đặt biến chỉ dùng trong 1 file có thể đặt gạch dưới trước
(e.g. `$_my-variable`). [Chi tiết](https://github.com/airbnb/css#variables)

## Mixins, Extend, Nested selectors
Đọc thêm [tại đây](https://github.com/airbnb/css#mixins)
