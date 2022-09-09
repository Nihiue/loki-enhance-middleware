# loki-enhance-middleware

![typescript](https://img.shields.io/npm/types/scrub-js.svg)
[![Test Suite](https://github.com/Nihiue/loki-enhance-middleware/actions/workflows/main.yml/badge.svg)](https://github.com/Nihiue/loki-enhance-middleware/actions/workflows/main.yml)

`loki-enhance-middleware` hijacks log push requests sent to loki and modifies it.


## Deploy


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
        - WORKER_COUNT=1
        - PORT=3100

      expose:
        - 3100
```

## Config LogAgent

 LogAgent Should:

 * Send requests to middleware
 * Add `placeholder` for middle to process, see `Module - Geo IP` for example

`promtail-config.yaml`
```yaml

clients:
  - url: http://enhance_middleware:3100/loki/api/v1/push

```


## Module - Geo IP

Injects GeoIP info for any log source

Powered by [maxmind](https://www.maxmind.com/) and [maxmind-npm](https://www.npmjs.com/package/maxmind)

![GeoIP](https://user-images.githubusercontent.com/5763301/189410537-f77d2f7e-0838-4352-9cc5-140740803177.png)

`promtail-config.yaml`
```yaml
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

`GeoIP_Source=[IP]` in log line is placeholder, and it will be replaced by geo-ip fileds.

```
geo_ip_asn="HostSlick" geo_ip_continent="North America" geo_ip_city="Ashburn" geo_ip_city_geoname_id="4744870" geo_ip_country="United States" geo_ip_country_geoname_id="6252001" geo_ip_country_iso_code="US" geo_ip_latitude="39.018" geo_ip_longitude="-77.539"

```


## Module - UserAgent Detect

Parse user_agent field to structure data.

Powered by [device-detector-js](https://www.npmjs.com/package/device-detector-js)

![UA](https://user-images.githubusercontent.com/5763301/189410148-6942d6f8-0ada-4229-8618-193248eeb432.png)

Placeholder: `Device_UA_Source="[UA]"`

```
Device_UA_Source="Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36"
```

Result

```
ua_client="Chrome Mobile;90.0" ua_device="Google;Pixel 5" ua_os="Android;11.0"
```
