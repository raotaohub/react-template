const core = require('@babel/core')
/**
 * https://juejin.cn/post/7025237833543581732#heading-28
 * @param sourceCode 源代码内容
 * @param options babel-loader相关参数
 * @returns 处理后的代码
 */
function babelLoader(sourceCode, options) {
  // 通过transform方法编译传入的源代码
  core.transform(sourceCode)
  // console.log('core', core)
  console.log('sourceCode', sourceCode, 'options', options)
  return sourceCode
}

babelLoader('console.log("222")')

const babel = require('@babel/core')

// babel/types 工具库 该模块包含手动构建TS的方法，并检查AST节点的类型。(根据不同节点类型进行转化实现)
const babelTypes = require('@babel/types')

// 转化箭头函数的插件
const arrowFunction = require('@babel/plugin-transform-arrow-functions')

const sourceCode = `const arrowFunc = () => {
	console.log(this)
}`

const targetCode = babel.transform(sourceCode, {
  plugins: [arrowFunction],
})

console.log('transform\n', targetCode.code)
