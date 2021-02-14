resource "aws_lb" "lb" {
  name               = "splendid-server"
  internal           = false
  load_balancer_type = "application"
  # security_groups    = [aws_security_group.lb_sg.id]
  subnets            = aws_subnet.public_subnet.id
}

resource "aws_security_group" "alb" {
  name   = "splendid-server"
  vpc_id = aws_vpc.vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb_listener" "internet-alb-https" {
  load_balancer_arn = aws_lb.internet-alb.arn
  port              = 80
  protocol          = "http"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb-tg.arn
  }
}

resource "aws_lb_target_group" "alb-tg" {
  name        = "${var.microservice_name}-${var.environment}-tg"
  port        = var.alb-port
  protocol    = "HTTP"
  vpc_id      = var.ecs_vpc_id
  target_type = "ip"

  health_check {
    protocol            = var.health-check-protocol
    healthy_threshold   = var.health-check-healthy-threshold
    interval            = var.health-check-interval
    path                = var.health-check-path
    timeout             = var.health-check-timeout
    unhealthy_threshold = var.health-check-unhealthy-threshold
    matcher             = var.health-check-matcher
  }
}