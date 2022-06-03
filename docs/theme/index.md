# Getting started
Theme là trái tim của một platform, bởi nó là nơi Buyer cho thể tương tác và mua hàng.
Do merchant có nhiều nhu cầu khác nhau, bán nhiều loại mặt hàng khác nhau. Vì vậy, sẽ có
rất nhiều themes cần được phát triển.


## ERD
### Theme
- Mỗi một theme sẽ là một bản ghi.

### Theme version
- Mỗi một `Theme` có thể sẽ có nhiều version khác nhau.
- Mỗi một `Theme version` có thể có `Settings Schema`, `Settings Data` hoặc cả code khác nhau.

### Shop theme
- Mỗi một `Shop` có thể sử dụng một hoặc nhiều `Theme version` khác nhau.
- Với những `Shop theme` đã được customize thì có thể có `Settings schema` khác với một `Theme version`.

:::tip Theme Editor
Hướng dẫn chi tiết về [tại đây](/theme/editor)
:::
