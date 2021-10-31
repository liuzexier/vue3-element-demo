/**
 * 函数节流
 */
interface throttleFunc {
  ([x]?: any): void;
}
export const throttle = function (fn: throttleFunc, delay: number): throttleFunc {
  let timer: NodeJS.Timeout | null = null;
  let time = new Date().getTime();
  let args;

  return function () {
    args = arguments;
    let context = this;
    let remainTime = delay - (new Date().getTime() - time);
    if (remainTime <= 0) {
      fn.apply(context, args);
      time = new Date().getTime();
      if (timer) {
        clearTimeout(timer);
      }
      timer = null;
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(context, args);
          time = new Date().getTime();
          timer = null;
        }, remainTime);
      }
    }
  };
};