import { CalculationPipe } from './calculation.pipe';

describe('HomePage', () => {
  const pipe = new CalculationPipe();

  it('Checking without math operations', () => {
    const first = ' test ';
    const second = ' test +2';
    const third = ' test 2+';

    expect(pipe.transform(first)).toBe(first);
    expect(pipe.transform(second)).toBe(second);
    expect(pipe.transform(third)).toBe(third);
  });

  it('Checking math operations without additional symbols', () => {
    const first = '2';
    const firstResult = '2';
    const second = '2+2';
    const secondResult = '4';
    const third = '2+2+2';
    const thirdResult = '6';

    expect(pipe.transform(first)).toBe(firstResult);
    expect(pipe.transform(second)).toBe(pipe.returnNumberWriter(second, secondResult));
    expect(pipe.transform(third)).toBe(pipe.returnNumberWriter(third, thirdResult));
  });

  it('Checking math operations with additional symbols', () => {
    const firstChar = 'test $NUM$test';
    const first = '2+1';
    const firstResult = '3';

    expect(pipe.transform(firstChar.replace('$NUM$', first))).toBe(
      firstChar.replace('$NUM$', pipe.returnNumberWriter(first, firstResult)),
    );
  });
});
