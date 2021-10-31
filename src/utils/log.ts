export const logColor = function (e: {
  title: any,
  content: any,
  backgroundColor?: string
}) {
  const c = "#42c02e"
  const t = e.title
  const r = e.content
  const n = e.backgroundColor || c
  const a = ["%c ".concat(t, " %c ").concat(r, " "), "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat("#606060", ";"), "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(n, ";")];
  return function (arg) {
    console.log(...arg)
  }(a)
};
