terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 6.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

data "aws_vpc" "default" {
  default = true
}

resource "aws_key_pair" "bastion_key" {
  key_name   = "bastion-key"
  public_key = file(var.ssh_public_key_path)
}

resource "aws_security_group" "bastion_sg" {
  name        = "bastion-sg"
  description = "Security group for bastion instance"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_cidr]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "bastion" {
  ami                         = "ami-0b6c6ebed2801a5cb"
  instance_type               = "t3.xlarge"
  key_name                    = aws_key_pair.bastion_key.key_name
  vpc_security_group_ids      = [aws_security_group.bastion_sg.id]
  iam_instance_profile        = "bastion-role"
  user_data_replace_on_change = true

  root_block_device {
    volume_size = 50
    volume_type = "gp3"
  }

  user_data = file("${path.module}/userdata.sh")

  tags = {
    Name = "bastion"
  }
}
