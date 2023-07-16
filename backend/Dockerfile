FROM registry.cafebazaar.ir:5000/divar/infra/common-images:go-builder-1.19 AS build

ENV GO111MODULE=on \
    CGO_ENABLED=1 \
    GOOS=linux \
    GOARCH=amd64 \
    GONOPROXY="git.cafebazaar.ir" \
    GONOSUMDB="git.cafebazaar.ir" \
    GOPRIVATE="git.cafebazaar.ir"


RUN apt-get update && apt-get install -y libvips libvips-dev

WORKDIR /srv/build

COPY ../../Makefile go.mod go.sum ./

RUN --mount=type=secret,id=ci-job-token \
    git config --global credential.helper store && \
    echo "https://gitlab-ci-token:$(cat /run/secrets/ci-job-token)@git.cafebazaar.ir" > ~/.git-credentials && \
    make dependencies

COPY ../../../.. /srv/build

RUN make upload

FROM docker.repos.balad.ir/ubuntu:22.04 AS runtime

WORKDIR /srv/app

RUN apt update && apt install -y libvips

COPY --from=build /srv/build/upload /bin/

CMD ["/bin/upload"]