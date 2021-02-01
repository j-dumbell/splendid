resource "aws_vpc" "game_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "game"
  }
}

resource "aws_subnet" "game_public_subnet" {
  vpc_id     = aws_vpc.game_vpc.id
  cidr_block = "10.0.0.0/24"

  tags = {
    Name = "public-game"
  }
}

resource "aws_subnet" "game_private_subnet" {
  vpc_id     = aws_vpc.game_vpc.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "private-game"
  }
}

resource "aws_internet_gateway" "game_igw" {
  vpc_id = aws_vpc.game_vpc.id

  tags = {
    Name = "game"
  }
}

resource "aws_nat_gateway" "game_ngw" {
  allocation_id = aws_eip.game_ngw_eip.id
  subnet_id     = aws_subnet.game_public_subnet.id

  depends_on = [aws_internet_gateway.game_igw]
}

resource "aws_network_interface" "game_interface" {
  subnet_id   = aws_subnet.game_public_subnet.id
  private_ips = ["10.0.0.10"]
}

resource "aws_eip" "game_ngw_eip" {
  vpc                       = true
  network_interface         = aws_network_interface.game_interface.id
  associate_with_private_ip = "10.0.0.10"
}