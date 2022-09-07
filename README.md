# loki-enhance-middleware

![typescript](https://img.shields.io/npm/types/scrub-js.svg)
[![Test Suite](https://github.com/Nihiue/proxy-reactive-demo/actions/workflows/main/badge.svg)](https://github.com/Nihiue/proxy-reactive-demo/actions/workflows/main.yaml)

`loki-enhance-middleware` hijacks log push requests sent to loki and modifies it.

## Moudle - Geo IP

Injects GeoIP info for any log source.

![未标题-1](https://user-images.githubusercontent.com/5763301/188595103-5719c66c-b94b-40ec-ad49-9e4cf66f07b8.png)

### Setup

Deploy middleware with loki.

`docker-compose.yaml`
```yaml

services:
  loki:
    image: grafana/loki:2.6.1
    restart: always
    expose:
      - "3100"
    # ...

  enhance_middleware:
      image: nihiue/loki_enhance_middleware:latest
      restart: always

      environment:
        - LOKI_HOST=http://loki:3100
        - WORKER_COUNT=3
        - PORT=3100

      expose:
        - 3100
```

Config logagent to add `GeoIP_Source=[IP]` placeholder and send requests to middleware.

`promtail-config.yaml`
```yaml

clients:
  - url: http://enhance_middleware:3100/loki/api/v1/push

# ...

scrape_configs:
  - job_name: caddy
    pipeline_stages:
      - json:
          expressions:
            level:
            status:
            host: request.host
            method: request.method
            url: request.uri
            remote_addr: request.remote_addr
      - labels:
          level:
          status:
          method:

      - template:
          source: output_msg
          template: 'url="{{ .url }}" host="{{ .host }}" GeoIP_Source={{.remote_addr }}'

      - output:
          source: output_msg
```

`GeoIP_Source=[IP]` will be replaced by geo-ip fileds.

```
geo_ip_asn="HostSlick" geo_ip_continent="North America" geo_ip_city="Ashburn" geo_ip_city_geoname_id="4744870" geo_ip_country="United States" geo_ip_country_geoname_id="6252001" geo_ip_country_iso_code="US" geo_ip_latitude="39.018" geo_ip_longitude="-77.539"

```
