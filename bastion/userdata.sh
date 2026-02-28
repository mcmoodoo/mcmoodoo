#!/bin/bash
set -eux

# Docker (daemon + client)
apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get install -y software-properties-common
add-apt-repository -y universe
apt-get update -y
apt-get install -y ca-certificates curl gnupg git just unzip
# AWS CLI v2 (awscli package not available on Ubuntu 24.04)
curl -sSL "https://awscli.amazonaws.com/awscli-exe-linux-$(uname -m).zip" -o /tmp/awscliv2.zip
unzip -q -o /tmp/awscliv2.zip -d /tmp && /tmp/aws/install -b /usr/local/bin
rm -rf /tmp/awscliv2.zip /tmp/aws

# Zellij (terminal multiplexer)
ZELLIJ_VERSION=$(curl -s https://api.github.com/repos/zellij-org/zellij/releases/latest | sed -n 's/.*"tag_name": "\(v[^"]*\)".*/\1/p')
ARCH=$(uname -m)
curl -sSL "https://github.com/zellij-org/zellij/releases/download/${ZELLIJ_VERSION}/zellij-${ARCH}-unknown-linux-musl.tar.gz" -o /tmp/zellij.tar.gz
tar -xzf /tmp/zellij.tar.gz -C /tmp
install -m 0755 "$(find /tmp -maxdepth 2 -name zellij -type f 2>/dev/null | head -1)" /usr/local/bin/zellij
rm -rf /tmp/zellij /tmp/zellij.tar.gz /tmp/zellij-*

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${VERSION_CODENAME}") stable" > /etc/apt/sources.list.d/docker.list
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io
systemctl enable --now docker
if id ubuntu >/dev/null 2>&1; then
  usermod -aG docker ubuntu
  echo 'set -o vi' >> /home/ubuntu/.bashrc
  echo '[ -f /etc/profile.d/nix.sh ] && . /etc/profile.d/nix.sh' >> /home/ubuntu/.bashrc
  echo 'export RUNPOD_GHCR_TOKEN=$(aws ssm get-parameter --name "/runpod/GHCR_TOKEN" --with-decryption --query "Parameter.Value" --output text)' >> /home/ubuntu/.bashrc
  echo 'export RUNPOD_API_KEY=$(aws ssm get-parameter --name "/runpod/API_KEY" --with-decryption --query "Parameter.Value" --output text)' >> /home/ubuntu/.bashrc
  chown ubuntu:ubuntu /home/ubuntu/.bashrc
  sudo -u ubuntu git clone --branch runpod https://github.com/mcmoodoo/mcmoodoo /home/ubuntu/mcmoodoo || true
fi

# Nix
HOME=/root curl -L https://nixos.org/nix/install | sh -s -- --daemon --yes > /var/log/nix-install.log 2>&1 || true
mkdir -p /etc/nix
echo 'build-users-group = nixbld' > /etc/nix/nix.conf
echo 'experimental-features = nix-command flakes' >> /etc/nix/nix.conf
