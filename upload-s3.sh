#!/bin/bash

aws s3 cp index.html s3://indecks/
aws s3 cp dist/bundle.js s3://indecks/dist/
aws s3 cp dist/bundle.js.map s3://indecks/dist/
