import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'calculate' })
export class CalculationPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return this.calculationString(value);
    }
    return value;
  }

  private calculationString(data: string): string {
    let result: string = ''; // math result
    let first: string = ''; // first number
    let resultStr: string = ''; // result string
    let subString: string = ''; // helper
    let form: string = ''; // formula for span
    let action: string = ''; // math action
    let second: string = ''; //second
    const reg = new RegExp('[0-9,+,-]');
    const regAction = new RegExp('[+,-]');
    for (let index = 0; index < data.length; index++) {
      let char = data[index];
      if (reg.test(char)) {
        if (regAction.test(char)) {
          if (!action) {
            if (first && !second) {
              action = char;
              form = `${form}${char}`;
            } else if (!first) {
              resultStr = `${resultStr}${char}`;
            }
          } else {
            if (first && second && action) {
              first = result = this.calculate(first, action, second);
              subString = `${subString}${char}`;
              action = char;
              second = '';
            } else {
              if (result) {
                resultStr = `${resultStr}${this.returnNumberWriter(
                  form,
                  result,
                )}${subString}${char}`;
              } else {
                resultStr = `${resultStr}${subString}${char}`;
              }
              first = form = result = second = action = subString = '';
            }
          }
        } else if (action) {
          second = `${second}${char}`;
          if (subString) {
            form = `${form}${subString}`;
            subString = '';
          }
          form = `${form}${char}`;
        } else {
          first = `${first}${char}`;
          form = `${form}${char}`;
        }
      } else if (char === ' ') {
        if (first || action) {
          form = subString = `${subString}${char}`;
        } else {
          resultStr = `${resultStr}${form}${subString}${char}`;
          subString = '';
        }
      } else {
        if (first && second && action) {
          result = this.calculate(first, action, second);
        }
        if (result) {
          resultStr = `${resultStr}${this.returnNumberWriter(form, result)}${subString}${char}`;
        } else {
          resultStr = `${resultStr}${form}${subString}${char}`;
        }
        first = form = subString = result = action = result = second = '';
      }
      if (index === data.length - 1) {
        if (first && second && action) {
          result = this.calculate(first, action, second);
        }
        if (result) {
          resultStr = `${resultStr}${this.returnNumberWriter(form, result)}${subString}`;
          subString = form = '';
        } else {
          resultStr = `${resultStr}${form}${subString}`;
        }
      }
    }
    return resultStr;
  }

  returnNumberWriter(form: string, result: string) {
    return `<span style="text-decoration: underline; cursor: pointer;" title="${form}">${result}</span>`;
  }

  private calculate(first: string, action: string, second: string): string {
    switch (action) {
      case '+':
        return (parseInt(first) + parseInt(second)).toString();
      case '-':
        return (parseInt(first) - parseInt(second)).toString();
    }
  }
}
