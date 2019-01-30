# timemark

timemark

a tool for humanizing time

## How to use

```js

/**
 * timemark
 *
 * marker is a nonrequired argument, default value is 'new Date()'
 *
 * @param    {timestamp}  time
 * @param    {timestamp}  marker
 *
 * @returns  string
 */

import timemark from 'timemark';
const mark = timemark(Date.now()); // timemark(Date.now(), new Data())
console.log(mark); // 今天


const mark2 = timemark(1546272000000, 1546358400000) // (2019-1-1, 2019-1-2)
console.log(mark2); // 昨天
```
