"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Company = require("../models/company");
const { createToken } = require("../helpers/tokens");
const Job = require("../models/job.js");

const testJobIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM companies");
  // noinspection SqlWithoutWhere
  // await db.query("DELETE FROM jobs");

  await Company.create({
    handle: "c1",
    name: "C1",
    numEmployees: 1,
    description: "Desc1",
    logoUrl: "http://c1.img",
  });
  await Company.create({
    handle: "c2",
    name: "C2",
    numEmployees: 2,
    description: "Desc2",
    logoUrl: "http://c2.img",
  });
  await Company.create({
    handle: "c3",
    name: "C3",
    numEmployees: 3,
    description: "Desc3",
    logoUrl: "http://c3.img",
  });
  await Company.create({
    handle: "c33",
    name: "C33",
    numEmployees: 50,
    description: "Desc33",
    logoUrl: "http://c33.img",
  });

  await Company.create({
    handle: "c34",
    name: "C4",
    numEmployees: 1,
    description: "Desc34",
    logoUrl: "http://c34.img",
  });

  await Company.create({
    handle: "c35",
    name: "C44",
    numEmployees: 999,
    description: "Desc35",
    logoUrl: "http://c35.img",
  });
  await Company.create({
    handle: "a",
    name: "a",
    numEmployees: 999,
    description: "a",
    logoUrl: "http://c35.img",
  });

  testJobIds[0] = (
    await Job.create({
      title: "J1",
      salary: 1,
      equity: "0.1",
      companyHandle: "c1",
    })
  ).id;
  testJobIds[1] = (
    await Job.create({
      title: "J2",
      salary: 2,
      equity: "0.2",
      companyHandle: "c1",
    })
  ).id;
  testJobIds[2] = (
    await Job.create({
      title: "J3",
      salary: 3,
      /* equity null */
      companyHandle: "c1",
    })
  ).id;

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });
  await User.register({
    username: "admin",
    firstName: "admin",
    lastName: "admin",
    email: "admin@user.com",
    password: "adminadmin",
    isAdmin: true,
  });
  // await Job.create({
  //   title: "j1",
  //   salary: 1000,
  //   equity: "0.1",
  //   companyHandle: "c1",
  // });
  // await Job.create({
  //   title: "j2",
  //   salary: 2000,
  //   equity: "0.12",
  //   companyHandle: "c1",
  // });
  // await Job.create({
  //   title: "j3",
  //   salary: 3000,
  //   equity: "0.13",
  //   companyHandle: "c2",
  // });
  // await Job.create({
  //   title: "j4",
  //   salary: 4000,
  //   equity: "0.0",
  //   companyHandle: "c2",
  // });
  // await User.applyToJob("u1", testJobIds[0]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
  u1Token,
  u2Token,
  adminToken,
};
