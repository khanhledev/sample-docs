<script setup>
import Example from '../.vitepress/theme/Example.vue'
</script>

# Style guide
- Do SPA nên front-end hay browser sẽ phải làm việc khá nhiều nên trong quá trình coding mọi người nên tìm cách improve
logic front-end tối đa để trải nghiệm người dùng có thể tốt hơn, do vậy khi trải qua các vấn đề đã gặp chúng tôi tạo ra
style-guide để mọi người follow và tránh lặp lại lỗi mà chúng tôi đã gặp

- Suggest mọi người tham khảo chuẩn [javascript airbnb](https://github.com/airbnb/javascript)

## Filter item lặp
Khá nhiều dev gặp phải lỗi cơ bản này, trong quá khi coding dev muốn filter mảng có item lặp sẽ thường lưu id vào 1 mảng
khác sau đó mỗi lần lặp mảng chính thì thường check indexOf để xem item đã có chưa. Trường hợp này nếu mảng chính to và
lặp nhiều thì như vậy mỗi lần for bạn sẽ phải for mảng đã lưu id để check, như vậy performance sẽ ảnh hưởng, cách tốt nhất
chúng tôi suggest ở trường hợp này nên lưu id là key của object để check sẽ tốt hơn.

<Example type="bad">

```js
const list = [
  {id: 1, name: 'A'},
  {id: 1, name: 'A'},
  {id: 2, name: 'B'},
  {id: 3, name: 'C'}
];
const itemExist = [];
const newList = list.filter((item) => {
  if (itemExist.indexOf(item.id) === -1) {
    itemExist.push(item.id);
    return true;
  }

  return false;
})
```

</Example>

<Example>

```js
const list = [
  {id: 1, name: 'A'},
  {id: 1, name: 'A'},
  {id: 2, name: 'B'},
  {id: 3, name: 'C'}
];
const itemExist = {};
const newList = list.filter((item) => {
  if (itemExist[item.id] === true) {
    return false;
  }

  itemExist[item.id] = true;
  return true;
})
```

</Example>

## Shorthand
Trong quá trình coding thì chúng ta không thể tránh việc dùng shorthand để tiện và nhanh hơn nhưng nó giống như con dao
2 lưỡi vậy nếu lạm dụng shorthand thì sẽ gây cản trở cho việc maintain. Dưới đây là 1 số lưu ý mọi người cần xem:

<Example type="bad">

```js
const a = condition ? exprIfTrue : exprIfFalse ? condition2 : exprIfFalse2;

const b = [].map((item) => {
  return item.id;
});
```

</Example>

<Example>

```js
// So với đoạn if theo shorthand thì dài hơn nhưng khi nhìn vào sẽ clear hơn
let a = false;
if (condition) {
  a = exprIfTrue;
} else if (exprIfFalse) {
  a = exprIfTrue2;
} else {
  a = exprIfFalse2;
}

// Nếu k cần check logic gì thì map nên return shorthand
const b = [].map((item) => item.id);
```

</Example>

## If
Sau khi dùng if thì nên có 1 dòng trống sau đó mới tới logic tiếp để nhìn vào clear hơn, sẽ hiểu đã kết thúc 1 logic

<Example type="bad">

```js
if(condition) {
  // logic
}
const a = {}
const func = () => {}
```

</Example>

<Example>

```js
if(condition) {
  // logic
}

const a = {}
const func = () => {}
```

</Example>
