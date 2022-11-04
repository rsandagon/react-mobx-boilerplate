FROM gliderlabs/alpine:3.6

ARG project_name

ENV PROJECT_NAME ${project_name}

# Install Packages
RUN apk --update add curl ca-certificates tar bash tzdata su-exec && \
    ln -s -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    curl -Ls https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-2.25-r0.apk > /tmp/glibc-2.25-r0.apk && \
    apk add --allow-untrusted /tmp/glibc-2.25-r0.apk

WORKDIR /opt/

COPY dist/ /opt/$PROJECT_NAME/

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

CMD ["start"]
