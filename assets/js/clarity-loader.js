/* 微软 Clarity 访问统计（全局加载器）
 *
 * 用法：把下面 CLARITY_ID 换成 Clarity 后台给的项目 ID（10 位），push 后即全站生效。
 * 后台：https://clarity.microsoft.com → 项目 → Settings → Setup
 * 取 ID：那段代码里 https://www.clarity.ms/tag/ 后面那一串
 *
 * ID 为空时整个脚本不执行，不会发出任何请求，也不会报错。
 */
var CLARITY_ID = "z5ozz7thtp";

(function (c, l, a, r, i, t, y) {
  if (!i) return;
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", CLARITY_ID);
