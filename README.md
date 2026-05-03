# vpn-proxy-configs

一组自用的代理分流配置，面向以下场景：

- `Shadowrocket`
- `Clash Verge Rev` / 兼容 `Clash` 的脚本覆写能力
- 需要对国内常用服务直连、对少量境外服务走代理的网络环境

## 文件说明

### `family-shadowrocket.conf`

家庭环境使用的 `Shadowrocket` 分流配置。

特点：

- 国内常见站点和服务直连
- 常见内网网段、`localhost`、局域网域名跳过代理
- 默认关闭 `IPv6`
- 未命中的流量通常走代理客户端中的默认代理策略

覆盖内容包含但不限于：

- 政务与民生服务
- 银行与支付
- 电商平台
- 社交与即时通讯
- 短视频、视频站点、内容平台
- 常见办公与协作服务
- 常见中国大陆 IP 网段直连

适用场景：

- 家庭或个人网络
- 希望国内访问尽量直连、国外服务按代理规则处理

### `family-clash.js`

家庭环境使用的 `Clash` JavaScript 覆写脚本。

脚本行为：

- 自动读取当前配置中的第一个 `type: select` 代理组
- 将大量中国大陆常用域名设为 `DIRECT`
- 将常见局域网和中国大陆 IP 网段设为 `DIRECT`
- 最后一条规则为 `MATCH,<选中的代理组名>`

这意味着：

- 国内常用服务会优先直连
- 其他未命中的流量会交给你在 `Clash` 中选中的主代理组处理

适用客户端：

- 支持 `JavaScript` 配置覆写的 `Clash` 系客户端
- 例如 `Clash Verge Rev`

### `company-shadowrocket.conf`

公司环境使用的精简版 `Shadowrocket` 配置。

当前规则比较克制，只对少量 AI 相关域名走代理，例如：

- `openai.com`
- `chatgpt.com`
- `anthropic.com`
- `claude.ai`

其余流量默认直连：

- 末尾规则为 `FINAL,DIRECT`

适用场景：

- 公司网络本身已经可正常访问大多数业务
- 只希望让特定 AI 服务走代理，避免全局代理带来的风险或干扰

## 使用方法

### Shadowrocket

1. 打开 `Shadowrocket`
2. 导入对应的 `.conf` 文件
3. 选择合适的节点或策略组
4. 启用配置并验证访问行为

建议：

- 家庭网络优先使用 `family-shadowrocket.conf`
- 公司网络优先使用 `company-shadowrocket.conf`

### Clash Verge Rev / Clash 系

1. 保证当前配置中至少有一个 `type: select` 的代理组
2. 在客户端中加载你的基础 Clash 配置
3. 将 `family-clash.js` 配置为覆写脚本 / 脚本规则
4. 重新加载配置
5. 检查默认 `select` 组是否为你希望承接未命中流量的代理组

注意：

- `family-clash.js` 依赖 `select` 类型代理组
- 如果当前配置里没有可用的 `select` 组，脚本会直接返回原配置，不追加规则

## 维护建议

- 新增常用直连站点时，优先补充到域名规则中
- 如果某些服务使用大量 CDN，可视情况补充 `DOMAIN-SUFFIX` 或 `IP-CIDR`
- 公司配置建议保持最小化，避免误伤内网系统或审计策略
- 修改后建议分别验证：
  - 国内站点是否仍然直连
  - 目标代理站点是否确实走代理
  - 公司内网、办公系统、支付类服务是否正常

## 许可证

本仓库使用 [MIT License](./LICENSE)。
