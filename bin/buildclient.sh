cd ts && yarn && yarn build &&
aws s3 rm s3://splendid-site --recursive &&
aws s3 sync build s3://splendid-site
