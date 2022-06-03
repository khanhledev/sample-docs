# Settings schema

Để render các fields trên UI tại dashboard. Bạn cần sử định nghĩa chúng bằng JSON.
Mỗi một loại field sẽ có những giá trị khác nhau.

## Overview
### Pages
Để tạo danh sách các page có thể thêm, sửa xóa các section bạn có thể config JSON như sau:
```json
{
  "page_list": [
    {
      "code": "homepage",
      "name": "Homepage"
    },
    {
      "code": "product",
      "name": "Product page"
    },
    {
      "code": "password",
      "name": "Password pages",
      "empty": {
        "description": "The password page doesn't have sections."
      }
    },
    ...
  ]
}
```
- `empty`: Nếu bạn khai báo trong `page` thì khi chọn page có `empty` thì `sidebar` sẽ không hiển thị `sections`
nào cả.

Và kết quả sẽ có dropdown các page mà bạn đã tạo
![theme-editor-pages](/images/theme-editor-pages.png)

### Page section
Mỗi page sẽ hiện thị nội dung khác nhau nên section cũng phải phù hợp với từng page do vậy bạn phải khai báo danh sách section
có thể được thêm vào page

```json
{
  "page_section": {
    "homepage": [
      "introduction_text",
      "video",
      "collection_list",
      "featured_collection",
      "featured_review_carousel",
      "newsletter"
    ],
    "product": [
      "review_widget",
      "collection_list"
    ],
    ...
  }
}
```
Vậy là ở page tương ứng có thể add được section tương ứng

![theme-editor-add-section](/images/theme-editor-add-section.gif)

### Locales
Trong dashboard đang hỗ trợ hai language là tiếng Anh và tiếng Trung, do vậy theme editor cũng phải support hai ngôn ngữ đó
```json
{
  "locales": {
    "en": {
      "theme_editor": {
        "label": {
          "homepage_name": "Homepage"
        }
      }
    },
    "zh-CN": {
      "theme_editor": {
        "label": {
          "homepage_name": "主页"
        }
      }
    }
  }
}
```
Trong section dùng như sau: `"label": "theme_editor.label.homepage_name"`

### Styles
Với những merchant không am hiểu UI hoặc không có thời gian setup như ý muốn thì theme editor có support tạo style sẵn
cho theme để merchant có thể tiện sử dụng, chỉ cẩn bạn define `styles` trong JSON
```json
{
  "styles": [
    {
      "code": "bassy_new_york",
      "name": "theme_editor.label.bassy_new_york",
      "fixed": {
        "header": {
          "color_bg": "#222222"
        }
      },
      "image": "https://img.shopbase.com/themes/1/assets/preview/new-york.png",
      "pages": {
        "homepage": {
          "homepage_slideshow": {
            "type": "slideshow",
            "settings": {
              "blocks": [
                {
                  "id": "slideshow-0",
                  "image": "",
                  "button_link": {},
                  "button_label": "Shop now",
                  "image_overlay": true,
                  "slide_heading": "Slideshow",
                  "text_alignment": "center",
                  "slide_subheading": "An introductory",
                  "slide_text_color": "#ffffff",
                  "image_overlay_opacity": 25,
                  "slide_button_label_color": "#ffffff",
                  "slide_button_background_color": "#222222"
                }
              ],
              "hero_home_auto": false,
              "home_hero_auto_speed": 5
            }
          }
        }
      },
      "settings": {
        "colors": {
          "color_input": "#999999",
          "color_borders": "#333333",
          ...
        },
        "currency": {},
        "typography": {
          "type_base_size": "16px",
          "type_base_style": "regular",
          "type_base_family": "'Montserrat', sans-serif",
          ...
        }
      }
    },
    ...
  ]
}
```
Và như vậy trong theme editor, tab `settings` sẽ có button **Change theme style**

![theme-editor-style](/images/theme-editor-style.png)

### Settings
Tab `settings` là nơi mà merchant có thể thoải mái lựa chọn các option phù hợp với theme, vậy làm sao để dựng lên được
các settings như vậy trong theme editor, bạn phải follow theo format JSON sau:
```json
{
  "settings": {
    "colors": {
      "icon": "cards-variant",
      "label": "theme_editor.label.color_settings",
      "sections": [
        {
          "label": "theme_editor.heading.color_settings_header",
          "elements": [
            {
              "id": "color_header_background",
              "type": "color",
              "label": "theme_editor.label.color_header_background",
              "default": "#C2D6D6"
            }
          ]
        },
        ...
      ]
    },
    ...
  }
}
```

- **colors**: name key settings
- **icon**: name icon mô tả chức năng của settings
- **label**: label của color. Trong ví dụ này là: "Colors"
- **sections**: danh sách những color cho phép merchant lựa chọn

Như vậy chúng ta đã có list settings ở sidebar như này:
![theme-editor-settings](/images/theme-editor-settings.gif)

### Sections
Đây chính là nơi merchant cho thể thêm, sửa, xóa các section theo ý muốn trên các page, làm cho store nổi bật với phong
cách riêng không lẫn với các store khác. Format JSON như sau:

```json
{
  "sections": {
    "introduction_text": {
      "description": "theme_editor.bassy.description.introduction_text",
      "icon": "cards-variant",
      "label": "theme_editor.label.introduction_text",
      "hidden_eye": true,
      "remove": false,
      "sections": [
        {
          "elements": [
            {
              "label": "theme_editor.label.heading",
              "type": "text",
              "value": "theme_editor.label.introduction_text_heading",
              "id": "section_title"
            },
            {
              "type": "text_editor",
              "label": "theme_editor.label.introduction_text_body",
              "id": "text",
              "value": "theme_editor.description.introduction_text"
            }
          ]
        }
      ]
    },
    ...
  }
}
```

- **introduction_text**: name key sections
- **icon**: name icon mô tả chức năng của section
- **label**: label của section. Trong ví dụ này là: "Introduction text"
- **sections**: danh sách những setting cho phép merchant config trong section

Và chúng ta sẽ có sections như này:
![theme-editor-sections](/images/theme-editor-sections.gif)

## Standard attributes
Sau đây là các thuộc tính tiêu chuẩn trên các input settings

| Attribute   | Description            | Required     |
| ---         |    ---                 |    ---       |
| `type`      | Kiểu dữ liệu           | Yes |
| `id`        | Setting ID, được sử dụng để truy cập setting value. | Yes |
| `label`     | Setting label, sẽ hiển thị trong theme editor.      | No |
| `default`   | Giá trị mặc định của setting                        | No |

## Basic input settings
Sau đây là basic input setting types:
- [text](#text)
- [textarea](#textarea)
- [number](#number)
- [checkbox](#checkbox)
- [radio](#radio)
- [range](#range)
- [select](#select)

### text
Input:

```json
{
  "id": "checkout_header_alt_text",
  "type": "text",
  "label": "theme_editor.label.alt_text",
  "placeholder": "theme_editor.placeholder.alt_text"
}
```
Output:

![theme-editor-text](/images/theme-editor-text.png)

### textarea
Input:

```json
{
  "label": "theme_editor.label.footer_custom_text",
  "type": "textarea",
  "default": "Welcome to my shop!",
  "id": "custom_text"
}
```
Output:

![theme-editor-textarea](/images/theme-editor-textarea.png)

#### Number
Input:

```json
{
  "id": "number",
  "type": "number",
  "label": "theme_editor.label.thankyou_settings_custom_order_steps_number",
  "default": "3"
}
```
Output:

![theme-editor-number](/images/theme-editor-number.png)
