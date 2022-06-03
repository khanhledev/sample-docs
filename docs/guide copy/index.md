# Bắt đầu nhanh

## Cài đặt
::: tip
**Vite** yêu cầu phiên bản [Node.js](https://nodejs.org/en/) >=`14.17.0`
:::

Cài đặt Lerna:
```bash
$ yarn global add lerna
```

Cài đặt dependencies:
```bash
$ lerna bootstrap
$ yarn
```

Build các thư viện (sharing packages):
```bash
$ yarn build:package
```

## CLI
Chạy dev server
```bash
$ yarn dev
```

Chạy theme

```bash
$ yarn serve:theme <handle>
```

Chạy third-party apps
```bash
$ yarn serve:app
```
Third-party apps nên được chạy sau khi đã chạy xong dev server ở port 3000, khi đó apps sẽ chạy ở port 8888.
