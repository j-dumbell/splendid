package account

import (
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/j-dumbell/splendid/go/pkg/util/awsutils"
)

const usersTable = "users"

type User struct {
	email       string
	displayName string
	password    string
}

func CreateUser(client *dynamodb.Client, u User) error {

	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeValues: expr,
		TableName:                 aws.String(usersTable),
		Key:                       key,
		ReturnValues:              aws.String("UPDATED_NEW"),
		UpdateExpression:          aws.String("set info.rating = :r"),
	}
}

func main() {
	client := awsutils.MkDynamodb()

	u := User{
		email:       "van@gamil.com",
		displayName: "Van",
		password:    "xmpadsad",
	}

	CreateUser(client, u)
}
