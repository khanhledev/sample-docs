<script setup>
import Example from '../.vitepress/theme/Example.vue'
</script>
# Best practice

### General
<Example type="good">

```js
const firstName = 'Gustavo'
const friends = ['Kate', 'John']

const onItemClick = () => {}

class MenuItem {
  /* Reads nicely as `MenuItem.handleClick()` */
  handleClick = (event) => { ... }
}

const isEnabled = itemCount >= 3
if (isEnabled) {
}

// Prefixes
const color = 'blue'
const isBlue = color === 'blue' // characteristic
const isPresent = true // state

if (isBlue && isPresent) {
  console.log('Blue is present!')
}

const hasProducts = productsCount > 0

// should
function shouldUpdateUrl(url, expectedUrl) {
  return url !== expectedUrl
}

// min/max
function renderPosts(posts, minPosts, maxPosts) {
  return posts.slice(0, randomBetween(minPosts, maxPosts))
}

// prev/next
function fetchPosts() {
  const prevPosts = this.state.posts
  const fetchedPosts = fetch('...')
  const nextPosts = concat(prevPosts, fetchedPosts)
  this.setState({ posts: nextPosts })
}

```
</Example>

<Example type="bad">

```js
const primerNombre = 'Gustavo'
const amigos = ['Kate', 'John']

const onItmClk = () => {}

class MenuItem {
  /* Method name duplicates the context (which is "MenuItem") */
  handleMenuItemClick = (event) => { ... }
}

// Reflect the expected result
const isDisabled = itemCount < 3
if (!isDisabled) {
}

const isProductsExist = productsCount > 0
const areProductsPresent = productsCount > 0

```
</Example>

### Functions
```
prefix? + action (A) + high context (HC) + low context? (LC)
```

Các ví dụ khi áp dụng pattern trên.
| Name                   | Prefix   | Action (A) | High context (HC) | Low context (LC) |
| ---------------------- | -------- | ---------- | ----------------- | ---------------- |
| `getUser`              |          | `get`      | `User`            |                  |
| `getUserMessages`      |          | `get`      | `User`            | `Messages`       |
| `handleClickOutside`   |          | `handle`   | `Click`           | `Outside`        |
| `shouldDisplayMessage` | `should` | `Display`  | `Message`         |                  |

## Code clean
### Return Early Pattern

<Example type="good">

```js
function divider(dividend, divisor) {
  if (isNaN(dividend) || isNaN(divisor)) {
    return 'Error: input a number';
  } 

  if (divisor === 0) {
    return 'Error: cannot divide by 0';
  }

  return dividend / divisor;
}
```
</Example>

<Example type="bad">

```js
function divider(dividend, divisor) {
  if (isNaN(dividend) || isNaN(divisor)) {
    return 'Error: input a number';
  } 

  if (divisor === 0) {
    return 'Error: cannot divide by 0';
  }

  return dividend / divisor;
}
```
</Example>

## ABTesting

<Example>

```typescript
if (product.value.select_default_options) {
  //
}
```
</Example>

<Example type="bad">

```typescript
if ($inABTesting('select_default_options') && product.value.select_default_options) {
  //
}
```
</Example>