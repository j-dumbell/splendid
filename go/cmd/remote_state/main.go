package main

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/j-dumbell/splendid/go/pkg/util/awsutils"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load("cmd/remote_state/.env")
	bucket := os.Getenv("BUCKET_NAME")

	client := awsutils.MkS3()

	fmt.Printf("creating bucket \"%v\" in region \"%v\"", bucket, types.BucketLocationConstraintEuWest2)
	if err := awsutils.CreateBucket(client, bucket, types.BucketLocationConstraintEuWest2); err != nil {
		panic(err)
	}
}
