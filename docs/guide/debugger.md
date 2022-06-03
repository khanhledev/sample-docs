# Debugger
Để debug nhanh và hiệu quả, cần sử dụng [Chrome DevTools](https://developer.chrome.com/docs/devtools/) và debug của IDE
thay vì `console.log`.

1. Sử dụng [Intellij](https://www.jetbrains.com/help/idea/running-and-debugging-node-js.html)
2. Sử dụng [Visual code](https://code.visualstudio.com/docs/editor/debugging)

## Debug ở local
Do sử dụng API nên bạn có thể sử dụng code trên local của mình để debug bất kỳ store nào bạn muốn.

Các bước để thực hiện:
1. Cập nhật file `.env` trỏ tới đúng store cần debug.
2. Chạy dev server
3. Chạy theme mà store đang sử dụng, trong trường hợp lỗi ở theme khác thì có thể publish đúng theme mong muốn.

```bash
STORE_DOMAIN=erikpham.myshopbase.net
VITE_API_ENDPOINT=/api
CACHE_PROVIDER=debug
PLATFORM_DOMAIN=myshopbase.net
LOG_LEVEL=debug
PAYMENT_IFRAME=https://payments-dev.shopbase.net
VITE_CDN=https://cdn-dev.btdmp.com
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

:::tip
Khi đã chạy được storefront trên local. Bạn có thể dùng debug, debugger như hướng dẫn ở trên.
:::

## Debug trên server
Khi debug trên server, chúng ta cần định hình xem lỗi có thể đến từ đâu. Từ đấy
sẽ có cách debug hợp lý. Ngoài ra, storefront được deploy bằng `K8s` nên
trace logs rất dễ dàng, tương tự như các services `API`, `DMS`...

### Lỗi API
1. Xem `Bootstrap API` có bị lỗi không?
2. Store có `expire`, `frozen`, `closed` hay không?
3. Các `Product API`, `Page API` có bị lỗi không?

Bạn có thể tham khảo thêm logs của app server.
```bash
$ kubectl logs -l name=sb-storefront-next-app -f --tail=1000
```

:::tip
Bootstrap API không bị lỗi nếu storefront vẫn render khi chúng ta vào từ một link khác.
:::

### Lỗi render
Để biết được lỗi chính xác ở đâu, chỉ có một cách duy nhất là trace logs.
```bash
$ kubectl logs -l name=sb-storefront-next-render -f --tail=1000
```

## OCG dev tool
Cài đặt [extension](https://chrome.google.com/webstore/detail/ocg-devtool/paedkchegohmhjndncgfnbafdfanhdck) giúp bạn dễ
dàng và tiết kiệm thời gian tìm endpoint của API như: `Bootstrap`, `Product`...
