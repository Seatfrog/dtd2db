import {FeedConfig} from "@feed/FeedConfig";
import mysql from "./mysql";
import snowflake from "./snowflake";

const dbType = process.env.DATABASE_TYPE?.toLowerCase() || "mysql";
const specification: FeedConfig = dbType === "snowflake" ? snowflake : mysql;

export default specification;