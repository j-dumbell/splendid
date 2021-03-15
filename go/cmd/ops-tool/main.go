package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/j-dumbell/splendid/go/pkg/account"
	"github.com/j-dumbell/splendid/go/pkg/util/awsutils"
	"github.com/joho/godotenv"
)

var remoteState = "remoteState"
var accountTable = "accountTable"

func main() {
	godotenv.Load("cmd/ops-tool/.env")
	bucket := os.Getenv("BUCKET_NAME")

	flag.NewFlagSet(remoteState, flag.ExitOnError)
	flag.NewFlagSet(accountTable, flag.ExitOnError)

	if len(os.Args) < 2 {
		fmt.Println("must be at least 1 positional argument")
		os.Exit(1)
	}

	operation := os.Args[1]
	switch operation {
	case remoteState:
		client := awsutils.MkS3()
		fmt.Printf("creating bucket \"%v\" in region \"%v\"", bucket, types.BucketLocationConstraintEuWest2)
		if err := awsutils.CreateBucket(client, bucket, types.BucketLocationConstraintEuWest2); err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		fmt.Println("success")

	case accountTable:
		fmt.Printf("creating dynamodb table\n")
		if err := account.CreateAccountTable(); err != nil {
			fmt.Print(err)
			os.Exit(1)
		}
		fmt.Println("success")

	default:
		fmt.Printf("unexpected argument \"%v\"\n", operation)
		os.Exit(1)
	}

}
