# loki-enhance-middleware

### Geo IP

Provide GeoIP info for any log source

![未标题-1](https://user-images.githubusercontent.com/5763301/188595103-5719c66c-b94b-40ec-ad49-9e4cf66f07b8.png)

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


      volumes:
          # maxmind db files, https://www.maxmind.com/en/geolite2/signup
          # GeoLite2-ASN.mmdb, GeoLite2-City.mmdb
        - /mnt/vol2/mmdb:/app/mmdb:ro

      environment:
        - LOKI_HOST=http://loki:3100
        - WORKER_COUNT=3
        - PORT=3100

      expose:
        - 3100
```

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

`GeoIP_Source=XXX.XXX.XXX.XX` will be replaced by geo-ip fileds
