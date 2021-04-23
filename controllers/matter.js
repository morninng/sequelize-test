
const express = require('express')
const {
  Op
} = require('sequelize');

const db = require('../models/index');

const { Matter } = db

const { MatterTypeReference } = require('../models/mattertypereference');
const { MatterType } = require('../models/mattertype');

async function create(
    req,
    res
  ){

    console.log("matter create");
    // const matterData = {
    //   firstname: req.query.firstname,
    //   lastname: req.query.lastname
    // }

    const matterData = {
      firstName: "typecheck",
      LastName: "zz",
      nickname: "fff",
      matterType: "リフォーム",
      matterTypeId: null,
      matterTypeReferenceId: 2
    }

    console.log(matterData);

    Matter.create(matterData)
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

  Matter.update({matterType: "新築"}, {where: {id: 3} })
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


async function get(
  req,
  res
){

  console.log("matter get");

  try{

    const matter = await Matter.findByPk(17, { include: MatterTypeReference })
    if (matter === null) {
      console.log('Not found!', matter);

      res.json({
        success: false,
        data: {},
        error: [
          {
            msg:"not found",
            param: null,
          },
        ],
      })
  
    } else {



      const convertedMatter = convertMatterType(matter);

      res.json({
        success: true,
        convertedMatter,
        error: [],
      })
    }



  }catch(err){

    console.error(err.message)

    res.json({
      success: true,
      error: [err.message],
    })

  }
}


async function searchByKeyword(  req, res){


  const condition = {
    [Op.and]:
    [
      {nickname: 'fff'},
      {[Op.or]: [
        {matterType: 'リフォーム'},
        {matterTypeReferenceId: 1}
      ]}
    ]

  }


  const whereCondition = {
    distinct: true,
    where: condition,
    subQuery: false,
  }

  let matters = await Matter.findAll(whereCondition)

  res.json({
    success: true,
    matters,
    error: [],
  })

}


function convertMatterType(matter){
  console.log("convertMatterType", matter);
  const matterType = matter.matterType;
  const MatterTypeReference = matter.MatterTypeReference;
  if(!matterType && MatterTypeReference){
    matter.matterType = MatterTypeReference.name
  }
  return matter;
}




module.exports = {create, update, get, searchByKeyword}