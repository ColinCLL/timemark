import timemark from '../src/index';

describe('test timemark', () => {
  it('test new Data', () => {
    const time = new Date();
    const data = timemark(time);
    expect(data).toBe('今天');
  });

  it('test Date is null', () => {
    const name: any = 'dadad';
    const data = timemark(name);
    expect(data).toBe('');
  });

  it('test Date is 0', () => {
    const data = timemark(0);
    expect(data).toBe('1970-01-01');
  });

  it('test Date is string', () => {
    const name: any = '2009-10-20';
    const data = timemark(name);
    expect(data).toBe('2009-10-20');
  });

  it('test time list', () => {
    const time = Date.parse(new Date(1548826417000) + '');
    const timeList: string[] = [];
    Array.from({ length: 8 }).map((e, i) => {
      const date = time + (i - 1) * (86400 * 1000);
      timeList.push(timemark(date, 1548826417000));
    });
    expect(timeList).toEqual(['昨天', '今天', '明天', '后天', '周六', '周日', '下周一', '下周二']);
  });

  it('test time over limit', () => {
    const time = Date.parse(new Date(1548826417000) + '');
    const timeList: string[] = [];
    timeList.push(timemark(time + -2 * 86400 * 1000, 1548826417000));
    timeList.push(timemark(time + 8 * 86400 * 1000, 1548826417000));
    expect(timeList).toEqual(['2019-01-28', '2019-02-07']);
  });
});
