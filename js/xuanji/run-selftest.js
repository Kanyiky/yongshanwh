/* 在项目根目录运行：node js/xuanji/run-selftest.js */
var fs = require("fs");
var vm = require("vm");
var path = require("path");
var root = path.join(__dirname, "../..");
global.self = global;
function load(rel) {
  vm.runInThisContext(fs.readFileSync(path.join(root, rel), "utf8"), { filename: rel });
}
load("vendor/lunar-javascript/lunar.js");
load("vendor/iztro/iztro.min.js");
load("js/yili/zhouyi-text.js");
load("js/yili/baihua.js");
load("js/yili/gua-logic.js");
load("js/yili/tables.js");
load("js/xuanji/truesun.js");
load("js/xuanji/liuyao.js");
load("js/xuanji/liuren.js");
load("js/xuanji/selftest.js");
var rows = runSelfTest();
var failed = rows.filter(function (row) { return !row.ok; });
rows.forEach(function (row) {
  console.log((row.ok ? "通过" : "失败") + "  " + row.name + (row.ok ? "" : "  " + row.detail));
});
console.log(rows.length - failed.length + "/" + rows.length);
if (failed.length) process.exit(1);
