
const express = require('express')

const db = require('../models/index');

const { MatterType } = db

async function create(
    req,
    res
  ){

    console.log("matter type create");

    const matterType = {
      name: "新築"
    }

    console.log(matterType);

    MatterType.create(matterType)
    .then((record) => {
      const data = record;
      res.json({
        success: true,
        data,
        error: [],
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        data: {},
        error: [
          {
            msg: err.message,
            param: null,
          },
        ],
      })
      console.error('[Error] Failed to create the matter', err.message);
    })
}

async function update(
  req,
  res
){

  console.log("matter update");

  MatterType.update({name: "新築"}, {where: {id: 3} })
  .then((record) => {
    const data = record;
    res.json({
      success: true,
      data,
      error: [],
    })
  })
  .catch((err) => {
    res.json({
      success: false,
      data: {},
      error: [
        {
          msg: err.message,
          param: null,
        },
      ],
    })
    console.error('[Error] Failed to create the matter', err.message);
  })
}




module.exports = {create, update}