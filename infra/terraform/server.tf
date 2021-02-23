resource "aws_ecr_repository" "ecr" {
    name = "splendid-server"
}

resource "aws_ecs_cluster" "cluster" {
    name                = "splendid-server"
    capacity_providers  = ["FARGATE"]
}

resource "aws_ecs_task_definition" "task_defn" {
    family                      = "splendid-server"
    container_definitions       = file("container_defn.json")
    requires_compatibilities    = ["FARGATE"]
    cpu                         = "256"
    memory                      = "512"
    network_mode                = "awsvpc"
}

resource "aws_ecs_service" "service" {
  name            = "splendid-server"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task_defn.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  # iam_role        = aws_iam_role.foo.arn #
  # depends_on      = [aws_iam_role_policy.foo]

  network_configuration {
    subnets         = [aws_subnet.private_subnet.id]
  }


  load_balancer {
    target_group_arn = aws_lb_target_group.alb-tg.arn
    container_name   = "splendid-server"
    container_port   = 8080
  }

}
