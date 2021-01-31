terraform {
  backend "s3" {
    bucket                  = "tf-remote-state-game"
    region                  = "eu-west-2"
    key                     = "splendid-state"
  }
}