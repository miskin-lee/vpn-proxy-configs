function main(config) {
  const groups = Array.isArray(config["proxy-groups"]) ? config["proxy-groups"] : [];
  const selectGroup = groups.find(group => group.type === "select");
  const proxy = selectGroup && selectGroup.name;

  if (!proxy) {
    return config;
  }

  config.rules = [
    // 局域网直连
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",

    // .cn 域名直连
    "DOMAIN-SUFFIX,cn,DIRECT",
    "GEOSITE,cn,DIRECT",
    // 中国 IP 直连
    "GEOIP,CN,DIRECT,no-resolve",

    // 其他全部走你选中的代理组
    "MATCH," + proxy
  ];

  return config;
}
