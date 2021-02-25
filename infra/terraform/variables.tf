variable "account_id" {
  type = string
}

variable "region" {
  type = string
}

variable "private_subnet_cidr" {
  type = string
}

variable "app_name" {
  type = string
}

variable "server_port" {
  type = string
}

variable "lb_listener_port" {
  type = string
}

variable "server_cpu" {
  type = string
}

variable "server_mem" {
  type = string
}

variable "server_count" {
  type = number
}