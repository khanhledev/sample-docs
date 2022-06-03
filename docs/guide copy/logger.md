# Logger
Để sử dụng logs hiệu quả, giúp quá trình debug dễ dàng hơn. Bạn cần sử dụng
các phương thức đã được định nghĩa.

## Phương thức
### Logger instance
Mỗi `logger instance` đều có các phương thức sau:
```typescript
export interface Logger {
  error(msg?: any, ...args: any): void;
  warn(msg?: any, ...args: any): void;
  info(msg?: any, ...args: any): void;
  debug(msg?: any, ...args: any): void;
}
```

## Sử dụng logger
### import
Nếu code nằm ở `packages/app`. Bạn có thể import logger như sau.
```typescript
import { logger } from '@/logger';

logger.info('Info')
```

### useContext
Nếu code nằm ở `Themes` hoặc `Third party apps` thì bạn phải dùng qua `useContext` khi chúng được khai báo.

```typescript
const { $logger } = useContext();
$logger.error('Fetch excluded variants error', error);
```

### this
Do logger đã được bind vào store, vì thế bạn có thể dùng `this` mà không cần phải import.

```typescript
this.$logger.error('Fetch product tracking error', error);
```

## Cấp bậc
Các cấp bậc log được định nghĩa dựa theo biến `LOG_LEVEL` trong mỗi file .env.
Theo mỗi env, chúng ta có để định nghĩa default cho phù hợp.
Các levels bao gồm: `info`, `debug`, `error`, `warn`, `none`.

Ví dụ: .env
```bash
LOG_LEVEL=info
```
