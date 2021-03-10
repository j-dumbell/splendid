resource "aws_s3_bucket" "site" {
  bucket = var.site_bucket
  acl = "public-read"
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "s3:GetObject",
            "Principal": {"AWS": "*"},
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::${var.site_bucket}/*"
        }
    ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}