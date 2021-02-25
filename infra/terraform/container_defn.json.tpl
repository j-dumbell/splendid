[
    {
      "name": "${container_name}",
      "image": "${docker_image}",
      "environment": [
      ],
      "logConfiguration": {
      "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${aws_logs_group}",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "${aws_log_stream_prefix}"
        }
      },
      "portMappings": [
        {
          "containerPort": 8080,
          "hostPort": 8080
        }
      ]
    }
]