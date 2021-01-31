resource "aws_iam_user" "van" {
  name = "van"
}

resource "aws_iam_user" "james" {
  name = "james"
}

resource "aws_iam_user" "ci_service" {
  name = "ci-service"
}

resource "aws_iam_user_policy_attachment" "van-policy-attachment" {
  user = aws_iam_user.van.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_user_policy_attachment" "james-policy-attachment" {
  user = aws_iam_user.james.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_user_policy_attachment" "ci-service-policy-attachment" {
  user = aws_iam_user.ci_service.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}