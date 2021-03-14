package aws_utils

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func mkConfig() aws.Config {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		panic(err)
	}
	return cfg
}

func MkS3() *s3.Client             { return s3.NewFromConfig(mkConfig()) }
func MkDynamodb() *dynamodb.Client { return dynamodb.NewFromConfig(mkConfig()) }
