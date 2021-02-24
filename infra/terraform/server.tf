resource "aws_ecr_repository" "ecr" {
    name = var.app_name
}

resource "aws_ecs_cluster" "cluster" {
    name                = "splendid-server"
    capacity_providers  = ["FARGATE"]
}

resource "aws_ecs_task_definition" "task_defn" {
    family                      = "splendid-server"
    container_definitions       = data.template_file.task_defn.rendered
    requires_compatibilities    = ["FARGATE"]
    cpu                         = var.server_cpu
    memory                      = var.server_mem
    network_mode                = "awsvpc"
    execution_role_arn          = aws_iam_role.ecs_execution_role.arn
}

resource "aws_ecs_service" "service" {
  name            = "splendid-server"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task_defn.arn
  desired_count   = var.server_count
  launch_type     = "FARGATE"
  # iam_role        = aws_iam_role.foo.arn #
  # depends_on      = [aws_iam_role_policy.foo]

  network_configuration {
    subnets         = [aws_subnet.private_subnet.id]
  }


  load_balancer {
    target_group_arn = aws_lb_target_group.alb-tg.arn
    container_name   = var.app_name
    container_port   = var.server_port
  }

}

data "template_file" "task_defn" {
  template = "${file("container_defn.json.tpl")}"

  vars = {
    container_name        = var.app_name
    docker_image          = "${var.account_id}.dkr.ecr.${var.region}.amazonaws.com/${var.app_name}:latest"
  }
}

resource "aws_iam_role" "ecs_execution_role" {
  name = "server-ecs-task-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "ec2.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs-execution-role-policy-attachment" {
    role = aws_iam_role.ecs_execution_role.id
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
