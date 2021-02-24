resource "aws_lb" "alb" {
  name               = "splendid-server"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb-sg.id]
  subnets            = [aws_subnet.public_subnet1.id, aws_subnet.public_subnet2.id]
}

resource "aws_security_group" "alb-sg" {
  name   = "splendid-server"
  vpc_id = aws_vpc.vpc.id

  ingress {
    from_port   = var.lb_listener_port
    to_port     = var.lb_listener_port
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

resource "aws_lb_listener" "alb-listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = var.lb_listener_port
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb-tg.arn
  }
}

resource "aws_lb_target_group" "alb-tg" {
  name        = "splendid"
  port        = var.lb_listener_port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.vpc.id
  target_type = "ip"

  health_check {
    path      = "/health"
    matcher   = "200"
  }
}