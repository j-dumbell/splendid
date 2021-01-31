package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	bucket := os.Getenv("BUCKET_NAME")

	cfg, err := config.LoadDefaultConfig(
		context.TODO(),
		config.WithSharedConfigProfile(os.Getenv("PROFILE")),
	)
	if err != nil {
		panic(err)
	}

	client := s3.NewFromConfig(cfg)
	createBucketInput := s3.CreateBucketInput{
		Bucket: aws.String(bucket),
		CreateBucketConfiguration: &types.CreateBucketConfiguration{
			LocationConstraint: types.BucketLocationConstraintEuWest2,
		},
	}
	_, err = client.CreateBucket(context.TODO(), &createBucketInput)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Successfully created bucket \"%v\" in region \"%v\"", bucket, types.BucketLocationConstraintEuWest2)
}
