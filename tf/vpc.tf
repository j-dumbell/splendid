resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "game"
  }
}

resource "aws_internet_gateway" "ig" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "game"
  }
}

resource "aws_eip" "nat_eip" {
  vpc        = true
  depends_on = [aws_internet_gateway.ig]
}

resource "aws_nat_gateway" "nat" {
  depends_on = [aws_internet_gateway.ig]
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public1.id
  tags = {
    Name = "game"
  }
}

resource "aws_subnet" "public1" {
  vpc_id     = aws_vpc.vpc.id
  cidr_block = "10.0.0.0/24"
  availability_zone = "eu-west-2a"

  map_public_ip_on_launch = true
  tags = {
    Name = "public1"
  }
}

resource "aws_subnet" "public2" {
  vpc_id     = aws_vpc.vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "eu-west-2b"

  map_public_ip_on_launch = true
  tags = {
    Name = "public2"
  }
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.vpc.id
  cidr_block = var.private_subnet_cidr
  map_public_ip_on_launch = false
  availability_zone = "eu-west-2a"
  tags = {
    Name = "private"
  }
}

resource "aws_route_table" "public" {
  depends_on = [aws_vpc.vpc, aws_internet_gateway.ig]
  vpc_id = aws_vpc.vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ig.id
  }
}

resource "aws_route_table_association" "public" {
  depends_on = [aws_vpc.vpc, aws_subnet.public1, aws_subnet.public2, aws_route_table.public]
  subnet_id      = aws_subnet.public1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public2" {
  depends_on = [aws_vpc.vpc, aws_subnet.public1, aws_subnet.public2, aws_route_table.public]
  subnet_id      = aws_subnet.public2.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table" "nat" {
  depends_on = [aws_nat_gateway.nat]
  vpc_id = aws_vpc.vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
}

resource "aws_route_table_association" "nat" {
  depends_on = [aws_route_table.nat]
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.nat.id
}
