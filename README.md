# timemark

timemark

a tool for humanizing time

[中文文档(TODO)]()


## Usage

`npm i timemark`  
or  
`yarn add timemark`


```js

/**
 * timemark
 *
 * it tells the mark of (endDate - startDate)
 * startDate is an optional parament, default by current time // new Date()
 *
 * @param    {string | number | Date}  endDate
 * @param    {string | number | Date}  startDate
 *
 * @returns  string
 */

import timemark from 'timemark';


const mark = timemark(Date.now()); // == timemark(Date.now(), new Data())
console.log(mark); // -> '今天'

const mark2 = timemark(1546272000000, 1546358400000) // as (2019-1-1, 2019-1-2)
console.log(mark2); // -> '昨天'
```




## Rule

Calculate the `delta` of endDay to startDay.
The mark will fall into one of these methods by delta range.


* closest days `'昨天', '今天', '明天', '后天'`  
  current range is `[-1, 2]`  
  configurable only in source code

* little futher days `'周六', '下周一'`  
  current range is delta from startDay in `[3, 6]`  
  configurable only in source code

* others  
  simple formatter by pattern `'YYYY-MM-DD'`, such as `'2019-02-03'`  
  if you want more, try `moment.js`.


```
'2019-02-03',
'2019-02-04',
'昨天', 
'今天', 
'明天', 
'后天', 
'周六', 
'周日', 
'下周一', 
'下周二',
'2019-02-13',
'2019-02-14',
```




## Source Code

`npm run test`  
or  
`yarn test`




## Further

* better README
* more test
* more option for the function (see the code) 