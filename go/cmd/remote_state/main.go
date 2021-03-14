package main

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/j-dumbell/splendid/go/pkg/util"
	"github.com/j-dumbell/splendid/go/pkg/util/aws_utils"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load("cmd/remote_state/.env")
	bucket := os.Getenv("BUCKET_NAME")

	client := aws_utils.MkS3()

	fmt.Printf("creating bucket \"%v\" in region \"%v\"", bucket, types.BucketLocationConstraintEuWest2)
	if err := util.CreateBucket(client, bucket, types.BucketLocationConstraintEuWest2); err != nil {
		panic(err)
	}
}
