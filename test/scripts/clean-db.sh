#!/bin/bash

mongoimport --jsonArray --drop --db $1 --collection gamblers --file ../../db/gambler.json

