function main(config) {
  const groups = Array.isArray(config["proxy-groups"]) ? config["proxy-groups"] : [];
  const selectGroup = groups.find(group => group.type === "select");
  const proxy = selectGroup && selectGroup.name;

  if (!proxy) {
    return config;
  }

  config.ipv6 = false;

  config.dns = {
    ...(config.dns || {}),
    enable: true,
    nameserver: [
      "223.5.5.5",
      "119.29.29.29",
      "8.8.8.8",
      "114.114.114.114"
    ]
  };

  config.rules = [
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
    "GEOSITE,cn,DIRECT",
    "GEOIP,CN,DIRECT,no-resolve",
    "MATCH," + proxy
  ];

  return config;
}
