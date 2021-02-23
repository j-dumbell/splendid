# resource "aws_ecr_repository" "ecr" {
#     name = "splendid-server"
# }

# resource "aws_ecs_cluster" "cluster" {
#     name                = "splendid-server"
#     capacity_providers  = ["FARGATE"]
# }

# resource "aws_ecs_task_definition" "task_defn" {
#     family                      = "splendid-server"
#     container_definitions       = file("some/path.json")
#     requires_compatibilities    = "FARGATE"
#     cpu                         = "256"
#     memory                      = "512"
# }

# resource "aws_ecs_service" "service" {
#   name            = "splendid-server"
#   cluster         = aws_ecs_cluster.cluster.id #optional in tf docs?
#   task_definition = aws_ecs_task_definition.task_defn.arn
#   desired_count   = 1
#   iam_role        = aws_iam_role.foo.arn #
#   depends_on      = [aws_iam_role_policy.foo]

#   load_balancer {
#     target_group_arn = aws_lb_target_group.foo.arn
#     container_name   = "mongo"
#     container_port   = 8000
#   }

# }
