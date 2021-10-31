/**
* 函数防抖
*/

interface debounceFunc {
  ([x]?: any): void;
}

export const debounce = function (fn: debounceFunc, delay: number): debounceFunc {
  let timer: NodeJS.Timeout | null = null;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
