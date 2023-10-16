module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'bug', // 特别针对bug号，用于向测试反馈bug列表的bug修改情况
        'feat', // 新功能（feature）
        'fix', // 修复bug
        'docs', // 修改文档
        'style', // 修改代码格式，不影响代码逻辑
        'refactor', // 代码重构（既不是新增功能，也不是bug修改功能）
        'test', // 修改测试用例
        'build', // 构建或其他工具的变动(如webpack)
        'revert', // 还原以前的提交
        'merge', // 分支代码合并
      ],
    ],
  },
};
