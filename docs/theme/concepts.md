# Key Concepts
## The problems
Storefront Next sử dụng Vue và Render SSR. Vì vậy chúng tôi gặp phải các vấn đề như:
1. Phải hỗ trược rất nhiều themes khác nhau.
2. Phải deploy độc lập, theme nào thay đổi thì chỉ được phép build theme đấy.
3. Mỗi một Shop có một customize khác nhau về UI như: Fonts, colors, shape...

## The solutions
1. Phát triển `Theme` như một plugin của Vue.
2. Mỗi một `Theme` đăng ký đủ các components thành `Global componets` để sử dụng cho `routes`
3. Dựa vào `Dynamic component` của Vue, khi cần sẽ render từ `Global components` đã được đăng ký.
4. Stylesheet được tách riêng khỏi components. Khi compile sẽ sử dụng data đã được customize của từng Shop.
