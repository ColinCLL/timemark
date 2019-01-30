var timemark = require('../dist/timemark.js');
var should = require('should');

describe('test timemark', function() {
  it('test new Data', function() {
    var time = new Date();
    var data = timemark(time);
    data.should.deepEqual('今天');
  });

  it('test time list', function() {
    var time = Date.parse(new Date(1548826417000));
    var timeList = [];
    Array.from({ length: 8 }).map((e, i) => {
      var date = time + (i - 1) * (86400 * 1000);
      timeList.push(timemark(date, 1548826417000));
    });
    timeList.should.deepEqual(['昨天', '今天', '明天', '后天', '周六', '周日', '周一', '周二']);
  });

  it('test time over limit', function() {
    var time = Date.parse(new Date(1548826417000));
    var timeList = [];
    timeList.push(timemark(time + -2 * 86400 * 1000, 1548826417000));
    timeList.push(timemark(time + 8 * 86400 * 1000, 1548826417000));
    timeList.should.deepEqual(['2019-01-28', '2019-02-07']);
  });
});
